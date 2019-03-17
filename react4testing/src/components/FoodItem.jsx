import React, { Component } from 'react';

class FoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: false
    }
  }

  render() {
    return (
      <div>
        {this.props.foodItem &&
          <div>
            <h1>{this.props.foodItem.name}</h1>
            {this.props.foodItem.flavors.map(flavor => (
              <div key={flavor.id}>
                <p>{flavor.name}</p>
              </div>
            ))}
            {this.state.isAdd
              ?
              <div>
                <select value={this.props.selectedFlavor} onChange={this.props.handleChange}>
                  {this.props.flavors.map(flavor=>(
                    <option>{flavor.name}</option>
                  ))}
                </select>
                <button onClick={() =>{
                  this.props.addFlavorToFood(this.props.foodItem)
                }}>Submit</button>
              </div>
              :
              <button onClick={() => {
                this.setState({
                  isAdd: true
                })
              }}>Add</button>
            }
          </div>
        }
      </div>
    )
  }
}

export default FoodItem;