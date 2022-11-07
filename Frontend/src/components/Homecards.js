import React from 'react'
import { useEffect, useState } from 'react'
import Card from './Card'

const Homecards = (props) => {
    const [allcards, setAllcards] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/api/health?location=${props.queries.location}&agerange=${props.queries.agegroup}`, {
            method: "GET",
        }).then((response) => {
            return response.json()
        })
            .then((data) => {
                setAllcards({ result: data.result })
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className='container-fluid p-0 m-0 align-items-center justify-content-center d-flex'>
                <div className="row w-100 p-0 w-0">
                    {/* <div className="col-lg-4 mb-2"> */}
                        {allcards && allcards.result.map((card) => {
                            return <Card key={Object.keys(card)[0]} allinfo={card} />
                        })}
                    {/* </div> */}
                </div>
            </div>
        </>
    );
}

export default Homecards