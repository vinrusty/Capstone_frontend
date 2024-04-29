import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/react'

function About() {
  return (
    <div>
        <Flex alignItems="center" justifyContent="center" padding="2rem" direction="column" background="rgb(4 10 8)" color="white">
            <Box width="70%">
                <Text fontSize="2rem" color="green" textAlign="left">ABOUT US</Text>
                <Text textAlign="justify" mt="30px">
                At GreenStride, we understand the urgent need to address climate change by reducing greenhouse gas emissions. We believe that every individual and organization has a role to play in this global effort. By accurately tracking carbon emissions from electronics and vehicles, we aim to raise awareness and inspire action towards a more sustainable future.
                Our website offers a user-friendly platform where you can input data about your electronics and vehicles to calculate their carbon footprint. Whether it's your smartphone, laptop, car, or even your daily commute, CarbonTrackr provides insights into the environmental impact of your activities.
                But we don't stop there. CarbonTrackr goes beyond simply tracking emissions – we provide personalized recommendations on how you can optimize your emissions. Based on your usage patterns and preferences, our algorithm analyzes your data to offer tailored suggestions for reducing your carbon footprint.
                </Text>
            </Box>
        </Flex>
    </div>
  )
}

export default About