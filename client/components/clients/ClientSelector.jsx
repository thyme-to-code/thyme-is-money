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
  Select,
  FormLabel,
} from '@chakra-ui/react'
import {
  setSelectedClient,
  clearSelectedClient,
} from '../../reducers/clientList'

export function ClientSelector() {
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
  function handleChange(e) {
    if (e.target.value) {
      const myClient = clients.data.find(
        (client) => client.business_name == e.target.value
      )
      return dispatch(setSelectedClient(myClient))
    } else {
      return dispatch(clearSelectedClient())
    }
  }

  if (clients.loading) {
    return <>Loading ...</>
  }

  return (
    <>
      <FormLabel>
        <Heading as="h2" fontSize="2xl" color="#0CA789">
          Select Client
        </Heading>
      </FormLabel>
      <Select onChange={handleChange} placeholder="Summary Page">
        {orderedCompanyNames.map((company, i) => (
          <option key={i} value={company}>
            {company}
          </option>
        ))}
      </Select>
    </>
  )
}
