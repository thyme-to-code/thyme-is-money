import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Landing } from './Landing'
import { Main } from './Main'



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Main />} />
      </Routes>
    </>
  )
}

export default App
