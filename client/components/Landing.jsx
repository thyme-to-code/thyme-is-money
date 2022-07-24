import React from 'react'
import LogIn from './LogIn'
import { Flex, Heading, Image, HStack } from '@chakra-ui/react'

export function Landing() {
  return (
    <div className="landing">
      <div className="context">
        <Flex align="center" justify="center" mb="20px">
          <HStack>
            <Image
              boxSize="64px"
              alt="Two leaves as logo"
              src="/favicon-crop.png"
            />
            <Heading as="h1" color="#fff">
              Thyme is Money
            </Heading>
          </HStack>
        </Flex>
        <Flex align="center" justify="center">
          <LogIn />
        </Flex>
      </div>
      <div className="background">
        <div className="shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
      </div>
    </div>
  )
}
