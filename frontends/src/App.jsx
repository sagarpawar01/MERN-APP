import { Outlet } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
     <ToastContainer />
      <Navigation />
      <main className="py-3 ml-[2.5rem] sm:ml-[4rem]">
        <Outlet />
      </main>
    </>
  )
}

export default App
