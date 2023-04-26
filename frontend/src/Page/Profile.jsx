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
    Spinner,
} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Profile = () => {

    const [user, setUser] = useState({});
    console.log("user",user);
    const [history, setHistory] = useState([]);
    console.log("history",history);
    const [loading, setLoading] = useState(true);

   /// get-Profile -data
    const getProfile = async () => {
        try {
            const res = await axios.get(`https://bmi-calculator-9vne.onrender.com/calculate/getProfile`, {
                headers: {
                    'token': localStorage.getItem("TOKEN")
                }
            });
            setUser(res.data);
        } catch (error) {
            console.log(error)
        }
    }


    // get-history-data
    const getHistory = async () => {
        try {
            const res = await axios.get(`https://bmi-calculator-9vne.onrender.com/calculate/history`, {
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

    useEffect(() => {
        if (user.name && history.length > 0) {
            setLoading(false);
        }
    }, [user, history])

    return (
        <div>
            {loading ? (
                <Spinner size="xl" mt={250}  color="teal" thickness="4px" speed="0.65s" emptyColor="gray.200" />
            ) : (
                <>
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
                </>
            )}
        </div>
    )
}

export default Profile
