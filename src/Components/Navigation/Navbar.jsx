import React from 'react'
import {Flex, Heading, Text, Button, VStack} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RootState } from '../../Context/Context'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

function Navbar() {

  const {authState, authDispatch} = RootState()
  const cookies = new Cookies()
  const navigate = useNavigate()

  const onLogout = () => {
    cookies.remove('token')
    authDispatch({
      action: "LOGOUT"
    })
    window.location.replace("/")
  }


  return (
    <div>
        <Flex alignItems="center" px="2rem" py="1rem" color="white" background="rgb(7 19 17)" position="fixed" width="100%" zIndex="999">
            <Heading mr="auto">GreenStride</Heading>
              {
                authState.user ?

                <Flex alignItems="center" gap="20px">
                    <VStack gap="0">
                      <Text width="100%" fontWeight="bold">{authState.user.name}</Text>
                      <Text color="grey.200">{authState.user.email}</Text>
                    </VStack>
                    <Button onClick={onLogout}>Logout</Button>
                </Flex>
                :
                <Flex alignItems="center" justifyContent="center" gap="20px">
                    
                </Flex>
              }
        </Flex>
    </div>
  )
}

export default Navbar