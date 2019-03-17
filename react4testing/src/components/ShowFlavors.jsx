import React from 'react';


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