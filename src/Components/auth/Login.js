import React, { useState } from 'react'
import { useToast, Flex, Box, Input, Button, FormLabel } from '@chakra-ui/react'
import axios from 'axios'
import { RootState } from '../../Context/Context'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import Cookies from 'universal-cookie'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const toast = useToast()
    const {authDispatch} = RootState()
    const navigate = useNavigate()
    const cookies = new Cookies()

    const onSubmitLogin = async() => {
        try{
            if(email === "" | password === ""){
                toast({
                    title: "Fill all fields",
                    status: "error"
                })
            }
            else{
                const result = await axios.post("http://localhost:3001/auth/login", {
                    email,
                    password
                })
                const data = await result.data
                if(data.message === "success"){
                    const user = jwtDecode(data.result.aToken)
                    cookies.set('token', data.result.aToken, {maxAge: 30*60})
                    authDispatch({
                        type: "LOGIN",
                        payload: {
                            user: user
                        }
                    })
                    toast({
                        title: "Login successful",
                        status: "success",
                    })
                    navigate("/")
                }
                else{
                    toast({
                        title: "Check you Email and Password once again!",
                        status: "error"
                    })
                }
            }
        }
        catch(err){
            console.error(err)
            toast({
                title: "Server Error!",
                status: "error"
            })
        }
    }

  return (
    <div>
        <Flex direction="column" p="2rem" background='rgb(4 10 8)' color="white" height="100vh">
            <Box mt="85px">
                <FormLabel requiredIndicator>Email</FormLabel>
                <Input type="email" variant="outline" placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} />
            </Box>
            <Box mt="20px">
                <FormLabel requiredIndicator>Password</FormLabel>
                <Input type="password" variant="outline" placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)} />
            </Box>
            <Button colorScheme='teal' mt="20px" onClick={onSubmitLogin}>Login</Button>
        </Flex>
    </div>
  )
}

export default Login