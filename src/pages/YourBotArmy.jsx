import React from "react";
import { useOutletContext } from "react-router-dom";
import Botcard from "../components/Botcard";

function YourBotArmy() {
    const {botData, setBotData, updateBotData} = useOutletContext()
    const {listedRobots, setListedRobots} = useOutletContext();
    console.log('LISTED ROBOTS IN YOURBOTARMY COMPONENT:', listedRobots)

    function releaseBot(bot) {
        const filteredRobots = listedRobots.filter((robot) => robot !== bot)
        console.log('Filtered Robots----:::', filteredRobots)
        setListedRobots(() => filteredRobots)
    }

    // If 'x' button is clicked, delete both from UI and from the backend. This also means Botcollection would have to update.
    function deleteBotForever(bot) {
        const filteredRobots = listedRobots.filter((robot) => robot !== bot)
        setListedRobots(() => filteredRobots)

        fetch(`http://localhost:5000/bots/${bot.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then(res => res.json())
        .then(data => { console.log('DELETED DATA:', data)
            // Update Botcollection
            const filteredRobotData = botData.filter((robot) => robot !== bot)
            setBotData(() => filteredRobotData) // C
            alert(`Bot ${bot.name} Deleted Succesfully.`)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Loop through listedRobots obtaining Botcard for each bot.   
    const botCard = listedRobots.map((bot, index) => { 
        const botcardStructure = <div key={index} onClick={()=> releaseBot(bot)} style={{background: 'linear-gradient(145deg, #f0f0f0, #dcdcdc)', boxShadow: `8px 8px 15px #b8b8b8, 5px -5px 15px #ffffff`}} className="flex flex-col items-center w-[20em]  p-5 rounded-[18px]">
                <span className="self-end text-red-600 font-bold cursor-pointer" onClick={()=> deleteBotForever(bot)}>X</span>
                <Botcard  key={bot.id} bot={bot} />
        </div>
        return botcardStructure;
    })

    return (
        <div className="flex flex-col p-5 gap-10">
            <div className="flex self-center text-4xl font-bold">Bot Army</div>
            {listedRobots.length === 0 && <div className="flex self-start">No Bot Found.</div>}
            <div className="flex self-end flex-wrap gap-6 justify-center">
                {botCard}
            </div>
        </div>
    )
}

export default YourBotArmy;