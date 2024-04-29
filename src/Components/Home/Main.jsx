import React from 'react'
import { Text, Flex, Button } from '@chakra-ui/react';
import About from './About';
import {Link} from 'react-router-dom'
import { RootState } from '../../Context/Context';

function Main() {

  const {authState} = RootState()

  return (
    <div>
      <Flex alignItems="center" justifyContent="center" direction="column" height="90vh" background="rgb(4 10 8)">
        <Text color="green" fontSize="2.5rem" fontWeight="bold">Visualize the amount of CO2 Emmisions</Text>
        <Text color="teal" fontSize="1.5rem">Pledge for Sustainable and a Greener Lifestyle</Text>
          {
            !authState.user ?
            <Flex gap="10px" mt="20px">
              <Button colorScheme="teal" width="200px" as={Link} to="/login">Login</Button>
              <Button colorScheme="teal" width="200px" as={Link} to="/register">Register</Button>
            </Flex>
            :
            <Flex gap="10px" mt="20px">
              <Button colorScheme="teal" width="200px" as={Link} to="/dashboard">Get Started</Button>
            </Flex>
          }
      </Flex>
      <About />
    </div>
  )
}

export default Main