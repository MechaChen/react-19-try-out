import { useState, useTransition } from 'react'
import './App.css'

const apiUpdateName = (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Changed name to ${name}`,
      })
    }, 5000)
  })
}
    

const OldForm = () => {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await apiUpdateName(name)
      setData(response);
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setName('')
    setData({})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">
        Update
      </button>
      <button
        type="button"
        onClick={reset}
      >
        Reset
      </button>
      <p>
        {data?.success && data?.message}
      </p>
    </form>
  )
}

const NewForm = () => {
  const [name, setName] = useState('')
  const [data, setData] = useState({})
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e) => {
    e.preventDefault()
    startTransition(async () => {
      const response = await apiUpdateName(name);
      startTransition(() => {
        setData(response)
      })
    })
  }

  const reset = () => {
    setName('')
    setData({})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">
        Update
      </button>
      <button
        type="button"
        onClick={reset}
      >
        Reset
      </button>
      <p>
        {data?.success && data?.message}
      </p>
    </form>
  )
}

function App() {
  return (
    <>
      <h1>Old Form</h1>
      <OldForm />

      <br /><br />

      <h1>New Form</h1>
      <NewForm />
    </>
  )
}

export default App
