import React from 'react'
import { useState } from 'react'
import storeCtrl from './utils/storeCtrl'
import configuredSupabase from './assets/config'
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from 'react'

function FarmInfoUpdatePage() {
  const initialState = { creator_email: "", harvesting_date: "", planting_date: "", crop_name: "", amount_grown: 0, fertilizer_quantity: 0, cost_of_labour: 0, cost_of_supplies: 0, harvested_amount: 0, cost_of_equipments: 0 }
  const [state, setState] = useState(initialState)
  const [btnValue, setBtnValue] = useState("update")
  const { id } = useParams()
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
    const { data, error } = await configuredSupabase.from("record").update({ ...state }).select().eq("id", id)
    setBtnValue("update")
    if (error) {
      alert(error.message)
      return;
    }
    Navigate(`/farm/record/${id}`)


  }
  async function fetchData() {
    const { data, error } = await configuredSupabase.from("record").select().eq("id", id)
    if (data) {
      setState({ ...data[0] })
    }
  }

  useEffect(() => { fetchData() }, [id])
  return (
    <div className='farm-info-create-page'>
      <form onSubmit={submitHandler} action="" className="create-form">
        <h3> Update Farm Record</h3>
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

export default FarmInfoUpdatePage