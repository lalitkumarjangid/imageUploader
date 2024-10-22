import { Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import SignUp from './Pages/SignUp.jsx'
import Home from './Home.jsx'
import Login from './Pages/Login.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import './index.css'
import NotFoundPage from './Pages/NotFoundPage.jsx';




function App() {
  return (
    <>
      {/* <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App