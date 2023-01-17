import React from 'react'
import Notification from './Notification';

const Notifications = ({notifications}) => {
  return (
    <div style={{marginRight:"20px"}}>
      {
        notifications.map((notif) => (
          <Notification key={notif.id} notif = {notif}/>
        ))
      }
    </div>
  )
}

export default Notifications
