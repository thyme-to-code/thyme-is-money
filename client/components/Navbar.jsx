import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  UnorderedList,
  Heading,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import { setSelectedClient } from '../reducers/clientList'

export function Navbar() {
  const dispatch = useDispatch()
  const clients = useSelector((state) => state.clientList)

  const orderedCompanyNames = clients.data
    .map((client) => client.business_name)
    .sort()

  function handleClick(company) {
    const myClient = clients.data.find(
      (client) => client.business_name == company
    )
    return dispatch(setSelectedClient(myClient))
  }

  if (clients.loading) {
    return <>Loading ...</>
  }

  return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Heading as="h2" fontSize="2xl" color="#0CA789">
                Clients
              </Heading>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <UnorderedList fontWeight="bold" color="#0CA789" cursor="pointer">
              {orderedCompanyNames.map((company, i) => (
                <ListItem
                  onClick={() => handleClick(company)}
                  key={i}
                  listStyleType="none"
                  boxShadow="sm"
                >
                  {company}
                </ListItem>
              ))}
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  )
}
