import React from 'react'
import configuredSupabase from './assets/config'
import { useEffect } from 'react'
import { useState } from 'react'
import storeCtrl from './utils/storeCtrl'
import {useNavigate} from 'react-router-dom'
function FarmInfoList() {
  const Navigate = useNavigate()
  const [state, setState] = useState([])
  async function fetchRecord() {
    const email = storeCtrl.getItem("email")
    const { data, error } = await configuredSupabase.from("record").select().eq("creator_email", email)

    if (error) {
      alert(error.message)
      return
    }
    setState([{ crop_name: "name", amount_grown: "amount_grown(kg)", id: 0, harvested_amount: "harvested_amount(kg)" }, ...data])
  }

  useEffect(() => { fetchRecord() }, [])
  function clickHandler(id) {
    Navigate(`/farm/record/${id}`)
  }
  return (
    <div className='farm-form-list'>
      {state.length ? state.map((elem, index) => <EachFarmList clickHandler={clickHandler} key={index} {...elem} />) : ""}
    </div>
  )
}

function EachFarmList({ crop_name, amount_grown, harvested_amount, id, clickHandler }) {
  return <div data-id={id} id={id} className={`short-each ${id}`} onClick={(e) => {
    clickHandler(id)
  }}>
    <h4> {crop_name} </h4>
    <h4> {harvested_amount}  </h4>
    <h4> {amount_grown}  </h4>
  </div>
}
export default FarmInfoList