class CreateJoinTableFoodsFlavors < ActiveRecord::Migration[5.2]
  def change
    create_join_table :foods, :flavors do |t|
      # t.index [:food_id, :flavor_id]
      # t.index [:flavor_id, :food_id]
    end
  end
end
