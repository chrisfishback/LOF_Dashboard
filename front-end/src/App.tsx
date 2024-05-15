import './App.css'
import { Header } from "./components/header_footer/Header.tsx";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Error from "./components/Error.tsx"
import Teams from "./components/Teams.tsx";
import Admin from "./components/Admin.tsx";
import Dashboard from "./components/Dashboard.tsx";

function App() {

  return (
    <>
        <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/teams" element={<Teams/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
        </Router>
    </>
  )
}

export default App
