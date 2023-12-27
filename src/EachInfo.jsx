import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import configuredSupabase from './assets/config'
import { useEffect } from 'react'
import { useState } from 'react'
function EachInfo() {
    const [state, setState] = useState(null)
    const { id } = useParams()
    const Navigate = useNavigate()
    async function fetchData() {
        const { data, error } = await configuredSupabase.from("record").select().eq("id", id)
        if (error) {
            alert(error.message)
            return
        }

        setState(data[0])
    }

    useEffect(() => {
        fetchData()
    }, [id])

    async function deleteHandler() {
        const {data, error} = await configuredSupabase.from("record").delete().eq("id", id)
        if (!data) {
            Navigate("/farm")
        }
    }
    function updateHandler() {
        Navigate(`/farm/update/${id}`)
    }
    return (
        <div className='each-info-page'>
            {!state ? <h1>loading ...</h1> : (<main>
                <h4> Name: {state.crop_name} </h4>
                <h4> Amount grown: {state.amount_grown} kg </h4>
                <h4> Amount harvested: {state.harvested_amount} kg </h4>
                <h4> Planting date: {new Date(state.planting_date).toDateString()} </h4>
                <h4> Harvesting date: {new Date(state.harvesting_date).toDateString()} </h4>
                <h4>Fertilizer quantity: {state.fertilizer_quantity }</h4>
                <h4> Cost of supplies: {state.cost_of_supplies} (Naira) </h4>
                <h4> Cost of equipments: {state.equipments} (Naira) </h4>
                <h4> Cost of labour: {state.labour} (Naira) </h4>
                <div className="each-btn-holder">
                    <button type="button" onClick={deleteHandler} className='each-btn'>delete</button>
                    <button type="button" onClickCapture={updateHandler} className='each-btn'>update</button>
              </div>
            
            </main>)}
        </div>
    )
}

export default EachInfo