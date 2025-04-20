import React from "react"
import BotCollection from "./pages/BotCollection"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import YourBotArmy from "./pages/YourBotArmy";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BotCollection />} />
          <Route path="/botarmy" element={<YourBotArmy />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
