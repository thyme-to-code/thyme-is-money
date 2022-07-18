import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, GridItem } from '@chakra-ui/react'
import { getClients } from '../reducers/clientList'
import { Content } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'
import { Navbar } from './Navbar'

export function Main() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getClients())
  }, [])

  return (
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={'111px 1fr 30px'}
        gridTemplateColumns={'190px 1fr'}
        h="100vh"
        gap="0"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem
          bg="#0CA789"
          area={'header'}
          fontSize="3xl"
          pt="25px"
          pl="50px"
          pb="25px"
        >
          <Header />
        </GridItem>
        <GridItem
          pl="2"
          bg="#fff"
          area={'nav'}
          pt="25px"
          pr="10px"
          boxShadow="base"
        >
          <Navbar />
        </GridItem>
        <GridItem pl="25px" bg="#dcf4ef" area={'main'} pt="25px" pb="25px">
          <Content />
        </GridItem>
        <GridItem
          pl="2"
          bg="#0CA789"
          area={'footer'}
          color="#fff"
          textAlign="center"
        >
          <Footer />
        </GridItem>
      </Grid>
  )
}
