import React from 'react'

const Vehicles = ({vehicles}) => {
  return (
    <div>
        {
        vehicles.map((item,ind) => {
                return (
                  <div key={item.id}>{item.model}</div>
                );
                })}
    </div>
  )
}

export default Vehicles