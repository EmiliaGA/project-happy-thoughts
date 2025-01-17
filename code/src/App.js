/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import Header from 'components/Header'
import NewThoughts from 'components/NewThoughts'
import List from 'components/List'

export const App = () => {
  const [newThought, setNewThought] = useState('')
  const [thoughtList, setThoughtList] = useState([])
  const [loading, setLoading] = useState(false)

  const onNewThoughtsChange = (event) => {
    setNewThought(event.target.value);
  }

  const fetchData = () => {
    setLoading(true)
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts')
      .then((res) => res.json())
      .then((data) => setThoughtList(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ message: newThought })
    }

    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', options)
      .then((res) => res.json())
      .then(() => fetchData())
      .catch((error) => console.error(error))
      .finally(() => setNewThought(''))
  }

  const onLikesIncrease = (thoughtId) => {
    const options = { method: 'POST',
      headers: {
        'Content-type': 'application/json'
      } }

    fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thoughtId}/like`, options)
      .then((res) => res.json())
      .catch((error) => console.error(error))
      .finally(() => fetchData())
  }

  return (
    <div>

      <Header />
      <NewThoughts
        newThought={newThought}
        onNewThoughtsChange={onNewThoughtsChange}
        onFormSubmit={onFormSubmit} />

      <List
        loading={loading}
        thoughtList={thoughtList}
        onLikesIncrease={onLikesIncrease} />
    </div>

  )
}