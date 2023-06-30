import React, { useEffect } from 'react'
import { useState } from 'react'

const Form = (props) => {

    const [credentials, setCredentials] = useState({ agegroup: "", location: "" })
    const [locationoptions,setLocationoptions] = useState(null)
    const [ageoptions, setAgeoptions] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.setqueries({ agegroup: credentials.agegroup, location: credentials.location })
        props.setshowform(null)
    }

    useEffect(()=>{
        fetch(`https://healdata-9scy.vercel.app/api/options` , {
            method: "GET"
        }).then((response)=>{
            return response.json()
        }).then((res)=>{
            setAgeoptions(res.ageoptions)
            setLocationoptions(res.locationoptions)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    
    return (
        <div className='container w-25 p-3 my-5 d-flex align-items-center justify-content-center'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="agegroup">Age Group</label>
                    <input type="text" className="form-control" id="agegroup" name='agegroup' aria-describedby="emailHelp" placeholder="Age-group" list='agegroups' value={credentials.agegroup} onChange={onChange} required />
                    <datalist id="agegroups">
                        {ageoptions && ageoptions.map((age)=>{
                            return (
                                <option key={age} value={age}>{age}</option>
                            )
                        })}
                    </datalist>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" className="form-control" id="location" name='location' placeholder="Location" list="locations" value={credentials.location} onChange={onChange} required />
                    <datalist id="locations">
                        {locationoptions && locationoptions.map((loc)=>{
                            return (
                                <option key={loc} value={loc}>{loc}</option>
                            )
                        })}
                    </datalist>
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Form
