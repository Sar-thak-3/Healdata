import React, { useEffect } from 'react'
import { useState,useRef } from 'react'
import SelectSearch from "react-select-search";

import Select from "react-select";

const Form = (props) => {
    const searchInput = useRef();

    const [locationoptions,setLocationoptions] = useState(null)
    const [ageoptions, setAgeoptions] = useState(null)

    const handleSubmit = async (e) => {
        if(age.value === "Choose one age group" || location.value === "Choose one location"){
            return;
        }
        e.preventDefault();
        props.setqueries({ agegroup: age.value, location: location.value })
        props.setshowform(null)
    }

    useEffect(()=>{
        fetch(`https://healdata-9scy.vercel.app/api/options` , {
            method: "GET"
        }).then((response)=>{
            return response.json()
        }).then((res)=>{
            let arr = [];
            for (let index = 0; index < res.ageoptions.length; index++) {
                arr.push({label: res.ageoptions[index], value: res.ageoptions[index]})
            }
            setAgeoptions(arr);
            arr = [];
            for (let index = 0; index < res.locationoptions.length; index++) {
                arr.push({label: res.locationoptions[index], value: res.locationoptions[index]})
            }
            setLocationoptions(arr)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const [age, setage] = useState({
        label: "Choose one age group",
        value: "Choose one age group"
      });

      const [location, setlocation] = useState({
        label: "Choose one location",
        value: "Choose one location"
      });

    const handleageChange = (newValue, meta) => {
        if (newValue) {
            setage(newValue)
        }           
      }; 

      const handlelocationChange = (newValue, meta) => {
        if(newValue){
            setlocation(newValue);
        }
    }

    
    return (
        <div className='container w-25 p-3 my-5 d-flex align-items-center justify-content-center'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="agegroup">Age Group</label>
                    {/* <input type="text" className="form-control" id="agegroup" name='agegroup' aria-describedby="emailHelp" placeholder="Age-group" list='agegroups' value={credentials.agegroup} onChange={onChange} required />
                    <datalist id="agegroups">
                        {ageoptions && ageoptions.map((age)=>{
                            return (
                                <option key={age} value={age}>{age}</option>
                            )
                        })}
                    </datalist> */}
                </div>
                <div className="col-md-12 col-sm-2">
                      <Select
                        options={ageoptions}
                        onChange={handleageChange}
                        name="age"
                        value={age}
                      />
                    </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    {/* <input type="text" className="form-control" id="location" name='location' placeholder="Location" list="locations" value={credentials.location} onChange={onChange} required />
                    <datalist id="locations">
                        {locationoptions && locationoptions.map((loc)=>{
                            return (
                                <option key={loc} value={loc}>{loc}</option>
                            )
                        })}
                    </datalist> */}
                </div>
                <div className="col-md-12 col-sm-2">
                      <Select
                        options={locationoptions}
                        onChange={handlelocationChange}
                        name="location"
                        value={location}
                      />
                    </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Form
