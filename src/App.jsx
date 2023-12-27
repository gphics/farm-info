import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./HomePage"
import RegisterPage from "./RegisterPage"
import LoginPage from "./LoginPage"
import UnprotectedHOC from "./helperComponents/UnprotectedHOC"
import ProtectedHOC from "./helperComponents/ProtectedHOC"
import FarmInfoListPage from "./FarmInfoListPage"
import FarmInfoCreatePage from "./FarmInfoCreatePage"
import FarmInfoUpdatePage from "./FarmInfoUpdatePage"
import "./assets/style.css"
import EachInfo from "./EachInfo"
function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        {/* uathenticated */}
        <Route path="/" element={<UnprotectedHOC/>}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        {/* authenticated */}
        <Route path="/farm" element={<ProtectedHOC />}>
          <Route index element={<FarmInfoListPage/>} />
          <Route path="create" element={<FarmInfoCreatePage/>} />
          <Route path="update/:id" element={<FarmInfoUpdatePage/>} />
          <Route path="record/:id" element={<EachInfo/>} />
        </Route>
        {/* <Route path="fa" */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
