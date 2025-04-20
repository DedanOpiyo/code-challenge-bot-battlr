import React, { useState } from "react";
// import { format } from "date-fns";
import { useOutletContext } from "react-router-dom";
import Botcard from "../components/Botcard";

function BotCollection() {
    const {botData, setBotData} = useOutletContext()
    const {listedRobots, setListedRobots} = useOutletContext()
    console.log('ENLISTED BOTS IN BOTCOLLECTION:', listedRobots)
    console.log('BOTDATA IN BOTCOLLECTION:', botData)

    // Function to Enlist bots.
    function enListBot(botParam) {
        // check if bot is already enlisted.
        if (listedRobots.length > 0 && listedRobots[0] && Object.keys(listedRobots[0]).length > 0) {

            const isBotEnlisted = listedRobots.some(botObj => botObj === botParam);

            if(isBotEnlisted) {
                alert(`You already enlisted ${botParam.name} into your army.`)
                return;
            } else {
                setListedRobots(()=> {
                    return [...listedRobots, botParam];
                })
                alert(`Bot ${botParam.name} succesfully enlisted into your army.`)
            } 
        } else {
            setListedRobots(()=>[botParam]);
            alert(`Bot ${botParam.name} succesfully enlisted into your army.`)
        }       
    }

    // Loop through botData obtaining Botcard for each bot.   
    const botCard = botData.map((bot, index) => {
        const botcardStructure = <div key={index} onClick={()=> enListBot(bot)} style={{background: 'linear-gradient(145deg, #f0f0f0, #dcdcdc)', boxShadow: `8px 8px 15px #b8b8b8, 5px -5px 15px #ffffff`}} className='flex flex-col items-center w-[20em]  p-5 rounded-[18px]'>
             <Botcard key={bot.id} bot={bot} />
        </div>
        return botcardStructure;
    })
    
    return (
        <div className="flex flex-col p-5 gap-10">
            <div className="flex self-center text-4xl font-bold">Robot Collection</div>
            <div className="flex self-end flex-wrap gap-6 justify-center">
                {botCard}
            </div>
        </div>
    )
};

export default BotCollection;