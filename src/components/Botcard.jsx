import { format } from "date-fns";

export default function Botcard({bot}) { 
    // If called rendered without valid prop 
    if (!bot) {
        console.log('Botvard received an invalid bot prop.')
        return <div className="flex flex-col p-5 gap-10">
            <div className="flex self-center text-4xl font-bold">{pageTitle}</div>
            <div className="flex self-start">No Bot Found.</div>
        </div>
    }

    const botcardStructure = (<div className="wrap-break-word">
        <div>
            <div className="font-bold">name: <span className="font-normal">{bot.name}</span></div>
            <div className="p-3 pl-0 pt-0 w-[20em] text-sm font-bold">created: <span className="font-normal">{format(new Date(`${bot.created_at}`), "PPPp.")}</span></div>      
        </div>
        <div>
            <img src={`${bot.avatar_url}`} alt="robot" style={{boxShadow: `2px 2px 8px rgba(0,0,0,0.1)`}} className="w-[100px] has-[100px] rounded-[20px] mb-[5px]"/>
        </div>
        <div className="self-start">
            <div>
                <div>
                    <div>Health: {bot.health}</div>
                    <div>Damage: {bot.damage}</div>
                </div>
                <div>armor: {bot.armor}</div>
            </div>

            <div>Bot class: {bot.bot_class}</div>
        </div>
        <div className="p-1 self-start ml-3">Catchphrase:</div>
        {bot.catchphrase.length < 40 ? <div className="text-sm self-start">{bot.catchphrase}</div> : <div className="text-[.7em] self-start">{bot.catchphrase}</div>}
        <div className="p-1 text-[.7em] self-end mt-1 font-bold">updated: <span className="font-normal">{format(new Date(`${bot.updated_at}`), "PPPp.")}</span></div>
    </div>)

    return <div>{botcardStructure}</div> ;
}
