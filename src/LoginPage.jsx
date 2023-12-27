import { useState } from 'react'
import configuredSupabase from './assets/config'
import storeCtrl from './utils/storeCtrl'
import { useNavigate } from "react-router-dom"
function LoginPage() {
  const [state, setState] = useState({ email: "", password: "" })
  const [btnValue, setBtnValue] = useState("login")
  const Navigate = useNavigate()
  function onChangeHandler(e) {
    const { name, value } = e.target
    setState((prev) => ({ ...prev, [name]: value }))
  }
  const inputArr = [
    { name: "email", value: state.email },
    { name: "password", value: state.password },
  ]
  async function submitHandler(e) {
    e.preventDefault()
    setBtnValue("loading ...")
    const { email, password } = state
    if (!email || !password) {
      alert("all field are required . ")
      return
    }

    const { data, error } = await configuredSupabase.from("user").select().eq("email", email)
    setBtnValue("login")
    if (error || data.length < 1) {
      alert(error.message || "incorrect login details")
      return
    }
    const resPassword = data[0].password

    if (resPassword === password) {
      storeCtrl.setItem("isAuth", "true")
      storeCtrl.setItem("email", email)
      setBtnValue("login")
      Navigate("/farm")
    } else {
      alert("invalid login credentials")
    }

  }
  return (
    <div className='login-page'>
      <form action="" className="login-form" onSubmit={submitHandler}>
        {inputArr.map(({ name, value }, index) => {
          return <div key={index} className="login-input-holder">
            <label htmlFor={name}> {name} </label>
            <input onChange={onChangeHandler} type={name} value={value} name={name} />
          </div>
        })}
        <button type="submit" onClick={submitHandler} className='login-btn'> {btnValue} </button>
      </form>
    </div>
  )
}

export default LoginPage