import React from 'react';

// Simple functional component to show flavors
const ShowFlavors = (props) => {
  return (
    <div>
      {props.flavors.map(flavor => (
        <div key={flavor.id}>
          <p>{flavor.name}</p>
        </div>
      ))}
    </div>
  )
}

export default ShowFlavors;