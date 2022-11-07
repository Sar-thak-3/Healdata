import React, { useEffect, useState } from 'react'
import  Form  from "./Form"
import Homecards from './Homecards'

const Home = (props) => {

  const [showform , setshowform] = useState({show: true});
  const [queries , setqueries] = useState(null)

  useEffect(()=>{
    props.setPresent(true)
  } , [queries])

  return (
    <div>
        {(showform) && <Form setshowform={setshowform} setqueries={setqueries}/>}
        {queries && <Homecards queries={queries}/>}
    </div>
  )
}

export default Home