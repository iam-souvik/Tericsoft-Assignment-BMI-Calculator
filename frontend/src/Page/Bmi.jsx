import { useEffect, useState } from "react";
import {
    Text,
    Input,
    Button,
    Box,
    HStack,
    useToast,
} from "@chakra-ui/react";
import axios from 'axios';



function Bmi() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [message, setMessage] = useState("");
    const [bmi, setBmi] = useState("");
    const [exe, setExe] = useState([]);
    const toast = useToast();

    const calcBmi = async (e) => {

        e.preventDefault();

        if (!height || !weight) return;

        try {
            const res = await axios.post(`http://localhost:8080/calculate/details`, { height, weight }, {
                headers: {
                    'token': localStorage.getItem("TOKEN")
                }
            })

            const { bmi } = res.data;


            if (bmi < 18.5) {
                setMessage(
                    `Based on the height and weight entered, your BMI is ${bmi.toFixed(
                        1
                    )} indicating your weight is in the Under Weight for adults.`
                );
                toast({
                    title: "Under Weight ",
                    status: "info",
                    duration: 1000,
                    isClosable: true,
                });
            }
            if (bmi >= 18.5 && bmi < 25) {
                setMessage(
                    `Based on the height and weight entered, your BMI is ${bmi.toFixed(
                        1
                    )} indicating your weight is in the Normal Weight for adults.`
                );
                toast({
                    title: "Normal Weight ",
                    status: "info",
                    duration: 1000,
                    isClosable: true,
                });
            }
            if (bmi >= 25 && bmi < 30) {
                setMessage(
                    `Based on the height and weight entered, your BMI is ${bmi.toFixed(
                        1
                    )} indicating your weight is in the Healthy Weight for adults.`
                );
                toast({
                    title: "Healthy Weight ",
                    status: "info",
                    duration: 1000,
                    isClosable: true,
                });
            }
            if (bmi >= 30) {
                setMessage(
                    `Based on the height and weight entered, your BMI is ${bmi.toFixed(
                        1
                    )} indicating your weight is in the Obese for adults.`
                );
                toast({
                    title: "Obese Weight ",
                    status: "info",
                    duration: 1000,
                    isClosable: true,
                });
            }
            setHeight("")
            setWeight("");
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <Text as="h2" fontWeight="bold" fontSize="3xl" mt={55}>
                BMI Calculator – Check Your Body Mass Index  For Women & Men
            </Text>
            <Text width="80%" margin="auto" textAlign="left">
                It is an excellent tool to measure a person’s leanness or fatness as per
                height and weight. It widely describes whether your are in healthy zone
                or need to lose or gain weight. BMI ranges may vary based on your
                exercise regime. More you gain weight more will be the BMI but it does
                not mean that you are obese it can be because of high muscle mass also.
            </Text>

            {/* BMI APP */}
            <Text as="h3" fontSize="xl" fontWeight={"bold"} textAlign={"center"} mt={9}>
                BMI Calculator
            </Text>
            <Box width="40%" margin="auto" textAlign="center">
                <form onSubmit={calcBmi}>
                    <Box marginTop="2">
                        <Input
                            type='number'
                            value={weight}
                            onChange={(e) => setWeight(+e.target.value)}
                            placeholder="Enter Your Weight in Kgs"
                            required
                        />
                    </Box>
                    <Box marginTop="2">
                        <Input
                            type="number"
                            value={height}
                            onChange={(el) => setHeight(+el.target.value)}
                            placeholder="Enter Your Height in ft"
                            required
                        />
                    </Box>
                    <HStack marginTop="2" gap="5" justifyContent="space-around">
                        <Button
                            fontWeight="600"
                            bgColor="black"
                            color="white"
                            borderRadius="md"
                            _hover={{
                                bg: "#FD8A8A",
                            }}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </HStack>
                </form>
                <Box>
                    <Text><strong>{message}</strong></Text>
                </Box>
            </Box>
            {/* BMI APP ENDS*/}
        </div>
    );
}
export default Bmi;
