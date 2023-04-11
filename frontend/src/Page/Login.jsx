import React, { useContext, useState } from 'react'
import { Box, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { context } from '../Components/Context/AuthContext';

const initialState = {
  email: "",
  password: ""
}

const Login = () => {
  const [data, setData] = useState(initialState)
  const { login } = useContext(context);


  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const handleClick = (e) => {
    e.preventDefault();
    login(data);
  }

  return (
    <Box>
      <FormControl pl={"30px"} pr="30px" pb="60px" boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} width="30%" margin="auto" mt="100px">
        <Text mt={"20px"} pt={"50px"} fontSize="30px">LogIn</Text>
        <FormLabel mt="20px" >Email</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='email' placeholder='enter email' />
        <FormLabel mt="20px">Password</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='password' type="password" placeholder='enter password' />
        <Input _hover={{ cursor: "Pointer" }} onClick={handleClick} mt="20px" backgroundColor="grey" color="white" type="submit" />
        <Text mt="10px">Don't have an account <Link to="/Signup"><Text color={"blue"}>Signup</Text></Link></Text>
      </FormControl>
    </Box>
  )
}

export default Login;