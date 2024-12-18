import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { GameCard } from "../components"
import { useNavigate } from "react-router"
import authService from "../services/auth.service";
import gamesService from "../services/games.service";

interface PageProps {
  setGame: Dispatch<SetStateAction<Game | undefined>>
  setFormShown: Dispatch<SetStateAction<boolean>>
  refresh: boolean
}

const Directory = ({ setGame, setFormShown, refresh }: PageProps) => {
  const [games, setGames] = useState<Game[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    gamesService.getAllPrivateGames().then(
      res => {
        setGames(res.data);
      },
      (error) => {
        if (error.res && error.response.status == 403 || error.response.status == 401) {
          authService.logout();
          navigate("/login");
        }
      }
    )

    setFormShown(false);
    setGame(undefined);
  }, [refresh]);

  return (
    <>
      <p onClick={() => setFormShown(true)}>+ Add game</p>
      <section id="games">
        {games && games.map(game => {
          return <GameCard key={game._id} id={game._id!} title={game.title} />
        })}
      </section>
    </>
  )
}

export default Directory;