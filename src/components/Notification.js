import React from 'react'

const Notification = ({notif}) => {
  return (
    <div style={{width:"100%", border:"3px solid #1d6c12", borderRadius:"9px", padding:"10px", marginBottom:"10px", backgroundColor:"#f8f8f8"}}>
        <p><b>Type: &nbsp;</b> {notif.type}</p><br/>
        <p><b>Date: &nbsp;</b> {notif.date}</p><br/>
        <p><b>Message:</b></p>
        <p>{notif.msg}</p>
    </div>
  )
}

export default Notification
