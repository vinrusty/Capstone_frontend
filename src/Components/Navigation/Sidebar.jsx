import React from 'react'
import { Flex, Box, Text, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div>
        <Box width="250px" direction="column" background="rgb(7 19 17)" color="white" position="fixed" height="87vh" m="5px" borderRadius="5px" mt="85px">
            <Flex p="2rem" alignItems="center" as={Link} to="/">
                <Text fontSize='3xl'>GreenStride</Text>
            </Flex>
            <Flex px="2rem" py="1rem" alignItems="center" as={Link} gap="10px" to="/create">
                <Image src='/images_white/create.png' height="30px" />
                <Text fontSize='lg'>Create</Text>
            </Flex>
            <Flex px="2rem" py="1rem" alignItems="center" as={Link} gap="10px" to="/dashboard">
                <Image src='/images_white/dashboard.png' height="30px" />
                <Text fontSize='lg'>My Dashboard</Text>
            </Flex>
            <Flex px="2rem" py="1rem" alignItems="center" as={Link} gap="10px" to="/reports">
                <Image src='/images_white/report.png' height="30px" />
                <Text fontSize='lg'>Reports</Text>
            </Flex>
            
            
        </Box>
    </div>
  )
}

export default Sidebar