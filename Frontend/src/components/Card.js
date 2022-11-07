import React from 'react'
import Singlecard from './Singlecard'

const Card = (props) => {
    return (
        <div className="card my-4 mx-4" style={{ width: "33rem" }}>
            <div className="card-body">
                <h5 className="card-title">{Object.keys(props.allinfo)}</h5>
            </div>
            <div >
                <Singlecard allinfo={props.allinfo[`${Object.keys(props.allinfo)[0]}`]} />
            </div>
        </div>
    )
}

export default Card