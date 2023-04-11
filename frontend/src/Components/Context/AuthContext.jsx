import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { createContext, useState } from "react"
import React from "react";
import { useNavigate } from "react-router-dom";
export const context = createContext()

function ContextProvider({ children }) {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("TOKEN") ? true : false);
  const Toast = useToast()


  const login = (data) => {
    if (!data.email || !data.password) return;
    axios.post("https://bmi-calculator-9vne.onrender.com/user/login", data).then((res) => {
      if (res.data.msg === "Login Success") {
        setIsAuth(true)
        Toast({
          title: 'Login successfull.',
          description: "You have logged in successfully.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: "top"
        })
        localStorage.setItem("TOKEN", res.data.token)
        navigate("/bmi")

      } else {
        Toast({
          title: 'Login Failed.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: "top"
        })
      }
    }).catch((e) => {
      Toast({
        title: e.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top"
      })
      console.log(e)
    })
  }


  const logout = async () => {
    try {
      const res = await axios.get(`https://bmi-calculator-9vne.onrender.com/user/logout`);
      if (res.data.message == "Logout successful") {
        localStorage.removeItem("TOKEN");
        setIsAuth(false);
        Toast({
          title: 'Logout successfull.',
          description: "You have logged out successfully.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: "top"
        })
        navigate("/")
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error)
      Toast({
        title: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top"
      })
    }
  }

  return <context.Provider value={{ isAuth, logout, login }}>
    {children}
  </context.Provider>
}

export default ContextProvider;