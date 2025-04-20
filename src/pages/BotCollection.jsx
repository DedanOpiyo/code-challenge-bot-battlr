import React, { useState } from "react";
// import { format } from "date-fns";
import { useOutletContext } from "react-router-dom";
import Botcard from "../components/Botcard";
import BotSpecs from "./BotSpecs";
import SortBar from "../components/SortBar";

function BotCollection() {
    const {botData, setBotData} = useOutletContext()
    const {listedRobots, setListedRobots} = useOutletContext()
    console.log('BOTDATA IN BOTCOLLECTION:', botData)
    const [renderBotSpecs, setRenderBotSpecs] = useState({botstatus:false, robot: null}) // State holding bot data, passed as prop to BotSpecs component.

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
                // Update Botcollection
                const filteredRobotData = botData.filter((robot) => robot !== botParam)
                setBotData(() => filteredRobotData) // C
                alert(`Bot ${botParam.name} succesfully enlisted into your army.`)
            } 
        } else {
            setListedRobots(()=>[botParam]);
            // Update Botcollection
            const filteredRobotData = botData.filter((robot) => robot !== botParam)
            setBotData(() => filteredRobotData) // C
            alert(`Bot ${botParam.name} succesfully enlisted into your army.`)
        }       
    }

    // Function to show BotSpecs
    const showBotSpecs = (robot) => {
        console.log(robot)
        return setRenderBotSpecs(() => ({...renderBotSpecs, botstatus: !renderBotSpecs.botstatus, robot: robot }))      
    }

    // Function to sort botData.
    const handleSort = (botKey) => {
        console.log('SORTBOTDATA CALLED:', botKey)
        console.log("Sample values ==========", botData.map(bot => bot[botKey]));
        console.log(botData[0]);
        console.log("Damage:", botData[0].damage);
        console.log("Armor:", botData[0].armor);
        const sortedBots = [...botData].sort((a, b) => {
            const bValue = b[botKey]  
            console.log(bValue)
            const aValue = a[botKey]
            console.log(aValue)
            bValue - aValue;
        });
        setBotData(sortedBots);
    };

    // Show bots for particular class.
    const getBotsByClass = (botClass) => {
        const filteredByClass =  botData.filter(bot => bot.bot_class === botClass)
        setBotData(filteredByClass)
      }

    // Loop through botData obtaining Botcard for each bot.   
    const botCard = botData.map((bot, index) => {
        const botcardStructure = <div key={index} onClick={()=> showBotSpecs(bot)} style={{background: 'linear-gradient(145deg, #f0f0f0, #dcdcdc)', boxShadow: `8px 8px 15px #b8b8b8, 5px -5px 15px #ffffff`}} className='flex flex-col items-center w-[20em]  p-5 rounded-[18px]'>
             <Botcard key={bot.id} bot={bot} />
        </div>
        return botcardStructure;
    })
    
    return ( 
        <>
        {renderBotSpecs.botstatus ? <div className="flex flex-col p-5 gap-10"><BotSpecs showBotSpecs={showBotSpecs} renderBotSpecs={renderBotSpecs} enListBot={enListBot} /></div> :
        <div className="flex flex-col p-5 gap-10">
            <div className="flex self-center text-4xl font-bold">Robot Collection</div>
            <SortBar botData={botData} sortBotData={handleSort} getBotsByClass={getBotsByClass} />
            <div className="flex self-end flex-wrap gap-6 justify-center">
              {botCard}
            </div>
        </div>
        }
        </>
    )
};

export default BotCollection;