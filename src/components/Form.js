import React from 'react'

const Form = (props) => {
  return (
    <div>
      <button onClick={props.getCurrentPosition}>Get Current Position</button>
      <button type="submit" onClick={props.getPoint}>Get Place</button><br></br>
      <button type="submit" onClick={props.getCovid}>{props.city}の感染者数を見る</button>
      
    </div>
  )
}

export default Form