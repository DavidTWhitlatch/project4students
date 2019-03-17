import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// Since this component is going to have a form, We make it a class component (or "controlled component")
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "", 
      password: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <h2>login</h2>
        <hr />
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.handleLogin(this.state);
        }} >
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <button>Login</button>
          <Link to="/register">Register</Link> 
        </form>
      </div>
    );
  }
}

export default Login;
