# Final project prompt

![meme](https://media.giphy.com/media/3o7TKJG8p39T1hJFLO/source.gif)

We are back! with your favorite TasteVille app (not to be confused with flavortown) 

This app is built with mostly the same react front end barring some minor changes for auth.
We also have a whole new rails with many to many for the backend.


## Setup 
  - Fork and clone this bad boy
  in terminal:
  ```shell
  cd rails4testing/
  bundle install
  rails db:drop db:create db:migrate db:seed
  rails s
  ```
  in a new terminal window:
  ```shell
  cd react4testing/
  npm i
  npm start
  ```

  This should get the app running. Now onto how we did it!
  
## The Process!

  ### Create a new rails app
  
    we first create a new rails app like normal. We also setup Food and Flavors
    ```shell
    rails new rails4testing -G --api --database=postgresql
    rails g scaffold Food name:string 
    rails g scaffold Flavor name:string
    rails db:create db:migrate
    ```

  ### Adding the many to many association
    At this point we should have everything setup and working but without any associations.
    To create a many to many association, we first need to make a migration to add the refernce keys to our tables. That looks like this:
    ```shell
    rails g migration CreateJoinTableFoodsFlavors foods flavors
    ```
    The migration file that is created should look like this by default and does not need to be edited:
    ```
    class CreateJoinTableFoodsFlavors < ActiveRecord::Migration[5.2]
      def change
        create_join_table :foods, :flavors do |t|
          # t.index [:food_id, :flavor_id]
          # t.index [:flavor_id, :food_id]
        end
      end
    end
    ```

    Lets do a quick `rails db:migraine` to migrate that file.

    Next we need to add the associations in our models.
    ```
    class Flavor < ApplicationRecord
      has_and_belongs_to_many :foods
    end
    ```
    and
    ```
    class Food < ApplicationRecord
      has_and_belongs_to_many :flavors
    end
    ```

  ### Defining our desired controller behavior
    For our particular app, we want to be able to add flavors to foods. We did that at a '/foods/:food_id/flavors/:id' endpoint. lets set that up in our routes real quick
    ```
    Rails.application.routes.draw do
      resources :foods do
        resources :flavors
      end
      resources :flavors
    end
    ```

    Perfect!
    Now we can see if we type `rails routes` into our console we a 'food_flavors' route. We also see that PUT is handled by the flavors controller with the update action. Lets go modify that to add our flavor to our food

    ```
    def update
    # First we check to see if a food_id was passed in the endpoint
      if params[:food_id]
        # Then we find that Food item
        @food = Food.find(params[:food_id])
        # Now we can shovel in the current flavor to food.flavors
        @food.flavors << @flavor
        # Then we return the food item and include all of its flavors
        render json: @food, include: :flavors
      elsif @flavor.update(flavor_params)
        render json: @flavor
      else
        render json: @flavor.errors, status: :unprocessable_entity
      end
    end
    ```

    That looks good for adding flavors to foods. Now lets look at the food controller. In particuler `show`

    ```
    # GET /foods/1
    def show
      # We want to include the flavors for our food
      render json: @food, include: :flavors
    end
    ```

    ¡Todo es bien!

  ## Other changes:
    I did auth. don't try at home without a repo.
