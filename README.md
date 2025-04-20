# Bot Battlr

Welcome to **Bot Battlr**, the one and only spot in the known universe where you can custom build your own Bot Army! The app allows you to browse through a list of robots, view a robot's details, and, enlist a bot into your army.

## Key Functional Components and Structure

-You can:

-* Browse a List of Robots in the `BotCollection` Component.
-* View Robot Details in BotCollection Component.
-* Enlist a bot into your army. selecting a bot renderes it in `YourBotArmy` component.
-* See profiles of all bots.
-* Release a bot from my army by clicking on it. It 'dissapears' from YourBotArmy.
-* Discharge a bot from their service forever, by clicking the red button marked "x", which would delete the bot both from the backend and from `YourBotArmy` on the frontend.

Component Tree Visual:
```
src
├── Layout
├── NoPage
├── BotCollection
│   └── BotCard (for each bot)
├── YourBotArmy
│   └── BotCard (for each enlisted bot)
App
```

1. App Component
What it does:

Acts as the main container that renders all other components.

It uses BrowserRouter, Routes, and Route from react-router-dom to create routes for BotCollection and YourBotArmy components.

Specifies a Layout Component that wraps BotCollection and YourBotArmy and a default NoPage component.


1. Layout Component
What it does:

Acts as the main container that renders all other components.

Renders react-router-dom's Outlet component that provides state to all components Layout wraps through the context prop.

The Outlet will render conforming component to the current route selected(Specified by the Link component).

Holds state for:

-The full list of bots(botData).

-The bots in the user’s army(listedRobots).

-Seters for botData and listedRobots, making them available to all direct children of Layout.jsx.

Handles initial data fetching from the backend (e.g., GET /bots), and updates botData through it's setter, setBotData.

Renders:

BotCollection through the '/' (Home) route: ```<Link to={'/'}>Home</Link>

YourBotArmy through the '/botarmy' (BotArmy) route: ```<Link to={'/botarmy'}>BotArmy</Link>


2. BotCollection Component
What it does:

Displays all available bots retrieved from the backend (GET /bots).

Each bot is rendered as a BotCard.

Here is an illustration of what the botcard looks like:

### Screenshot

![Botcard Screenshot](assets/screenshot.png)

Clicking on a bot adds it to YourBotArmy (only if not already enlisted).

Acesses:

List of bots (botData), setBotData, listedRobots, and setListedRobots through react-router-dom's useOutletContext.

useOutletContext allows us to destructure these props Outlet component provided through the context property.

The component loops through botData, providing a botCard for each robot:
```
    // Loop through botData obtaining Botcard for each bot.   
    const botCard = botData.map((bot, index) => {
        const botcardStructure = <div key={index} onClick={()=> enListBot(bot)} style={{background: 'linear-gradient(145deg, #f0f0f0, #dcdcdc)', boxShadow: `8px 8px 15px #b8b8b8, 5px -5px 15px #ffffff`}} className='flex flex-col items-center w-[20em]  p-5 rounded-[18px]'>
             <Botcard key={bot.id} bot={bot} />
        </div>
        return botcardStructure;
    })
```

The Handler function, enListBot, enlists a bot into the army. It updates listedRobots accordingly, depending on whether bots had been enlisted before or not.
```
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
```

3. YourBotArmy Component 
What it does:

Shows only the bots that the user has selected (enlisted).

Lets the user:

Release a bot (remove from the army but NOT delete).

Discharge a bot (remove from army AND send DELETE /bots/:id).

Receives:

botData, setBotData, listedRobots, and setListedRobots (from Layout)

Handlers: releaseBot, deleteBotForever

4. BotCard Component 
What it does:

Displays the profile of a single bot (used by both BotCollection and YourBotArmy).

Shows name, bot class, avatar, stats, etc.

Receives props:

Bot object

Handler function based on context (enlist, release, discharge)

5. BotSpecs Component (Bonus / stretch)
What it will do:

Shows detailed view of one specific bot.

Shows expanded info about a selected bot (like a detailed page or section).

Can be rendered on click from BotCard (additional interaction with the botCard).

## Conclusion: App Flow
Layout loads and fetches all bots.

BotCollection renders a grid of bots.

Clicking a bot in BotCollection enlists it (adds to army state).

YourBotArmy renders enlisted bots.

Clicking a bot in YourBotArmy releases it.

Clicking the red “x” button discharges the bot (also hits backend DELETE).

