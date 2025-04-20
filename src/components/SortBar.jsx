import React from 'react'

export default function SortBar({botData, sortBotData, getBotsByClass}) {

  const handleSort = (event) => {
    console.log(event.target); 
    const target = event.target.textContent.toLowerCase(); // Get value of DOM element selected.
    sortBotData(target)
  };

  // Loop through botData, and extract class names into a set. 
  const classSet = new Set()

  botData.forEach(bot => {
    classSet.add(bot.bot_class)
  })

  const uniqueClasses = [...classSet]

  console.log(uniqueClasses); 
  const botClasses = uniqueClasses.map((className) => {
    return <div key={className} onClick={() => getBotsByClass(className)}>{className}</div>
  })

  return (
    <div className='flex gap-10 border'>
      <div>
        <div className='font-bold'>Sort By:</div>

        <div>
          <div onClick={handleSort}>Health</div>
          <div onClick={handleSort}>Damage </div>
          <div onClick={handleSort}>Armor </div>
        </div>
      </div>

      <div className='flex align-top gap-2'> <span className='font-bold'>Class:</span> {botClasses}</div>
    </div>
  )
}
