import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShowFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: false,
      isEdit: false
    }
  }
  render() {
    return (
      <div>
        {this.props.foods.map(food => (
          <div key={food.id}>
            {this.state.isEdit === food.id
              ?
              <div>
                <input
                  name="name"
                  type="text"
                  value={this.props.formData.name}
                  onChange={this.props.handleChange} />
                <button onClick={() => {
                  this.props.updateFood(food);
                  this.setState({
                    isEdit: false
                  });
                }}>Submit</button>
              </div>
              : <div>
                <Link to={`/food/${food.id}`} onClick={() => { this.props.getFoodItem(food.id) }}>{food.name}</Link>
                <button onClick={() => {
                  this.props.setFoodForm(food);
                  this.setState({
                    isEdit: food.id
                  })
                }}>edit</button>
                <button onClick={() => { this.props.deleteFood(food) }}>delete</button>
              </div>
            }
          </div>
        ))}
        <hr />
        {this.state.isAdd
          ?
          <div>
            <input
              name="name"
              type="text"
              value={this.props.formData.name}
              onChange={this.props.handleChange} />
            <button onClick={() => {
              this.props.handleSubmit();
              this.setState({ isAdd: false })
            }}>submit</button>
          </div>
          :
          <button onClick={() => {
            this.setState({ isAdd: true })
          }}>Add</button>
        }
      </div>
    )
  }
}

export default ShowFood;