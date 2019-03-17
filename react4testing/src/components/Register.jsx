import React, { Component } from 'react';

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
