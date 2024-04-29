import React, { useEffect, useState } from 'react'
import { Box, Image, Text, VStack, Stack, Flex, Center } from "@chakra-ui/react";
import axios from 'axios'
import {useParams} from 'react-router-dom'

export const DashDetail = () => {

  const {id} = useParams()
  const [record, setRecord] = useState({})
  const [recommendation, setRecommendation] = useState({
    morning: [0, 0],
    afternoon: [0, 0],
    evening: [0, 0],
    night: [0, 0]
  })

  const fetchRecordsBasedOnId = async() => {
    try{
      const result = await axios.post("http://localhost:3001/record/get-dynamic-records", {
        id: id
      })
      const data = result.data
      if(data.message === "success"){
        setRecord(data.result[0])
        setRecommendation({
          morning: data.result[0].recommendation.Morning,
          afternoon: data.result[0].recommendation.Afternoon,
          evening: data.result[0].recommendation.Evening,
          night: data.result[0].recommendation.Night
        })
      }
    }
    catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    fetchRecordsBasedOnId()
  },[])

  return (
    <div>
      <Flex p="2rem" gap="20px" flexWrap="wrap" alignItems="center" justifyContent="center" background="rgb(4 10 8)" color="white">
        <Box></Box>
        <Box
        mt="85px"
          maxW="md"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="xl"
          borderColor="rgb(1 255 169)"
          background="rgb(6 21 16)"
        >
          <Center p="2rem">
            <Image
              src={`/images_white/${record.product}.png`}
              alt="Placeholder image"
              borderTopRadius="lg"
              objectFit="cover"
              h="200px"
            />
          </Center>

          <Box p="6">
            <VStack spacing={3} align="start">
              <Text fontSize="2xl" fontWeight="bold">
                {record.product}
              </Text>
              <Stack direction="row" spacing={4}>
                <Text fontSize="lg"><b>Usage:</b> {record.usage} {record.fuelType === 'electricity' ? 'Hours':'Kilometers'}</Text>
                <Text fontSize="lg"><b>Prediction:</b> {record.prediction} kgCO2e</Text>
              </Stack>
                <Text fontSize="lg"><b>Date:</b> {new Date(record.date).toDateString()}</Text>
            </VStack>
          </Box>
        </Box>
        <Box
          width="50%"
          borderRadius="lg"
          borderWidth="1px"
          padding="1.6rem"
          boxShadow="xl"
          borderColor="rgb(1 255 169)"
          background="rgb(6 21 16)"
          mt="85px"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Recommended Values
          </Text>
          {
            record.fuelType === "electricity" ?
            <>
            <Flex gap="20px" alignItems='center'  width="100%" mt="10px" p="1.2rem">
              <Image src='/images_white/morning.png' height='50px' />
              <Box width="100px">
                <Text fontWeight="bold">Morning</Text>
              </Box>
              <Text>{recommendation.morning[0]} hours {recommendation.morning[1]} minutes</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images_white/afternoon.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Afternoon</Text>

              </Box>
              <Text>{recommendation.afternoon[0]} hours {recommendation.afternoon[1]} minutes</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images_white/evening.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Evening</Text>

              </Box>
              <Text>{recommendation.evening[0]} hours {recommendation.evening[1]} minutes</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images_white/night.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Night</Text>
              </Box>
              <Text>{recommendation.night[0]} hours {recommendation.night[1]} minutes</Text>
            </Flex>
            </>
            :
            <>
            <Flex gap="20px" alignItems='center'  width="100%" mt="10px" p="1.2rem">
              <Image src='/images_white/morning.png' height='50px' />
              <Box width="100px">
                <Text fontWeight="bold">Morning</Text>
              </Box>
              <Text>{recommendation.morning} Kilometers</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images_white/afternoon.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Afternoon</Text>

              </Box>
              <Text>{recommendation.afternoon}</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images_white/evening.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Evening</Text>

              </Box>
              <Text>{recommendation.evening} Kilometers</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/night.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Night</Text>
              </Box>
              <Text>{recommendation.night} Kilometers</Text>
            </Flex>
            </>
          }
        </Box>
        <Box
          width="50%"
          borderRadius="lg"
          borderWidth="1px"
          padding="1.6rem"
          boxShadow="xl"
          borderColor="rgb(1 255 169)"
          background="rgb(6 21 16)"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Preferences
          </Text>
          
            <>
            <Flex gap="20px" alignItems='center'  width="100%" mt="10px" p="1.2rem">
              <Image src='/images/morning.png' height='50px' />
              <Box width="100px">
                <Text fontWeight="bold">Morning</Text>
              </Box>
              <Text>{record.morning}%</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/afternoon.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Afternoon</Text>

              </Box>
              <Text>{record.afternoon}%</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/evening.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Evening</Text>

              </Box>
              <Text>{record.evening}%</Text>
            </Flex>
            <Flex gap="20px" alignItems='center'  width="100%" p="1.2rem">
              <Image src='/images/night.png' height='50px' />
              <Box width="100px">
              <Text fontWeight="bold">Night</Text>
              </Box>
              <Text>{record.night}%</Text>
            </Flex>
            </>
            
        </Box>
      </Flex>
    </div>
  )
}
