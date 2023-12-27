import React from 'react'
import { useState } from 'react'
import storeCtrl from './utils/storeCtrl'
import configuredSupabase from './assets/config'
import { useNavigate } from "react-router-dom"

function FarmInfoCreatePage() {
  const initialState = { creator_email: "", harvesting_date: "", planting_date: "", crop_name: "", amount_grown: 0, fertilizer_quantity: 0, cost_of_labour: 0, cost_of_supplies: 0, harvested_amount: 0, cost_of_equipments: 0 }
  const [state, setState] = useState(initialState)
  const [btnValue, setBtnValue] = useState("create")
  const formArr = [
    { name: "crop_name", value: state.crop_name, type: "text", label: "crop name" },
    { name: "amount_grown", value: state.amount_grown, type: "number", label: "amount of crop grown (kg)" },
    { name: "cost_of_supplies", value: state.cost_of_supplies, type: "number", label: "cost of supplies (Naira)" },
    { name: "cost_of_labour", value: state.cost_of_labour, type: "number", label: "cost of labour (Naira)" },
    { name: "cost_of_equipments", value: state.cost_of_equipments, type: "number", label: "cost of equipments (Naira)" },
    { name: "harvesting_date", value: state.harvesting_date, type: "date", label: "harvesting date" },
    { name: "planting_date", value: state.planting_date, type: "date", label: "planting date" },
    { name: "fertilizer_quantity", value: state.fertilizer_quantity, type: "number", label: "fertilizer quantity (kg)" },
    { name: "harvested_amount", value: state.harvested_amount, type: "number", label: "harvested amount (kg)" },

  ]
  const Navigate = useNavigate()

  function onChangeHandler(e) {
    const { value, name } = e.target
    setState(prev => ({ ...prev, [name]: value }))
  }
  async function submitHandler(e) {
    e.preventDefault()
    setBtnValue("loading ...")
    const { harvesting_date, planting_date, crop_name, amount_grown, fertilizer_quantity, cost_of_labour, cost_of_supplies, cost_of_equipments, harvested_amount } = state
    const creator_email = storeCtrl.getItem("email")
    // validation 
    if (!creator_email || !harvesting_date || !planting_date || !crop_name || !amount_grown || !fertilizer_quantity || !harvested_amount || !cost_of_labour || !cost_of_supplies || !cost_of_equipments) {
      alert("kindly fill all field")
      setBtnValue("create")
      return
    }

    const { data, error } = await configuredSupabase.from("record").insert({ harvesting_date, planting_date, crop_name, amount_grown, fertilizer_quantity, cost_of_labour, cost_of_supplies, cost_of_equipments, harvested_amount , creator_email}).select()
    if (error) {
      setBtnValue("create")
      alert(error.message)
    } else {

      setBtnValue("create")
      Navigate("/farm")
    }
  }
  return (
    <div className='farm-info-create-page'>
      <form onSubmit={submitHandler} action="" className="create-form">
        <h3> Create Farm Record</h3>
        {formArr.map(({ name, label, type, value }, index) => {
          return <div key={index} className="create-input-holder">
            <label htmlFor={name}> {label} </label>
            <input onChange={onChangeHandler} name={name} value={value} type={type} />
          </div>
        })}

        <button type="submit" className='create-btn' onClick={submitHandler}> {btnValue} </button>
      </form>
    </div>
  )
}

export default FarmInfoCreatePage