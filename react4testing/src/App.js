import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import decode from 'jwt-decode';
import Login from './components/Login'
import Register from './components/Register'
import ShowFood from './components/ShowFood'
import FoodItem from './components/FoodItem'
import ShowFlavors from './components/ShowFlavors'
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
      currentUser: null,
      flavors: [],
      food: [],
      foodItem: null,
      formData: {
        name: ""
      },
      selectedFlavor: ''
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

  handleLoginButton() {
    this.props.history.push("/login")
  }

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

  async getFood() {
    const food = await showFood();
    this.setState({ food })
  }

  async getFoodItem(id) {
    const foodItem = await showFoodItem(id);
    this.setState({ foodItem })
  }

  async addFood() {
    const newFood = await postFood(this.state.formData)
    this.setState(prevState => ({
      food: [...prevState.food, newFood],
      formData: {
        name: ""
      }
    }))
  }

  async updateFood(foodItem) {
    const updatedFoodItem = await putFood(this.state.formData, foodItem.id);
    const index = this.state.food.indexOf(foodItem);
    const foodArray = this.state.food
    foodArray[index] = updatedFoodItem
    this.setState({
      food: foodArray
    })
  }

  async deleteFood(foodItem) {
    await destroyFood(foodItem.id);
    const index = this.state.food.indexOf(foodItem);
    const foodArray = this.state.food
    foodArray.splice(index, 1);
    this.setState({
      food: foodArray
    })
  }

  async getFlavors() {
    const flavors = await showFlavors();
    this.setState({ flavors })
  }

  async addFlavorToFood(foodItem){
    const newFlavor = this.state.flavors.find(flavor => flavor.name === this.state.selectedFlavor);
    const newFoodItem = await putFoodFlavor(foodItem.id, newFlavor.id);
    this.setState({
      foodItem: newFoodItem
    })
  }

  async handleLogin(loginData) {
    const userData = await loginUser(loginData);
    this.setState({
      currentUser: userData.user
    })
    localStorage.setItem("jwt", userData.token)
  }

  async handleRegister(registerData) {
    await registerUser(registerData);
    this.handleLogin(registerData)
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ formData: { [name]: value } });
  }

  setFoodForm(food) {
    this.setState({
      formData: {
        name: food.name
      }
    })
  }

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
          {this.state.currentUser
            ?
            <div>
              <h3>Hi {this.state.currentUser && this.state.currentUser.username}</h3>
              <Link to="/food">View All Food</Link>
              &nbsp;
              <Link to="/flavors">View All Flavors</Link>
            </div>
            :
            <button onClick={this.handleLoginButton}>Login/register</button>
          }
        </header>
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
          addFlavorToFood={this.addFlavorToFood}/>)} />
      </div>
    );
  }
}

export default withRouter(App);
