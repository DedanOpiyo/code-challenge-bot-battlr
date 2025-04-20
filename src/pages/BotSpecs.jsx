import React from 'react';
import Botcard from '../components/Botcard';

export default function BotSpecs({showBotSpecs, renderBotSpecs, enListBot}) {
    console.log('renderBotSpecs.robot:', renderBotSpecs.robot)
  return (
    <div className='flex flex-col mt-[5em]'>
        <div className="flex self-center text-3xl font-bold">Bot Specs</div>
        <div className="flex self-center mt-4 rounded-md bg-slate-100 w-[34em]">
            <div className='flex self-center ml-20'>{<Botcard bot={renderBotSpecs.robot} />}</div>
        </div>
        <div className='flex self-center gap-2 mt-10'>
            <button onClick={()=> showBotSpecs('bot')} className='bg-blue-800 text-white p-1'>Go Back</button>
            <button onClick={()=> enListBot(renderBotSpecs.robot)} className='bg-blue-600 text-white p-1'>Enlist Bot</button>
        </div>
    </div>
  )
}
