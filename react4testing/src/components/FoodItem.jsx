import React, { Component } from 'react';

// Same terinary form idea as create and update foods. This time we use a select drop down menu to show our flavors
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
                {/* The value and onChange function go on the select tag.
                    Then we map through our flavors as option tags within the select tag */}
                <select value={this.props.selectedFlavor} onChange={this.props.handleChange}>
                  {this.props.flavors.map(flavor=>(
                    <option>{flavor.name}</option>
                  ))}
                </select>
                <button onClick={() =>{
                  // addFlavorToFood takes the current food item and form data from app.js state to send to the API
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
