import React from 'react'
import UserCard from './UserCard'

const UserCards = ({userCards, setRerender, render}) => {
  return (
    <div>
      <div style={{marginRight:"20px", marginLeft:"20px", overflowY:"auto", height:"500px"}}>
      {
        userCards.map((card) => (
          <UserCard key={card.id} user = {card} setRerender={setRerender} render={render}/>
        ))
      }
    </div>
    </div>
  )
}

export default UserCards
