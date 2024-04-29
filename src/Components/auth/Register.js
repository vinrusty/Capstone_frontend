import React, { useState } from 'react'
import { useToast, Flex, Input, FormLabel, Button, Box, Select } from '@chakra-ui/react'
import { locations } from '../Dashboard/Locations'
import axios from 'axios'

function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [locality, setLocality] = useState("")
    const toast = useToast()

    const onSubmitRegister = async() => {
        try{
            if(name === "" | age === 0 | email === "" | password === "" | locality === ""){
                toast({
                    title: "Fill all fields",
                    status: "error"
                })
            }
            else{
                const result = await axios.post("http://localhost:3001/auth/register", {
                    email,
                    password,
                    name,
                    age,
                    locality,
                    role: true
                })
    
                const data = await result.data
                if(data.message === "success"){
                    toast({
                        title: "Registered Successfully",
                        status: "success"
                    })
                }
                else{
                    toast({
                        title: "Check all fields again",
                        status: "error"
                    })
                }
            }
        }
        catch(err){
            toast({
                title: "Server error!",
                status: "error"
            })
        }
    }

  return (
    <div>
        <Flex direction="column" p="2rem">
            <Box>
                <FormLabel requiredIndicator>Name</FormLabel>
                <Input type="text" variant="filled" placeholder='Enter your Name' onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box mt="20px">
                <FormLabel requiredIndicator>Email</FormLabel>
                <Input type="email" variant="filled" placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} />
            </Box>
            <Box mt="20px">
                <FormLabel requiredIndicator>Password</FormLabel>
                <Input type="password" variant="filled" placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)} />
            </Box>
            <Box mt="20px">
                <FormLabel requiredIndicator>Age</FormLabel>
                <Input type="number" variant="filled" placeholder='Enter your age' onChange={(e) => setAge(e.target.value)} />
            </Box>
            <Box mt="20px">
                <FormLabel requiredIndicator>Select Locality</FormLabel>
                <Select placeholder='Select Location' onChange={(e) => setLocality(e.target.value)}>
                    {
                        locations.map((item, i) => (
                            <option key={i} value={item}>{item}</option>
                        ))
                    }
                </Select>
            </Box>
            <Button mt="20px" colorScheme='teal' onClick={onSubmitRegister}>Register</Button>
        </Flex>
    </div>
  )
}

export default Register