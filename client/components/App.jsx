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
  // const clientList = useSelector((state) => state.clientList.data)

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
          gridTemplateRows={'90px 1fr 30px'}
          gridTemplateColumns={'170px 1fr'}
          h="100vh"
          gap="0"
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem pl="2" bg="green.300" area={'header'} pt="25px" pl="50px">
            <Header />
          </GridItem>
          <GridItem pl="2" bg="blackAlpha.700" area={'nav'}pt="25px">
            <Navbar />
          </GridItem>
          <GridItem pl="2" bg="green.100" area={'main'}>
            <Client />
          </GridItem>
          <GridItem pl="2" bg="green.300" area={'footer'}>
            <Footer />
          </GridItem>
        </Grid>
      </ChakraProvider>
    </>
  )
}

export default App
