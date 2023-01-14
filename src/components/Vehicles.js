import React from 'react'
import Vehicle from './Vehicle';

const Vehicles = ({vehicles, dayDiff}) => {
  return (
    <div>
        {
        vehicles.map((item,ind) => {
                return (
                  <Vehicle key={item.id} car={item} dayDiff={dayDiff}></Vehicle>
                );
                })}
    </div>
  )
}

export default Vehicles