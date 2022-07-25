import React from 'react'

const Results = (props) => {
  return (
    <div className='content-center text-center bg-gradient-to-r from-blue-100 w-3/5 shadow-2xl rounded-2xl mx-auto py-4'>
      {/* latitude: {props.position.latitude} */}
      {/* <br /> */}
      {/* longitude: {props.position.longitude} */}
      {/* <br /> */}
      {/* <h3>Patient</h3> */}
      {/* <div>
        {props.results.name_jp && <div>{props.results.name_jp}</div>}
        {props.results.date && <div>{props.results.date}</div>}
        {props.results.patients && <div>{props.results.patients}<span>人</span></div>}
        {props.results.date_w && <div>{props.results.date_w}</div>}
        {props.results.patients_w && <div>{props.results.patients_w}<span>人</span></div>}
      </div> */}
      <h3>{props.results.name_jp && <div>{props.results.name_jp}の感染状況</div>}</h3>
      <table className="table text-center mx-auto">
        <thead>
          <tr>
            <th scope="col">日付</th>
            <th scope="col">累計</th>
            <th scope="col">増加数</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          <tr className='mx-4'>
            <th scope="row">{props.results.date0 && <div>{props.results.date0}</div>}</th>
            <td className='text-center mx-4'>{props.results.patient0 && <div className='mx-4'>{props.results.patient0}<span>人</span></div>}</td>
            <td className='mx-4'>{props.results.patient0 && <div>{props.results.patient0 - props.results.patient1}<span>人</span></div>}</td>
          </tr>
          <tr>
            <th scope="row">{props.results.date1 && <div>{props.results.date1}</div>}</th>
            <td>{props.results.patient0 && <div>{props.results.patient1}<span>人</span></div>}</td>
            <td>{props.results.patient0 && <div>{props.results.patient1 - props.results.patient2}<span>人</span></div>}</td>
          </tr>
          <tr>
            <th scope="row">{props.results.date2 && <div>{props.results.date2}</div>}</th>
            <td>{props.results.patient0 && <div>{props.results.patient2}<span>人</span></div>}</td>
            <td>{props.results.patient0 && <div>{props.results.patient2 - props.results.patient3}<span>人</span></div>}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  )
}

export default Results