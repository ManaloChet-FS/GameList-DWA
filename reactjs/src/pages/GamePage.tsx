import { useEffect, Dispatch, SetStateAction } from "react";
import { useParams, Link, useNavigate } from "react-router";
import authService from "../services/auth.service";
import gamesService from "../services/games.service";

interface PageProps {
  game: Game | undefined
  setGame: Dispatch<SetStateAction<Game | undefined>>
  setFormShown: Dispatch<SetStateAction<boolean>>
}

const GamePage = ({ game, setGame, setFormShown }: PageProps) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    gamesService.getPrivateGame(params.id!).then(
      res => {
        setGame(res.data);
      },
      (error) => {
        if (error.res && error.response.status == 403 || error.response.status == 401) {
          authService.logout();
          navigate("/login");
        }
      }
    )

    setFormShown(false);
  }, [])

  const deleteGame = async () => {
    try {
      gamesService.deletePrivateGame(params.id!);
    } catch (err) {
      console.log(err);
    }

    navigate("/");
  }

  return (
    <section id="game">
      <Link to="/">&#8249; Back to directory</Link>
      {game && <article>
        <h2>{game.title}</h2>
        <div>
          <p>Release Date: {new Date(game.releaseDate).toLocaleDateString()}</p>
          <p>Genre: {game.genre}</p>
          <p>Game entry created: {new Date(game.createdAt!).toLocaleString()}</p>
          <p>Last updated: {new Date(game.updatedAt!).toLocaleString()}</p>
        </div>
        <div>
          <button onClick={() => setFormShown(true)}>&#x270E; Edit</button>
          <button onClick={deleteGame}>&#10006; Delete</button>
        </div>
      </article>}
    </section>
  )
}

export default GamePage;