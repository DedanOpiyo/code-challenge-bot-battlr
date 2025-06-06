import React, { useEffect, useRef } from 'react'

export default function SortBar({botData, sortBotData, getBotsByClass}) {
  const initialClasses = useRef([]);

  // With each change in botData, ensure that classes are referenced the first time botData is iterated.
  useEffect(() => {
    if (initialClasses.current.length === 0 && botData.length > 0) { // Ensure this is possible only the first time.
      // Loop through botData, and extract class names into a set.
      const classSet = new Set()
  
      botData.forEach(bot => {
        classSet.add(bot.bot_class)
      })
  
      const uniqueClasses = [...classSet]
  
      initialClasses.current = uniqueClasses // Set initial class reference
    }
  }, [botData])

  const hardCordClasses = ['Assault', 'Defender', 'Support', 'Medic', 'Witch', 'Captain'] // Fall back to these in case classes 'disappear' from the UI

  // Loop through the classes and render JSX with getBotsByClass-listener 'attached' to onClick event.
  const botClasses = (initialClasses.current.length > 0 ? initialClasses.current : hardCordClasses).map((className) => {
    return <div key={className} onClick={() => getBotsByClass(className)}>{className}</div>
  })

  return (
    <div className='flex gap-10 border'>
      <div>
        <div className='font-bold'>Sort By:</div>

        <div className='cursor-pointer'>
          <div onClick={() => sortBotData("health")}>Health</div>
          <div onClick={() => sortBotData("damage")}>Damage </div>
          <div onClick={() => sortBotData("armor")}>Armor </div>
        </div>
      </div>

      <div className='flex align-top gap-2 cursor-pointer'> <span className='font-bold'>Class:</span> {botClasses}</div>
    </div>
  )
}
