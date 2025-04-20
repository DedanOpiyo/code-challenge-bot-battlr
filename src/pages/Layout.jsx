import React, { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  const [botData, setBotData] = useState([]) // State to manage botData between components, (BotCollection, and YourBotArmy). 
  const [listedRobots, setListedRobots] = useState([]); // State to pass down listed bots from BotCollection to YourBotArmy component.
  console.log('LISTEDROBOTS STATE IN LAYOUT:', listedRobots)
  console.log('..IN APP.JSX BOTDATA:', botData)

  useEffect(() => {
    fetch(`http://localhost:3000/bots`)
    .then(res => res.json())
    .then(data => { //console.log(data)
      setBotData(() => data)
    })
  }, [])

  return (
    <div>
      <nav className="ml-7 h-2 bg-gray-50 dark:bg-gray-700">
        <div className="flex gap-1 text-blue-700 font-bold h-[30px] items-end">
          <div>
            <Link to={'/'}>Home</Link>
          </div>
          <div>
            <Link to={'/botarmy'}>BotArmy</Link>
          </div>
        </div>
      </nav>

      <Outlet context={{listedRobots, setListedRobots, botData, setBotData}} />
    </div>
  )
}
