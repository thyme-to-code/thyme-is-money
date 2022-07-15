import React, { useEffect } from 'react'
import { ChakraProvider, Grid, GridItem , extendTheme } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { Client } from './Client'
import { Footer } from './Footer'
import { Header } from './Header'
import { Navbar } from './Navbar'
import { getClients } from '../reducers/clientList'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getClients())
  }, [])

  return (
    <>
      <ChakraProvider>
        <Grid
          templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
          gridTemplateRows={'100px 1fr 30px'}
          gridTemplateColumns={'170px 1fr'}
          h="100vh"
          gap="0"
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem pl="2" bg="#0CA789" area={'header'} fontSize="3xl" pt="25px" pl="50px">
            <Header />
          </GridItem>
          <GridItem pl="2" bg="#1A1A1A" area={'nav'} pt="25px" pr="10px">
            <Navbar />
          </GridItem>
          <GridItem pl="2" bg="#E9F7F7" area={'main'}>
            <Client />
          </GridItem>
          <GridItem pl="2" bg="#0CA789" area={'footer'}>
            <Footer />
          </GridItem>
        </Grid>
      </ChakraProvider>
    </>
  )
}

export default App
