import React, { useState, useEffect } from 'react'
import { Flex, Select, Box, Text, Image, Center, Divider, Button } from '@chakra-ui/react'
import axios from 'axios'
import { RootState } from '../../Context/Context'
import { locations, months, years } from './Locations'
import MonthlyStats from '../Charts/MonthlyStats'
import Sidebar from '../Navigation/Sidebar'
import RadialChart from '../Charts/RadialChart'
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts'

function Reports() {

  const [filterParameters, setFilterParameters] = useState({month: new Date().getMonth()+1, year: new Date().getFullYear()})

  const {authState} = RootState()
  const [statsData, setStatsData] = useState([]);
  const [userStats, setUserStats] = useState({})
  const [statsDataMonth, setStatsDataMonth] = useState([]) 
  const [statsProduct, setStatsProduct] = useState([])
  const getChartRecords = async() => {
    
    try{
        if(!authState.user.role){
          const result = await axios.post('http://localhost:3001/record/get-records-year', {email: authState.user.email, ...filterParameters})
          const data = await result.data
          setStatsData(data)
        }
        else{
          const result = await axios.post('http://localhost:3001/record/get-records-year', {...filterParameters})
          const data = await result.data
          setStatsData(data)
        }
    }
    catch(err){
        console.log(err)
    }
  }

  const getStatsByMonth = async() => {
    try{
      if(!authState.user.role){
        const result = await axios.post('http://localhost:3001/record/get-records-month', {
          email: authState.user.email,
          ...filterParameters
        })
        const data = await result.data
        console.log(data)
        setStatsDataMonth(data)
      }
      else{
        const result = await axios.post('http://localhost:3001/record/get-records-month', {
          ...filterParameters
        })
        const data = await result.data
        console.log(data)
        setStatsDataMonth(data)
      }
    }
    catch(err){
      console.error(err)
    }
  }

  const getStatisticByProduct = async() => {
    try{
      if(!authState.user.role){
        const result = await axios.post('http://localhost:3001/record/get-records-product', {email:authState.user.email})
        const data = await result.data
        setStatsProduct(data)
      }
      else{
        const result = await axios.post('http://localhost:3001/record/get-records-product', {})
        const data = await result.data
        console.log(data)
        setStatsProduct(data)
      }
    }
    catch(err){
      console.error(err)
    }
  }

  const getUserStats = async() => {
    try{
      if(!authState.user.role){
        const result = await axios.post('http://localhost:3001/record/get-user-stats', {email:authState.user.email})
        const data = await result.data
        setUserStats(data.result)
      }
      else{
        const result = await axios.post('http://localhost:3001/record/get-user-stats', {role: authState.user.role})
        const data = await result.data
        setUserStats(data.result)
      }
    }
    catch(err){
      console.error(err)
    }
  }

  const onClickFilter = () => {
    getChartRecords()
    getStatsByMonth()
  }
  

  useEffect(() => {
    // Fetch data from API endpoint (replace with your actual API call)
    getChartRecords()
    getStatisticByProduct()
    getUserStats()
    getStatsByMonth()
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];



  let usages = []
  let predictions = []

  statsData.map((item, ind) => {
    usages.push({month: months[ind], avg: item.usage.avg, min: item.usage.min, max: item.usage.max})
  })

  statsData.map((item, ind) => {
    predictions.push({month: months[ind], avg: item.prediction.avg, min: item.prediction.min, max: item.prediction.max})
  })
  

  return (
    <div style={{background: "rgb(4 10 8)"}}>
        <Sidebar />
        <Flex direction="column" padding="2rem" ml="250px" color="white">
          <Box mt="85px"></Box>
          <Center>
            <Box borderRadius="20px" borderWidth="1px" borderColor="rgba(0,73,64,1)" padding="1.6rem"
            background="radial-gradient(circle, rgba(0,73,64,1) 0%, rgba(0,0,0,1) 100%)">
              <Flex width="100%" gap="30px">
                <Box>
                  <Text fontSize="xs" color="gray">User Data</Text>
                  {
                    authState.user.role ?
                    <>
                      <Text fontSize="2xl" mt="10px">{authState.user.name}</Text>
                      <Text fontSize="md">{authState.user.email}</Text>
                    </>
                    :
                    <>
                      <Text fontSize="2xl" mt="10px">{authState.user.name}</Text>
                      <Text fontSize="md">{authState.user.email}</Text>
                      <Text fontSize="md">{authState.user.age}</Text>
                      <Text fontSize="md">{authState.user.locality}</Text>
                    </>
                  }
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray">Usage Statistics</Text>
                  <Flex gap="20px">
                    <Box>
                      <Text fontSize="lg" mt="10px" color="teal">Average</Text>
                      <Text fontSize="lg" color="green">Minimum</Text>
                      <Text fontSize="lg" color="red">Maximum</Text>
                    </Box>
                    <Box textAlign="right">
                      <Text fontSize="lg" mt="10px" color="teal">{Number(userStats.usage?.avg).toFixed(2)}</Text>
                      <Text fontSize="lg" color="green">{userStats.usage?.min}</Text>
                      <Text fontSize="lg" color="red">{userStats.usage?.max}</Text>
                    </Box>
                  </Flex>
                  
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray">Emission Statistics</Text>
                  <Flex gap="20px">
                    <Box>
                      <Text fontSize="lg" mt="10px" color="teal">Average</Text>
                      <Text fontSize="lg" color="green">Minimum</Text>
                      <Text fontSize="lg" color="red">Maximum</Text>
                    </Box>
                    <Box textAlign="right">
                      <Text fontSize="lg" mt="10px" color="teal">{Number(userStats.prediction?.avg).toFixed(2)}</Text>
                      <Text fontSize="lg" color="green">{userStats.prediction?.min}</Text>
                      <Text fontSize="lg" color="red">{userStats.prediction?.max}</Text>
                    </Box>
                  </Flex>
                  
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray">Total</Text>
                  <Flex gap="20px">
                    <Box>
                      <Text fontSize="lg" mt="10px">Usage</Text>
                      <Text fontSize="lg">Emission</Text>
                    </Box>
                    <Box textAlign="right">
                      <Text fontSize="lg" mt="10px">{userStats.totalUsage}</Text>
                      <Text fontSize="lg">{userStats.totalPrediction}</Text>
                    </Box>
                  </Flex>
                  
                </Box>
                {
                  authState.user.role ?
                  <Box>
                    <Text fontSize="xs" color="gray">Number of Users</Text>
                    <Text fontSize="3xl" fontWeight="bolder" textAlign="center" color="white">{userStats?.userCount}</Text>
                    
                  </Box>
                  :
                  <></>
                }
              </Flex>
            </Box>
          </Center>
            <Flex gap="10px" color="white" mt="30px">
                {
                  authState.user.role ?
                  <Select placeholder='Select Location' color="black" background="#00ffc9" onChange={(e) => {
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
                <Select placeholder='Select Appliances' color="black" outline="none" border="none" background="#00ffc9" onChange={(e) =>{
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
                <Select placeholder='Select Vehicles' color="black" outline="none" border="none" background="#00ffc9" onChange={(e) => {
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
                
                <Select placeholder='Select Month' color="black" outline="none" border="none" background="#00ffc9" onChange={(e) => {
                  if(e.target.value === ""){
                    delete filterParameters.vehicle
                    setFilterParameters({...filterParameters, month: new Date().getMonth()})
                  }else{
                    setFilterParameters({...filterParameters, month: e.target.value})
                  }
                }}>
                    {
                      months.map((month, index) => (
                        <option key={index} value={index+1}>{month}</option>
                      ))
                    }
                </Select>
                <Select placeholder='Select Year' color="black" outline="none" border="none" background="#00ffc9" onChange={(e) => {
                  if(e.target.value === ""){
                    delete filterParameters.vehicle
                    setFilterParameters({...filterParameters, year: new Date().getFullYear()})
                  }else{
                    setFilterParameters({...filterParameters, year: e.target.value})
                  }
                }}>
                    {
                      years.map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                      ))
                    }
                </Select>
          </Flex>
            <Button mt="20px" width="100px" colorScheme='teal' onClick={onClickFilter}>Filter</Button>
            <Center>

              <Box mt="30px" width="80%" borderColor="rgba(0,73,64,1)" borderWidth="1px" borderRadius="20px" padding="1.6rem">
                <Text color="grey" textAlign="center">Usage and Prediction Statistics in a Month</Text>
                <Box mt="10px"></Box>
                <Flex>
                    <LineChart width={500} height={400} data={statsDataMonth}>
                      <YAxis />
                      <XAxis 
                      dataKey="day" 
                      />
                      <Legend />
                      <Line 
                      dataKey="usage"
                      stroke="#7c3aed"
                      fill="#8b5cf6"
                      stackId="1" />
                      
                    </LineChart>
                    <LineChart width={500} height={400} data={statsDataMonth}>
                      <YAxis />
                      <XAxis 
                      dataKey="day" 
                      />
                      <Legend />
                    
                      <Line 
                      dataKey="prediction"
                      stroke="#2563eb"
                      fill="#3b82f6"
                      stackId="1" />
                    </LineChart>

                </Flex>
                <Box mt="10px"></Box>
              </Box>
            </Center>
          <Flex flexWrap="wrap" gap="10px" alignItems="center" justifyContent="center" mt="30px">
            {
              statsProduct.products && statsProduct.products.map((val, ind) => (
                
              <Box key={ind} width="350px" borderRadius="20px" borderWidth="1px" borderColor="rgba(0,73,64,1)" padding="2rem"
              background="radial-gradient(circle, rgba(0,73,64,1) 0%, rgba(0,0,0,1) 100%)">
                <Text color="white" fontSize="2xl" fontWeight="light">{val.product}</Text>
                <Center>
                  <Image src={`/images_white/${val.product}.png`} width="50%" mt="10px" />
                </Center>
                    <Flex gap="20px" alignItems="center" justifyContent="center">
                      <Flex mt="20px" gap="30px">
                        <Box>
                          <Text color="white">Usage</Text>
                          <Text color="purple" fontWeight="bold">Average</Text>
                          <Text color="green" fontWeight="bold">Minimum</Text>
                          <Text color="teal" fontWeight="bold">Maximum</Text>
                        </Box>
                        <Box textAlign="right">
                          <Text color="white" fontWeight="bold">Stats</Text>
                          <Text color="purple" fontWeight="bold">{val.usage.avg}</Text>
                          <Text color="green" fontWeight="bold">{val.usage.min}</Text>
                          <Text color="teal" fontWeight="bold">{val.usage.max}</Text>
                        </Box>
                      </Flex>
                      <Flex mt="20px" gap="30px">
                        <Box>
                          <Text color="white">Emission</Text>
                          <Text color="purple" fontWeight="bold">Average</Text>
                          <Text color="green" fontWeight="bold">Minimum</Text>
                          <Text color="teal" fontWeight="bold">Maximum</Text>
                        </Box>
                        <Box textAlign="right">
                          <Text color="white" fontWeight="bold">Stats</Text>
                          <Text color="purple" fontWeight="bold">{Number(val.prediction.avg).toFixed(2)}</Text>
                          <Text color="green" fontWeight="bold">{val.prediction.min}</Text>
                          <Text color="teal" fontWeight="bold">{val.prediction.max}</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
              ))
            }
              </Flex>
          <Flex gap="20px">
            <Box width="50%" mt="30px" borderColor="rgba(0,73,64,1)" borderWidth="1px" borderRadius="20px" padding="1.6rem">
              <Text color="white" textAlign="center">Usage Statistics</Text>
              <Box mt="10px"></Box>
              <MonthlyStats usages={usages} />
              <Box mt="10px"></Box>
            </Box>
            <Box width="50%" mt="30px" borderColor="rgba(0,73,64,1)" borderWidth="1px" borderRadius="20px" padding="1.6rem">
              <Text color="white" textAlign="center">Emission Statistics</Text>
              <Box mt="10px"></Box>
              <MonthlyStats usages={predictions} />
              <Box mt="10px"></Box>
            </Box>
          </Flex>
          <Center>
            <Flex gap="30px">
              <Box mt="30px" borderColor="rgba(0,73,64,1)" borderWidth="1px" borderRadius="20px" padding="1.6rem">
                <Text color="white" textAlign="center">Statistics by Products</Text>
                <Box mt="10px"></Box>
                <RadialChart data={statsProduct.products} />
                <Box mt="10px"></Box>
              </Box>
              {
                authState.user.role ?
                <Box mt="30px" borderColor="rgba(0,73,64,1)" borderWidth="1px" borderRadius="20px" padding="1.6rem">
                  <Text color="white" textAlign="center">Statistics by Location</Text>
                  <Box mt="10px"></Box>
                  <RadialChart data={statsProduct.locations} />
                  <Box mt="10px"></Box>
                </Box>
                :
                <></>
              }
            </Flex>
          </Center>
        </Flex>
    </div>
  )
}

export default Reports