import React, { Component } from 'react';

// Since this component is going to have a form, We make it a class component (or "controlled component")
// Very similar to the login form minus the link to the register component
// We could have made this more dry recycling the same login form and passing is different strings and onSubmit functions.
class Register extends Component {
  constructor(props) {
    super(props);
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
        <h2>Register</h2>
        <hr />
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.handleRegister(this.state)
        }} >
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <button>Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
