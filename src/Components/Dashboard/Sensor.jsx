import React, { useState, useEffect } from 'react'
import { Flex, Button, Select, Center } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../Navigation/Sidebar'
import axios from 'axios'
import { RootState } from '../../Context/Context'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

function Sensor() {

  const [record, setRecords] = useState([])
  const cookies = new Cookies()
  const {authState, authDispatch} = RootState()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      if (cookies.get('token')) {
        console.log(jwtDecode(cookies.get('token')));
        const user = jwtDecode(cookies.get('token'));
        authDispatch({
          type: "LOGIN",
          payload: {
            user: user
          }
        });
       // Wait for getAllRecords to complete
      } else {
        authDispatch({
          type: "LOGOUT"
        });
        navigate("/")
      }
    };
  
    fetchData(); // Call the async function
  }, []);
  



  const getSensorRecords = async() => {
      try{
          const result = await axios.post("http://localhost:3001/record/get-sensor-data", {email: authState.user?.email})
          const data = await result.data
          setRecords(data)
          console.log(data)
      }
      catch(err){
        console.error(err)
      }
    
  }

  useEffect(() => {
    getSensorRecords()
  }, [])
  


  return (
    <div>
      <Flex background="rgb(4 10 8)" color="white">
        <Sidebar />
        <Flex ml="260px" padding="2rem" background="rgb(4 10 8)" color="white" mt="85px" height='100vh'>
        <TableContainer>
        <Table variant='simple'>
            <TableCaption>Sensor readings data</TableCaption>
            <Thead>
            <Tr>
                <Th>User</Th>
                <Th>Product</Th>
                <Th>Sensor</Th>
                <Th isNumeric>Usage (Hours/Km)</Th>
                <Th isNumeric>Emission (kgCO2e)</Th>
            </Tr>
            </Thead>
            <Tbody>
                {
                    record && record.map((item, index) => (
                        <Tr kry={index}>
                            <Td>{item.user}</Td>
                            <Td>{item.type}</Td>
                            <Td>{item.sensor}</Td>
                            <Td isNumeric>{Number(item.usage)}</Td>
                            <Td isNumeric>{Number(item.emission).toFixed(2)}</Td>
                        </Tr>
                    ))
                }
            
            </Tbody>
            
        </Table>
        </TableContainer>
        </Flex>
        
      </Flex>
    </div>
  )
}

export default Sensor