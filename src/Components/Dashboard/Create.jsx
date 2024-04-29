import React, { useState } from 'react'
import { Flex, Input, FormLabel, Text, Button, Select, Box, Image } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, useToast } from '@chakra-ui/react'
import {v4 as uuid} from 'uuid'
import axios from 'axios';
import { locations } from './Locations';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react'
import { RootState } from '../../Context/Context';

function Create() {

  const [appl, setAppl] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [hours, setHours] = useState(0);
  const [kilometers, setKilometers] = useState(0);
  const [firstResult, setFirstResult] = useState(0);
  const [newResult, setNewResult] = useState(firstResult);
  const [firstResultTransport, setFirstResultTransport] = useState(0);
  const [newResultTransport, setNewResultTransport] = useState(firstResult);
  const [sliderValue1, setSliderValue1] = useState(0)
  const [sliderValue2, setSliderValue2] = useState(0)
  const [sliderValue3, setSliderValue3] = useState(0)
  const [sliderValue4, setSliderValue4] = useState(0)
  const [recommendedValue, setRecommendedValue] = useState(null);
  const [fuelType, setFuelType] = useState("electricity");
  const [date, setDate] = useState('')
  const toast = useToast();
  const {authState} = RootState()

  const eletricalAppliance = async (appliance) =>{
    try{
        const result = await axios.post(`http://localhost:8000/predict/${appliance}`, {
            hours: hours
        })
        const data = await result.data
        console.log(data)
        setFirstResult(Number(data.prediction).toFixed(2))
        setNewResult(Number(data.prediction).toFixed(2))
    }
    catch(err){
        console.error(err)
    }
  }

  const vehicleCalculation = async (v) =>{
    try{
        const result = await axios.post(`http://localhost:8000/predict/${v}`, {
            hours: kilometers
        })
        const data = await result.data
        console.log(data)
        setFirstResultTransport(Number(data.prediction).toFixed(2))
        setNewResultTransport(Number(data.prediction).toFixed(2))
    }
    catch(err){
        console.error(err)
    }
  }

  const getRecommendationElectrical = async(appl, a, b, c, d, goal) => {
    try{
        const result = await axios.post(`http://localhost:8000/rl/electrical/${appl}`, {
            a,
            b,
            c,
            d,
            goal_consumption: goal
        })
        const data = await result.data
        console.log(data)
        setRecommendedValue(data)
    }
    catch(err){
        console.error(err)
    }
  }

  const getRecommendationTransport = async(v, a, b, c, d, goal, fuel) => {
    try{
        const result = await axios.post(`http://localhost:8000/rl/transport/${v}`, {
            a,
            b,
            c,
            d,
            goal_consumption: goal,
            fuel_type: fuel
        })
        const data = await result.data
        console.log(data)
        setRecommendedValue(data)
    }
    catch(err){
        console.error(err)
    }
  }

  const createApplianceEmmisionRecord = async() => {
    console.log(authState)
    try{
        const result = await axios.post("http://localhost:3001/record/create-emission-record", {
            id: uuid(),
            email: authState.user.email,
            product: appl,
            location: authState.user.locality,
            usage: hours,
            prediction: firstResultTransport,
            morning: sliderValue1,
            afternoon: sliderValue2,
            evening: sliderValue3,
            night: sliderValue4,
            recommendation: recommendedValue,
            fuelType: 'electricity',
            date: date
        })
        const data = await result.data
        console.log(data)
        if(data.message === "success"){
            toast({
                title: "Record saved successfully",
                description: "Successfully created record for the appliance",
                status: "success"
            })
        }
        else{
            toast({
                title: "Unsuccessful in saving record",
                status: "error"
            })
        }
    }
    catch(err){
        console.error(err)
    }
  }

  const createVehicleEmmisionRecord = async() => {
    try{
        const result = await axios.post("http://localhost:3001/record/create-emission-record", {
            id: uuid(),
            product: vehicle,
            email: authState.user.email,
            location: authState.user.locality,
            usage: kilometers,
            prediction: firstResult,
            morning: sliderValue1,
            afternoon: sliderValue2,
            evening: sliderValue3,
            night: sliderValue4,
            recommendation: recommendedValue,
            fuelType: fuelType,
            date: date
        })
        const data = await result.data
        console.log(data)
        if(data.message === "success"){
            toast({
                title: "Record saved successfully",
                description: "Successfully created record for the appliance",
                status: "success"
            })
        }
        else{
            toast({
                title: "Unsuccessful in saving record",
                status: "error"
            })
        }
    }
    catch(err){
        console.error(err)
    }
  }


  return (
    <div>
        <Flex alignItems="center" justifyContent="center" direction="column" p="2rem" background="rgb(4 10 8)" color="white">
            <Box mt="85px"></Box>
            <Tabs width="100%" padding="2rem" mt="20px">
                <TabList>
                    <Tab>Electronics</Tab>
                    <Tab>Automobile</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                            <Select placeholder='Select Appliances' onChange={(e) => setAppl(e.target.value)} background="white" color="black">
                                <option value='Tubelight'>Tubelight</option>
                                <option value='Air Conditioner'>Air Conditioner</option>
                                <option value='Washing Machine'>Washing Machine</option>
                                <option value='Ceiling Fan'>Ceiling Fan</option>
                            </Select>
                            <Input type="date" onChange={(e) => setDate(e.target.value)} placeholder='Select date' mt="10px"/>

                        
                        {
                            appl == '' ?
                            <></>
                            :
                            <Flex direction="column" padding="2rem">
                                <Text>{appl}</Text>
                                <FormLabel mt="20px" color="teal">Hours</FormLabel>
                                <Input type="text" variant="filled" onChange={(e) => setHours(e.target.value)} placeholder='Enter the number of hours used' />
                                <Button colorScheme='green' width="100px" mt="20px" onClick={() => eletricalAppliance(appl)}>Submit</Button>
                            </Flex>
                        }
                        <>
                        {
                            firstResult === 0?
                            <></>
                            :
                            <Flex direction="column" justifyContent="center" alignItems="center" p="2rem">
                                <Text fontSize="2xl" color="teal">Result - {newResult} kgCO2e</Text>
                                <Flex mt="20px" gap="20px">
                                    <Button colorScheme='blue' onClick={() => setNewResult(firstResult - firstResult*0.05)}>Offset 5%</Button>
                                    <Button colorScheme='blue' onClick={() => setNewResult(firstResult - firstResult*0.1)}>Offset 10%</Button>
                                    <Button colorScheme='blue' onClick={() => setNewResult(firstResult - firstResult*0.15)}>Offset 15%</Button>
                                </Flex>
                                <Box mt="30px" p="2rem" width="80%">
                                    Select your preferences in consumption
                                    <Flex gap="20px" mt="30px">
                                        <FormLabel width="100px">Morning</FormLabel>
                                        <Slider aria-label='slider-ex-1' defaultValue={0} onChange={(val) => setSliderValue1(val)}>
                                            <SliderMark
                                            value={sliderValue1}
                                            textAlign='center'
                                            bg='blue.500'
                                            color='white'
                                            mt='-10'
                                            ml='-5'
                                            w='12'
                                            >
                                            {sliderValue1}
                                            </SliderMark>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb />
                                        </Slider>
                                    </Flex>
                                    <Flex gap="20px" mt="30px">
                                        <FormLabel width="100px">Afternoon</FormLabel>
                                        <Slider aria-label='slider-ex-1' defaultValue={0} onChange={(val) => setSliderValue2(val)}>
                                            <SliderMark
                                            value={sliderValue2}
                                            textAlign='center'
                                            bg='blue.500'
                                            color='white'
                                            mt='-10'
                                            ml='-5'
                                            w='12'
                                            >
                                            {sliderValue2}
                                            </SliderMark>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb />
                                        </Slider>
                                    </Flex>
                                    <Flex gap="20px" mt="30px">
                                        <FormLabel width="100px">Evening</FormLabel>
                                        <Slider aria-label='slider-ex-1' defaultValue={0} onChange={(val) => setSliderValue3(val)}>
                                            <SliderMark
                                            value={sliderValue3}
                                            textAlign='center'
                                            bg='blue.500'
                                            color='white'
                                            mt='-10'
                                            ml='-5'
                                            w='12'
                                            >
                                            {sliderValue3}
                                            </SliderMark>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb />
                                        </Slider>
                                    </Flex>
                                    <Flex gap="20px" mt="30px">
                                        <FormLabel width="100px">Night</FormLabel>
                                        <Slider aria-label='slider-ex-1' defaultValue={0} onChange={(val) => setSliderValue4(val)}>
                                            <SliderMark
                                            value={sliderValue4}
                                            textAlign='center'
                                            bg='blue.500'
                                            color='white'
                                            mt='-10'
                                            ml='-5'
                                            w='12'
                                            >
                                            {sliderValue4}
                                            </SliderMark>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb />
                                        </Slider>
                                    </Flex>
                                </Box>
                                <Box>
                                    <Button mt="20px" colorScheme='green' onClick={() => getRecommendationElectrical(appl, sliderValue1, sliderValue2, sliderValue3, sliderValue4, newResult)}>Recommend</Button>
                                </Box>
                            </Flex>
                        }
                        </>
                        {
                            recommendedValue === null ?
                            <></>
                            :
                            <Box
          width="50%"
          borderRadius="lg"
          borderWidth="1px"
          padding="1.6rem"
          boxShadow="xl"
          borderColor="rgb(1 255 169)"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Recommended Values
          </Text>
          {
           fuelType !== "petrol" || fuelType !== "diesel" ?
            <>
            <Flex gap="20px" alignItems='center'  width="100%" mt="10px" p="1.2rem">
              <Image src='/images/morning.png' height='50px' />
              <Box width="100px">
                <Text fontWeight="bold">Morning</Text>
              </Box>
              <Text>{recommendedValue.Morning[0]} hours {recommendedValue.Morning[1]} minutes</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/afternoon.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Afternoon</Text>

              </Box>
              <Text>{recommendedValue.Afternoon[0]} hours {recommendedValue.Afternoon[1]} minutes</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/evening.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Evening</Text>

              </Box>
              <Text>{recommendedValue.Evening[0]} hours {recommendedValue.Evening[1]} minutes</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/night.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Night</Text>
              </Box>
              <Text>{recommendedValue.Night[0]} hours {recommendedValue.Night[1]} minutes</Text>
            </Flex>
            </>
            :
            <>
            <Flex gap="20px" alignItems='center'  width="100%" mt="10px" p="1.2rem">
              <Image src='/images/morning.png' height='50px' />
              <Box width="100px">
                <Text fontWeight="bold">Morning</Text>
              </Box>
              <Text>{recommendedValue.Morning} Kilometers</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/afternoon.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Afternoon</Text>

              </Box>
              <Text>{recommendedValue.Afternoon}</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/evening.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Evening</Text>

              </Box>
              <Text>{recommendedValue.Evening} Kilometers</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/night.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Night</Text>
              </Box>
              <Text>{recommendedValue.Night} Kilometers</Text>
            </Flex>
            </>
          }
        </Box>
                        }
                        <Box width="100%" padding="2rem">
                            <Button colorScheme='blue' onClick={createApplianceEmmisionRecord}>Create</Button>
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Select placeholder='Select Vehicles' onChange={(e) => setVehicle(e.target.value)}>
                            <option value='2 Wheeler'>2 Wheeler</option>
                            <option value='4 Wheeler'>4 Wheeler</option>
                        </Select>
                        <Input type="date" onChange={(e) => setDate(e.target.value)} placeholder='Select date' mt="10px"/>
                        {
                            vehicle == '' ?
                            <></>
                            :
                            <Flex direction="column" padding="2rem">
                                <Text>2 Wheeler</Text>
                                <FormLabel mt="20px" color="teal">Kilometers</FormLabel>
                                <Input type="text" variant="filled" placeholder='Enter the number of kilometers travelled' onChange={(e) => setKilometers(e.target.value)} />
                                <Button colorScheme='green' width="100px" mt="20px" onClick={() => vehicleCalculation(vehicle)}>Submit</Button>
                            </Flex>
                        }
                        <>
                        {
                            firstResultTransport === 0?
                            <></>
                            :
                            <Flex direction="column" justifyContent="center" alignItems="center" p="2rem">
                                <Text fontSize="2xl" color="teal">Result - {newResultTransport}</Text>
                                <Flex mt="20px" gap="20px">
                                    <Button colorScheme='blue' onClick={() => setNewResultTransport(firstResultTransport - firstResultTransport*0.05)}>Reduce 5%</Button>
                                    <Button colorScheme='blue' onClick={() => setNewResultTransport(firstResultTransport - firstResultTransport*0.1)}>Reduce 10%</Button>
                                    <Button colorScheme='blue' onClick={() => setNewResultTransport(firstResultTransport - firstResultTransport*0.15)}>Reduce 15%</Button>
                                </Flex>
                                <Box mt="30px" p="2rem" width="80%">
                                    <Flex gap="20px">
                                        <FormLabel width="100px">Morning</FormLabel>
                                        <Slider aria-label='slider-ex-1' defaultValue={0} onChange={(val) => setSliderValue1(val)}>
                                            <SliderMark
                                            value={sliderValue1}
                                            textAlign='center'
                                            bg='blue.500'
                                            color='white'
                                            mt='-10'
                                            ml='-5'
                                            w='12'
                                            >
                                            {sliderValue1}
                                            </SliderMark>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb />
                                        </Slider>
                                    </Flex>
                                    <Flex gap="20px" mt="30px">
                                        <FormLabel width="100px">Afternoon</FormLabel>
                                        <Slider aria-label='slider-ex-1' defaultValue={0} onChange={(val) => setSliderValue2(val)}>
                                            <SliderMark
                                            value={sliderValue2}
                                            textAlign='center'
                                            bg='blue.500'
                                            color='white'
                                            mt='-10'
                                            ml='-5'
                                            w='12'
                                            >
                                            {sliderValue2}
                                            </SliderMark>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb />
                                        </Slider>
                                    </Flex>
                                    <Flex gap="20px" mt="30px">
                                        <FormLabel width="100px">Evening</FormLabel>
                                        <Slider aria-label='slider-ex-1' defaultValue={0} onChange={(val) => setSliderValue3(val)}>
                                            <SliderMark
                                            value={sliderValue3}
                                            textAlign='center'
                                            bg='blue.500'
                                            color='white'
                                            mt='-10'
                                            ml='-5'
                                            w='12'
                                            >
                                            {sliderValue3}
                                            </SliderMark>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb />
                                        </Slider>
                                    </Flex>
                                    <Flex gap="20px" mt="30px">
                                        <FormLabel width="100px">Night</FormLabel>
                                        <Slider aria-label='slider-ex-1' defaultValue={0} onChange={(val) => setSliderValue4(val)}>
                                            <SliderMark
                                            value={sliderValue4}
                                            textAlign='center'
                                            bg='blue.500'
                                            color='white'
                                            mt='-10'
                                            ml='-5'
                                            w='12'
                                            >
                                            {sliderValue4}
                                            </SliderMark>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb />
                                        </Slider>
                                    </Flex>
                                    <Flex gap="20px" mt="30px">
                                        <FormLabel width="100px">Fuel type</FormLabel>
                                        <Select onChange={(e) => setFuelType(e.target.value)} placeholder='Select Fuel type'>
                                            <option value="petrol">Petrol</option>
                                            <option value="diesel">Diesel</option>
                                        </Select>
                                    </Flex>
                                </Box>
                                <Box>
                                    <Button mt="20px" colorScheme='green' onClick={() => getRecommendationTransport(vehicle, sliderValue1, sliderValue2, sliderValue3, sliderValue4, newResult, fuelType)}>Recommend</Button>
                                </Box>
                            </Flex>
                        }
                        </>
                        {
                            recommendedValue === null ?
                            <></>
                            :
                            <Box
          width="50%"
          borderRadius="lg"
          borderWidth="1px"
          padding="1.6rem"
          boxShadow="xl"
          borderColor="rgb(1 255 169)"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Recommended Values
          </Text>
          {
           fuelType === "electricity" ?
            <>
            <Flex gap="20px" alignItems='center'  width="100%" mt="10px" p="1.2rem">
              <Image src='/images/morning.png' height='50px' />
              <Box width="100px">
                <Text fontWeight="bold">Morning</Text>
              </Box>
              <Text>{recommendedValue.Morning[0]} hours {recommendedValue.Morning[1]} minutes</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/afternoon.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Afternoon</Text>

              </Box>
              <Text>{recommendedValue.Afternoon[0]} hours {recommendedValue.Afternoon[1]} minutes</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/evening.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Evening</Text>

              </Box>
              <Text>{recommendedValue.Evening[0]} hours {recommendedValue.Evening[1]} minutes</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/night.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Night</Text>
              </Box>
              <Text>{recommendedValue.Night[0]} hours {recommendedValue.Night[1]} minutes</Text>
            </Flex>
            </>
            :
            <>
            <Flex gap="20px" alignItems='center'  width="100%" mt="10px" p="1.2rem">
              <Image src='/images/morning.png' height='50px' />
              <Box width="100px">
                <Text fontWeight="bold">Morning</Text>
              </Box>
              <Text>{recommendedValue.Morning} Kilometers</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/afternoon.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Afternoon</Text>

              </Box>
              <Text>{recommendedValue.Afternoon} Kilometers</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/evening.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Evening</Text>

              </Box>
              <Text>{recommendedValue.Evening} Kilometers</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/night.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Night</Text>
              </Box>
              <Text>{recommendedValue.Night} Kilometers</Text>
            </Flex>
            </>
          }
        </Box>
                        }
                        <Box width="100%" padding="2rem">
                            <Button colorScheme='blue' onClick={createVehicleEmmisionRecord}>Create</Button>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            
        </Flex>
    </div>
  )
}

export default Create