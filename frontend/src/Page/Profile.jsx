import {
    Box,
    Container,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Profile = () => {

    const [user, setUser] = useState({});
    console.log(user)
    const [history, setHistory] = useState([]);

    const getProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/calculate/getProfile`, {
                headers: {
                    'token': localStorage.getItem("TOKEN")
                }
            });
            setUser(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getHistory = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/calculate/history`, {
                headers: {
                    'token': localStorage.getItem("TOKEN")
                }
            });
            setHistory(res.data);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getProfile();
        getHistory();
    }, [])

    return (
        <div>
            <Container>
                <Box>
                    <Heading>Name: {user.name}</Heading>
                    <Heading>Email: {user.email}</Heading>
                </Box>
            </Container>

            <Heading textAlign="center" margin={"auto"} mt={"100px"}>BMI Calculate History</Heading>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th>S. No</Th>
                            <Th>Height(ft)</Th>
                            <Th>Weight(kg)</Th>
                            <Th> BMI </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            history.map((e, i) => {
                                return (
                                    <Tr key={e._id}>
                                        <Td>{i + 1}</Td>
                                        <Td>{e.height}</Td>
                                        <Td>{e.weight}</Td>
                                        <Td>{e.bmi}</Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Profile
