
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import configuredSupabase from './assets/config'
import storeCtrl from './utils/storeCtrl'
import { useEffect } from 'react'

function RegisterPage() {
  const [state, setState] = useState({ email: "", password: '', farm_name: "", contact: 0, })

  const regArr = [
    { value: state.email, name: "email", type: "email", label: "email" },
    { value: state.farm_name, name: "farm_name", type: "text", label: "farm name" },
    { value: state.contact, name: "contact", type: "number", label: "contact" },
    { value: state.password, name: "password", type: "password", label: "password" },
  ]
  const [btnValue, setBtnValue] = useState("register")
  const [auth, setAuth] = useState(false)
  const Navigate = useNavigate()
  function onChangeHandler(e) {
    const { name, value } = e.target
    setState((prev) => ({ ...prev, [name]: value }))
  }
  async function regSubmitHandler(e) {
    e.preventDefault()
    setBtnValue("loading ...")
    const { contact, email, farm_name, password } = state
    if (!contact || !email || !farm_name || !password) {
      alert("all field must be filled.")
      setBtnValue("register")
      return
    }
    // checking for the existence of a particular email
    const { data: users, error: checkError } = await configuredSupabase.from("user").select()
    if (checkError?.message) {
      alert(checkError.message)
      setBtnValue("register")
      return
    }
    const exist = users.filter(user => user.email === email)
    if (exist.length > 0) {
      alert("user with the email already exist")
      setBtnValue("register")
      return;
    }
    const { data, error } = await configuredSupabase.from("user").insert({ contact, farm_name, email, password }).select()
    setBtnValue("register")
    if (error) {
      alert(error.message)
      return;
    } else {
      storeCtrl.setItem("isAuth", "true")
      storeCtrl.setItem("email", email)
      setAuth(true)

    }

  }
  useEffect(() => {
    if (auth) {
      Navigate("/farm")
    }
  }, [auth])
  return (
    <div className='register-page'>
      <form className='reg-form' action="" onSubmit={regSubmitHandler}>
        {regArr.map(({ name, value, label, type }, index) => {
          return <div key={index} className="reg-input-holder">
            <label htmlFor={name}> {label} </label>
            <input required={true} onChange={onChangeHandler} name={name} type={type} value={value} />
          </div>
        })}
        <button type="submit" onClick={regSubmitHandler} className='reg-btn'> {btnValue} </button>
      </form>
    </div>
  )
}

export default RegisterPage