import React from 'react'
import LogIn from './LogIn'
import { Flex, Heading } from '@chakra-ui/react'

export function Landing() {

  return (
    <div className="landing">
      <div className="context">
        <Heading as="h1" color="#fff">
          Thyme is Money
        </Heading>
        <Flex align="center" justify="center">
          <LogIn />
        </Flex>
      </div>
      <div className="background" >
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
      </div >
    </div>
  )
}

