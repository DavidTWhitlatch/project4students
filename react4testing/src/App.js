import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
// jwt-decode lets us decode json web token and access the data in them
import decode from 'jwt-decode';
import Login from './components/Login'
import Register from './components/Register'
import ShowFood from './components/ShowFood'
import FoodItem from './components/FoodItem'
import ShowFlavors from './components/ShowFlavors'
// After building the backend, we can make all of our API calls. Then import them here
import {
  loginUser,
  registerUser,
  showFood,
  showFlavors,
  showFoodItem,
  postFood,
  putFood,
  destroyFood,
  putFoodFlavor
} from './services/api-helper';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null, // we set the logged in user here. This way we know if the user is logged in
      flavors: [],
      food: [],
      foodItem: null,    // Value for a selected food item
      formData: {        // Form data for addin a food
        name: ""
      },
      selectedFlavor: '' // Form data for adding a flavor to a food
    }
    this.handleLoginButton = this.handleLoginButton.bind(this)
    this.getFood = this.getFood.bind(this)
    this.getFoodItem = this.getFoodItem.bind(this)
    this.addFood = this.addFood.bind(this)
    this.updateFood = this.updateFood.bind(this)
    this.deleteFood = this.deleteFood.bind(this)
    this.getFlavors = this.getFlavors.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setFoodForm = this.setFoodForm.bind(this)
    this.flavorForm = this.flavorForm.bind(this)
    this.addFlavorToFood = this.addFlavorToFood.bind(this)
  }

  // onClick function to redirect to the login form 
  handleLoginButton() {
    this.props.history.push("/login")
  }

  // On page load, we grab all the foods and flavors
  // We also check local storage to see if the browser has a saved token
  // If so, we decode the token to get the user data and save it in state.
  componentDidMount() {
    this.getFood()
    this.getFlavors();
    const checkUser = localStorage.getItem("jwt");
    if (checkUser) {
      const user = decode(checkUser);
      this.setState({
        currentUser: user
      })
    }
  }

  // Function to get all food from our API
  async getFood() {
    const food = await showFood();
    this.setState({ food })
  }

  // Function to get a single food item from our API
  async getFoodItem(id) {
    const foodItem = await showFoodItem(id);
    this.setState({ foodItem })
  }


  // Function to create a new food in our API
  // We take the response and add it to our Food array in state
  async addFood() {
    const newFood = await postFood(this.state.formData)
    this.setState(prevState => ({
      food: [...prevState.food, newFood],
      formData: {
        name: ""
      }
    }))
  }

  // Function to update an existing food in our API
  // We find the index of the updated food in state
  // We build a new array, replacing the old food item with the new one
  // Then we setState with the new food array
  async updateFood(foodItem) {
    const updatedFoodItem = await putFood(this.state.formData, foodItem.id);
    const index = this.state.food.indexOf(foodItem);
    const foodArray = this.state.food
    foodArray[index] = updatedFoodItem
    this.setState({
      food: foodArray
    })
  }

  // Function to delete a food item
  // We then build a new food array with the delete item spliced out
  async deleteFood(foodItem) {
    await destroyFood(foodItem.id);
    const index = this.state.food.indexOf(foodItem);
    const foodArray = this.state.food
    foodArray.splice(index, 1);
    this.setState({
      food: foodArray
    })
  }

  // Function to get all flavors
  async getFlavors() {
    const flavors = await showFlavors();
    this.setState({ flavors })
  }

  // Function to add a flavor to a food
  // We first find the flavor using by comparing the name from the flavor form data and the name in the flavors array
  // Then we make our API call using that flavors id and the id of the food argument passed to this function
  async addFlavorToFood(foodItem) {
    const newFlavor = this.state.flavors.find(flavor => flavor.name === this.state.selectedFlavor);
    const newFoodItem = await putFoodFlavor(foodItem.id, newFlavor.id);
    this.setState({
      foodItem: newFoodItem
    })
  }

  // Function to login a user
  // we set the user data in state and the JWT in local storage
  async handleLogin(loginData) {
    const userData = await loginUser(loginData);
    this.setState({
      currentUser: userData.user
    })
    localStorage.setItem("jwt", userData.token)
  }

  // Function to register a user
  // After register, we just call the login function with the same data
  async handleRegister(registerData) {
    await registerUser(registerData);
    this.handleLogin(registerData)
  }

  // handle change function for our create food form
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ formData: { [name]: value } });
  }

  // Function to set the form data for the update food form
  setFoodForm(food) {
    this.setState({
      formData: {
        name: food.name
      }
    })
  }

  //handle change for the flavor drop down form
  flavorForm(e) {
    this.setState({
      selectedFlavor: e.target.value
    })
  }

  render() {
    return (
      <div>
        <header>
          <h1>TasteVille</h1>
          {/* Here we use a terinary to check if there is a logged in user set in state.
              If there is no logged in user, we show a login button instead of the site nav */}
          {this.state.currentUser
            ?
            <div>
              {/* This is a greeting to the user if there user info has been set in state.
              We use the guard operator to check '&&' */}
              <h3>Hi {this.state.currentUser && this.state.currentUser.username}</h3>
              <Link to="/food">View All Food</Link>
              &nbsp;
              <Link to="/flavors">View All Flavors</Link>
            </div>
            :
            <button onClick={this.handleLoginButton}>Login/register</button>
          }
        </header>
        {/* setting up our routes */}
        <Route exact path="/login" render={(props) => (
          <Login handleLogin={this.handleLogin} />)} />
        <Route exact path="/register" render={(props) => (
          <Register handleRegister={this.handleRegister} />)} />
        <Route exact path="/food" render={(props) => (
          <ShowFood
            foods={this.state.food}
            formData={this.state.formData}
            getFoodItem={this.getFoodItem}
            deleteFood={this.deleteFood}
            handleSubmit={this.addFood}
            handleChange={this.handleChange}
            setFoodForm={this.setFoodForm}
            updateFood={this.updateFood}
          />)} />
        <Route exact path="/flavors" render={(props) => (
          <ShowFlavors flavors={this.state.flavors} />)} />
        <Route exact path="/food/:id" render={(props) => (
          <FoodItem
            foodItem={this.state.foodItem}
            flavors={this.state.flavors}
            selectedFlavor={this.state.selectedFlavor}
            handleChange={this.flavorForm}
            addFlavorToFood={this.addFlavorToFood} />)} />
      </div>
    );
  }
}

export default withRouter(App);
