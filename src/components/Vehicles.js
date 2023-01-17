import React from 'react'
import Vehicle from './Vehicle';

const Vehicles = ({vehicles, dayDiff, render, setRender}) => {
  return (
    <div>
        {
        vehicles.map((item,ind) => {
                return (
                  <Vehicle key={item.id} car={item} dayDiff={dayDiff} render={render} setRender={setRender}></Vehicle>
                );
                })}
    </div>
  )
}

export default Vehicles