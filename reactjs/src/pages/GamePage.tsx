import { useEffect, Dispatch, SetStateAction } from "react";
import { useParams, Link, useNavigate } from "react-router";
import axios from "axios";

interface PageProps {
  game: Game | undefined
  setGame: Dispatch<SetStateAction<Game | undefined>>
  setFormShown: Dispatch<SetStateAction<boolean>>
  API_BASE: string
}

const GamePage = ({ game, setGame, setFormShown, API_BASE }: PageProps) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async function getGame() {
      try {
        const { data } = await axios.get(`${API_BASE}/${params.id}`);
        setGame(data);
      } catch (err) {
        navigate("/404");
      }
    })();
  }, [])

  const deleteGame = async () => {
    try {
      await axios.delete(`${API_BASE}/${params.id}`);
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
          <p>Game entry created: {new Date(game.createdAt).toLocaleString()}</p>
          <p>Last updated: {new Date(game.updatedAt).toLocaleString()}</p>
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