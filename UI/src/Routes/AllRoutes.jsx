
import {Route, Routes} from "react-router-dom"
import HomePage from "../Components/HomePage"
import PrintedTShirt from "../Components/PrintedTShirt"
import TexturedTshirt from "../Components/TexturedTshirt"
import PlainTShirt from "../Components/PlainTShirt"
import Designs from "../Components/Designs"
import Admin from "../Components/Admin"
import AddProduct from "../Components/AddProduct"
import Login from "../Components/Login"

const AllRoutes = () => {
  return (
    <div>
      <Routes>

    <Route path="/" element={ <HomePage/> }/>
    <Route path="/PrintedCategory/:category" element={ <PrintedTShirt/> }/>
    <Route path="/texturedCategory/:category" element={ <TexturedTshirt/> }/>
    <Route path="/plainCategory/:category" element={ <PlainTShirt/> }/>
    <Route path="/designCategory/:category" element={ <Designs/> }/>
    <Route path="/addProducts" element={ <AddProduct/> }/>
    <Route path="/Login" element={ <Login/> }/>


    <Route path="/dashboard" element={ <Admin/> }/>

      </Routes>
    </div>
  )
}

export default AllRoutes
