import React, { useState, useEffect } from 'react'
import '../styles/App.css'
import { Loader } from './Loader'
import { PhotoFrame } from './PhotoFrame'

const App = () => {
  const [photodata, setData] = useState(null)
  const [id, setId] = useState('')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const fetchapi = async () => {
      setLoader(true)
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/photos/${id}`
        )
        const data = await res.json()
        setData(data)
        console.log(data)
      } catch (err) {
        console.log(err)
        setData(null)
      } finally {
        setLoader(false)
      }
    }
    if (id !== '') {
      fetchapi()
    }
  }, [id])

  const handleChange = (e) => {
    setId(e.target.value)
    setData(null)
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
      {loader && <Loader />}
      {photodata && <PhotoFrame url={photodata.url} title={photodata.title} />}
    </>
  )
}

export default App
