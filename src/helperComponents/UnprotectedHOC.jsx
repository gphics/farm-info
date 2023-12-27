import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import storeCtrl from "../utils/storeCtrl"
import Nav from "./Nav"


function UnprotectedHOC() {
    const isAuth = storeCtrl.getItem("isAuth")
    const Navigate = useNavigate()
    useEffect(() => {
        if (isAuth) {
            Navigate("/farm")
        }
    },[isAuth])
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}

export default UnprotectedHOC