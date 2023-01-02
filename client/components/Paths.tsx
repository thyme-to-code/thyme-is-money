// @ts-check
import React, { useEffect } from 'react'
import { useAppSelector } from '../reducers/hooks'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Main } from './Main'

export function Paths() {
  const token = useAppSelector((state) => state.user.token)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true })
    }
  }, [])

  return (
    <Routes>
      <Route path="/home" element={<Main />}></Route>
    </Routes>
  )
}
