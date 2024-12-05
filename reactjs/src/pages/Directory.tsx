import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { GameCard } from "../components"

interface PageProps {
  setGame: Dispatch<SetStateAction<Game | undefined>>
  setFormShown: Dispatch<SetStateAction<boolean>>
  refresh: boolean
  API_BASE: string
}

const Directory = ({ setGame, setFormShown, refresh, API_BASE }: PageProps) => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    (async function getGames() {
      try {
        const res = await fetch(API_BASE);
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.log(err);
      }
    })();

    setGame(undefined);
  }, [refresh]);

  return (
    <>
      <p onClick={() => setFormShown(true)}>+ Add game</p>
      <section id="games">
        {games && games.map(game => {
          return <GameCard key={game._id} id={game._id} title={game.title} />
        })}
      </section>
    </>
  )
}

export default Directory;