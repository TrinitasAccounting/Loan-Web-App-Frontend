import axios from "axios"
import { useEffect, useState } from "react"
import './index.css'
import DashboardMainLayout from "./components/DashboardMainLayout"


function App() {

  const [loans, setLoans] = useState([])


  //GET fetch to backend, getting all loan data from our database__________________________________________________
  const isDevelopment = import.meta.env.MODE === 'development'
  const myBaseURL = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY
  ////GET fetch function
  const fetchLoans = async () => {
    try {
      await axios.get(myBaseURL)
        .then(res => setLoans(res.data))
    } catch (error) {
      console.log(error)
    }
  }
  ////Fetching on all re-renders
  useEffect(() => {
    fetchLoans()
  }, [])








  return (
    <>
      <DashboardMainLayout loans={loans} />
      {/* <LoanTable loans={loans} /> */}
    </>
  )
}

export default App
