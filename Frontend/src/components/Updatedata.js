import React, { useState } from 'react'
import "./Updateform.css"
import { useNavigate } from "react-router-dom";

const Updatedata = () => {

  const [info, setInfo] = useState({ location: "", year: "", agerange: "", totalpopulation: "", totalsuffering: "", newdiagnosed: "", cured: "", disease: "" })
  const [agegroups, setagegroups] = useState(["1-5", "6-10", "11-15", "16-20", "21-25", "26-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60", "61-65", "65-70"])

  let navigate = useNavigate()

  const handleSubmit = (e) => {
    const { location, year, agerange, totalpopulation, totalsuffering, newdiagnosed, cured, disease } = info
    e.preventDefault();
    fetch(`https://healdata-9scy.vercel.app/api/postdata`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ location, year, agerange, totalpopulation, totalsuffering, newdiagnosed, cured, disease })
    })
    navigate('/')
  }

  const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  let setOptions = agegroups.map((group)=>{
      return(
        <option key={group} value={group}>
          {group}
        </option>
      )
    })

  return (
    <div className="container">
      <div className="testbox">
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label htmlFor="name">Name<span>*</span></label>
            <input id="name" type="text" name="name" required onChange={onChange} />
          </div>
          <div className="item">
            <label htmlFor="email">Email Address<span>*</span></label>
            <input id="email" type="email" name="email" required onChange={onChange} />
          </div>
          <div className="item">
            <label htmlFor="year">Year<span>*</span></label>
            <input id="year" type="year" name="year" required onChange={onChange} />
          </div>
          <div className="item">
            <label htmlFor="location">Location<span>*</span></label>
            <input id="location" type="text" name="location" required onChange={onChange} />
          </div>
          <div className="item">
            <label htmlFor="agerange">Age Group<span>*</span></label>
            <input id="agerange" type="text" name="agerange" list="ageranges" required onChange={onChange} />
            <datalist id='ageranges'>
              {setOptions}
            </datalist>
          </div>
          <div className="item">
            <label htmlFor="totalpopulation">Total Population<span>*</span></label>
            <input id="totalpopulation" type="number" name="totalpopulation" required onChange={onChange} />
          </div>
          <div className="item">
            <label htmlFor="disease">Disease<span>*</span></label>
            <input id="disease" type="text" name="disease" required onChange={onChange} />
          </div>
          <div className="item">
            <label htmlFor="totalsuffering">Total Suffering<span>*</span></label>
            <input id="totalsuffering" type="number" name="totalsuffering" required onChange={onChange} />
          </div>
          <div className="item">
            <label htmlFor="newdiagnosed">New Diagnosed<span>*</span></label>
            <input id="newdiagnosed" type="number" name="newdiagnosed" required onChange={onChange} />
          </div>
          <div className="item">
            <label htmlFor="cured">Cured<span>*</span></label>
            <input id="cured" type="number" name="cured" required onChange={onChange} />
          </div>
          <div className="btn-block">
            <button type="submit" href="/">SUBMIT</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Updatedata
