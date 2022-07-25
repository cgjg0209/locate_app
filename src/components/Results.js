import React from 'react'

const Results = (props) => {
  return (
    <div>
      latitude: {props.position.latitude}
      <br />
      longitude: {props.position.longitude}
      <br />
      <h3>Patient</h3>
      <div>
        {props.results.date && <div>{props.results.date}</div>}
        {props.results.name_jp && <div>{props.results.name_jp}</div>}
        {props.results.npatients && <div>{props.results.npatients - props.results.mpatients}<span>人</span></div>}
      </div>
      

    </div>
  )
}

export default Results