import React from 'react'
import { useSelector } from 'react-redux'
import { Heading } from '@chakra-ui/react'
import { UpdateClient } from './UpdateClient'

export function ClientDetails() {
  const { selectedClient, loading } = useSelector((state) => state.clientList)

  if (loading) {
    return <>Loading...</>
  }

  return (
    selectedClient.id && (
      <div className="client">
        <Heading as="h2" fontSize="2xl">
          {selectedClient.business_name}
        </Heading>
        <p>{selectedClient.contact_name}</p>
        <p>{selectedClient.email}</p>
        <p>{selectedClient.phone}</p>
        <p>{selectedClient.address}</p>
        <p>
          <>Hourly Rate: NZD$ </>
          {selectedClient.rate}
        </p>
        <UpdateClient />
      </div>
    )
  )
}
