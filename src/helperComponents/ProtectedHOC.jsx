import { Outlet, useNavigate } from "react-router-dom"
import Nav from "./Nav"
import { useEffect } from "react"
import storeCtrl from "../utils/storeCtrl"


function ProtectedHOC() {
    const isAuth = storeCtrl.getItem("isAuth")
    const Navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            Navigate("/")
        }
    }, [isAuth])
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}

export default ProtectedHOC