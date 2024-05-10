import React, { useState, useEffect } from 'react'
import { Flex, Button, Select, Center } from '@chakra-ui/react'
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../Navigation/Sidebar'
import { locations } from './Locations'
import axios from 'axios'
import { RootState } from '../../Context/Context'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

function DashHome() {

  const [record, setRecords] = useState([])
  const [filterRecords, setFilterRecords] = useState([])
  const [filterParameters, setFilterParameters] = useState({})
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
        await getAllRecords(); // Wait for getAllRecords to complete
      } else {
        authDispatch({
          type: "LOGOUT"
        });
        navigate("/")
      }
    };
  
    fetchData(); // Call the async function
  }, []);
  



  const getAllRecords = async() => {
    if(authState.user?.role){
      const result = await axios.get("http://localhost:3001/record/get-all-records")
      const data = await result.data
      setRecords(data.result)
      console.log(data)
      setFilterRecords(data.result)
    }
    else{
      // console.log(authState)
      const result = await axios.post("http://localhost:3001/record/get-all-user-records", {email: authState.user?.email})
      const data = await result.data
      setRecords(data.result)
      console.log(data)
      setFilterRecords(data.result)
    }
  }

  const getDynamicRecords = async() => {
    if(!authState.user.role){
      const result = await axios.post("http://localhost:3001/record/get-dynamic-records", {...filterParameters, email:authState.user?.email})
      const data = await result.data
      console.log(data)
      setFilterRecords(data.result)
    }
    else{
      const result = await axios.post("http://localhost:3001/record/get-dynamic-records", {...filterParameters })
      const data = await result.data
      console.log(data)
      setFilterRecords(data.result)
    }
  }


  return (
    <div>
      <Flex background="rgb(4 10 8)" color="white">
        <Sidebar />
        <Flex marginLeft="260px" padding="2rem" borderRadius="30px" width="100%" alignItems="center" direction="column" mt="85px">
        <Flex gap="20px" mt="30px" color="black">
                {
                  authState.user?.role ?
                  <Select placeholder='Select Location' background="#00ffc9" onChange={(e) => {
                    if(e.target.value === ""){
                      delete filterParameters.location
                      setFilterParameters({...filterParameters})
                    }else{
                      setFilterParameters({...filterParameters, location: e.target.value})
                    }
                  }}>
                      {
                          locations.map((item, i) => (
                              <option key={i} value={item}>{item}</option>
                          ))
                      }
                  </Select>
                  :
                  <></>
                }
                <Select placeholder='Select Appliances' background="#00ffc9" onChange={(e) =>{
                  if(e.target.value === ""){
                    delete filterParameters.appliance
                    setFilterParameters({...filterParameters})
                  }else{
                    setFilterParameters({...filterParameters, product: e.target.value})
                  }
                }}>
                    <option value='Tubelight'>Tubelight</option>
                    <option value='Air Conditioner'>Air Conditioner</option>
                    <option value='Washing Machine'>Washing Machine</option>
                    <option value='Ceiling Fan'>Ceiling Fan</option>
                </Select>
                <Select placeholder='Select Vehicles' background="#00ffc9" onChange={(e) => {
                  if(e.target.value === ""){
                    delete filterParameters.vehicle
                    setFilterParameters({...filterParameters})
                  }else{
                    setFilterParameters({...filterParameters, product: e.target.value})
                  }
                }}>
                    <option value='2 Wheeler'>2 Wheeler</option>
                    <option value='4 Wheeler'>4 Wheeler</option>
                </Select>
                <Select placeholder='Select Fuel Type' background="#00ffc9" onChange={(e) => {
                  if(e.target.value === ""){
                    delete filterParameters.vehicle
                    setFilterParameters({...filterParameters})
                  }else{
                    setFilterParameters({...filterParameters, fuelType: e.target.value})
                  }
                }}>
                    <option value='Petrol'>Petrol</option>
                    <option value='Diesel'>Diesel</option>
                </Select>
                <Button onClick={getDynamicRecords} width="200px" colorScheme="teal">Filter</Button>
              </Flex>
          {
            filterRecords.length === 0 ?
            <Box height="100vh">
              <Text mt="30px">No records</Text>
            </Box>
            :
            <>
              <Box mt="30px"></Box>
              <Flex flexWrap="wrap" alignItems="center" justifyContent="center" gap="20px">
              {
                filterRecords && filterRecords.map((item, index) => (
                    <Box
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      boxShadow="lg"
                      as={Link}
                      borderColor="rgba(0,73,64,1)"
                      to={`/records/${item.id}`}
                      background="radial-gradient(circle, rgba(0,73,64,1) 0%, rgba(0,0,0,1) 100%)"
                    >
                      <Center p="2rem">
                        <Image src={`/images_white/${item.product}.png`} alt="Placeholder image" width="50%" />
                      </Center>

                      <Box p="6">
                        <VStack spacing={3} align="start">
                          <Text fontSize="xl" fontWeight="bold">
                            {item.product}
                          </Text>
                          <Text fontSize="md" color="gray.600">
                            Date: {item.date}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            Usage: {item.usage} {item.fuelType === "electricity" ? 'Hours':'Kilometers'}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            Emission: {item.prediction} KgCO2
                          </Text>
                        </VStack>
                      </Box>
                    </Box>
                ))
              }
              </Flex>
            </>
          }
        </Flex>
      </Flex>
    </div>
  )
}

export default DashHome