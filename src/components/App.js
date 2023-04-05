import React, { useState } from 'react'
import '../styles/App.css'
import { Loader } from './Loader'
import { PhotoFrame } from './PhotoFrame'

const App = () => {
  const [photodata, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')

  const handleChange = (e) => {
    setId(e.target.value)
    fetchapi()
  }
  const fetchapi = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${id}`
      )
      const data = await res.json()
      setData(data)
    } catch (err) {
      console.log(err)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <label htmlFor="input">Enter number between 1-5000</label>
        <input
          type="number"
          id="input"
          value={id}
          min={1}
          max={5000}
          onChange={handleChange}
          required
        />
      </div>
      {loading && <Loader />}
      {photodata && <PhotoFrame url={photodata.url} title={photodata.title} />}
    </>
  )
}

export default App
