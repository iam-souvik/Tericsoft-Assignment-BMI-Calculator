import React, { useContext } from 'react'
import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { context } from '../Context/AuthContext';

const Navbar = () => {
  const { logout, isAuth } = useContext(context)

  return (
    <Flex width={"80%"} alignItems='center' margin={"auto"} gap='2'>
      <Box p='2'>
        <Heading size='md'>BMI CALCULATOR</Heading>
      </Box>
      <Spacer />

      <ButtonGroup gap='6' mt={5} >
        <Button colorScheme='teal'><NavLink to={"/profile"}>Profile</NavLink></Button>
        <Button colorScheme='teal'><NavLink to={"/bmi"}>BMI</NavLink></Button>
        {
          isAuth ?
            <>
              <Button colorScheme='teal' onClick={logout}>Log out</Button>
            </> :
            <>
              <Button colorScheme='teal'><NavLink to={"/"}>Log in</NavLink></Button>
              <Button colorScheme='teal'><NavLink to={"/signup"}>Sign Up</NavLink></Button>
            </>
        }

      </ButtonGroup>

    </Flex>
  )
}

export default Navbar