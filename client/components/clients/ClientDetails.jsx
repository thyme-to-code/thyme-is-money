import React from 'react'
import { useSelector } from 'react-redux'

export function ClientDetails() {
  const { selectedClient, loading } = useSelector((state) => state.clientList)

  if (loading) {
    return <>Loading...</>
  }

  return (
    selectedClient.id && (
      <div className="client">
        <h2>{selectedClient.business_name}</h2>
        <p>{selectedClient.contact_name}</p>
        <p>{selectedClient.email}</p>
        <p>{selectedClient.phone}</p>
        <p>{selectedClient.address}</p>
        <p>
          <>Hourly Rate: NZD$ </>
          {selectedClient.rate}
        </p>
      </div>
    )
  )
}
