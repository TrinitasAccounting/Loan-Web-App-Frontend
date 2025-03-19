import axios from "axios"
import { useEffect, useState } from "react"
import LoanTable from "./components/LoanTable"


function App() {

  const [loans, setLoans] = useState([])

  const isDevelopment = import.meta.env.MODE === 'development'
  const myBaseURL = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY

  const fetchLoans = async () => {
    try {
      await axios.get(myBaseURL)
        .then(res => setLoans(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLoans()
  }, [])


  return (
    <>

      <LoanTable loans={loans} />
    </>
  )
}

export default App
