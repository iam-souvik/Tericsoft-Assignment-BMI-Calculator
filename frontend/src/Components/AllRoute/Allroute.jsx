import React from 'react'
import Profile from '../../Page/Profile'
import Signup from '../../Page/Signup'
import Bmi from '../../Page/Bmi'
import {Routes,Route} from "react-router-dom"
import Login from '../../Page/Login'
import PrivateRoute from '../PrivateRoute/PrivateRoute'

const Allroute = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/bmi" element={<PrivateRoute><Bmi/></PrivateRoute>} />
            </Routes>

        </div>
    )
}

export default Allroute
