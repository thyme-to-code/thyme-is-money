import React from 'react'
import { useAppSelector } from '../../reducers/hooks'
import { SimpleGrid } from '@chakra-ui/react'

import { ItemCard } from './ItemCard'

export function Tasks() {
  const { selected } = useAppSelector((state) => state.clients)
  const items = useAppSelector((state) => state.items)

  if (items.loading) {
    return <>Loading ...</>
  }

  const itemCards = (
    <SimpleGrid minChildWidth="260px" spacing="11px">
      {items?.uninvoiced.map((item) => {
        if (item.client_id === selected.id) {
          return <ItemCard key={item.id} item={item} rate={selected.rate} />
        }
      })}
    </SimpleGrid>
  )

  return <div className="tasks">{itemCards}</div>
}
