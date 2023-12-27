import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import storeCtrl from "../utils/storeCtrl"


function Nav() {
  const { pathname } = useLocation()
  const navArrState = pathname.includes("/farm")
  const [auth, setAuth] = useState(navArrState)
  // console.log()
  const defaultNavArr = [
    { name: "Home", href: "/" },
    { name: "login", href: "/login" },
    { name: "register", href: "/register" },

  ]
  const Navigate = useNavigate()
  const authNavArr = [
    { name: "Record", href: "/farm" },
    { name: "create", href: "/farm/create" },
    { name: "logout", href: "/login" },
  ]
  const navArr = navArrState ? authNavArr : defaultNavArr
  function barClick() {
    const navLinkHolder = document.querySelector(".nav-link-holder")
    navLinkHolder.classList.toggle("nav-mobile")
  }
  // useEffect(() => {
  //   if (!auth) {
  //     Navigate("/login")
  //   }
  // }, [auth])
  function logoutFunc() {
    storeCtrl.clearItem("isAuth")
    storeCtrl.clearItem("email")
    setAuth(false)
    Navigate("/")
  }
  return (
    <div className="main-nav">
      <h4 className="site-name"> farm-info </h4>
      <div className="bar-menu" onClick={barClick} >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <section className="nav-link-holder nav-mobile">
        {navArr.map(({ name, href }, index) => <a onClick={(e) => {
          barClick()
          if (name === "logout") { logoutFunc() }
        }} className="nav-link" key={index} href={href}  > {name} </a>)}
      </section>
    </div>
  )
}

export default Nav