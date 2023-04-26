import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input,  Text, useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const initialState = {
    name: "",
    email: "",
    password: ""
}

const Signup = () => {

    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const Toast = useToast();
    const navigate = useNavigate();

 
    function handleClick() {
        setLoading(true);
        axios.post("https://bmi-calculator-9vne.onrender.com/user/signup", data).then((res) => {
            if (res.data.msg === "Signup Successfull") {
                Toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                })
                navigate("/")
            } else if (res.data.msg === "User already exists") {
                Toast({
                    title: 'User already exists',
                    description: "User already exists",
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                })
            }
        }).catch((e) => {
            Toast({
                title: e.message,
                description: e.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "top"
            })
        }).finally(() => {
            setLoading(false)
        })

    }

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    return (
        <Box>
            <FormControl pl={"30px"} pr="30px" pb="60px" boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} width="30%" margin="auto" mt="100px">
                <Text mt={"20px"} pt={"50px"} fontSize="30px">SignUp</Text>
                <FormLabel mt="20px"  >Name</FormLabel>
                <Input onChange={(e) => handleChange(e)} name='name' placeholder='Full Name' />
                <FormLabel mt="20px" >Email</FormLabel>
                <Input onChange={(e) => handleChange(e)} name='email' placeholder='Enter email' />
                <FormLabel mt="20px"  >Password</FormLabel>
                <Input onChange={(e) => handleChange(e)} name='password' type={"password"} placeholder='Enter password' />
                <Button _hover={{ cursor: "Pointer" }} onClick={(e) => handleClick(e)} mt="20px" backgroundColor="grey" color="white" type="submit" isLoading={loading} loadingText="Submitting" >Sign up</Button>
                <Text mt="10px">Already have an account <Link to="/"><Text color={"blue"}>Login</Text></Link></Text>
            </FormControl>
        </Box>
    )
}

export default Signup