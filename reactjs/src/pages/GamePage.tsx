import { useEffect, Dispatch, SetStateAction } from "react";
import { useParams, Link, useNavigate } from "react-router";
import axios from "axios";

interface Game {
  _id: string
  title: string
  releaseDate: string
  genre: string
}

interface PageProps {
  game: Game | undefined
  setGame: Dispatch<SetStateAction<Game | undefined>>
  setFormShown: Dispatch<SetStateAction<boolean>>
}

const GamePage = ({ game, setGame, setFormShown }: PageProps) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async function getGame() {
      try {
        const { data } = await axios.get(`http://localhost:8000/games/${params.id}`);
        setGame(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [])

  const deleteGame = async () => {
    try {
      await axios.delete(`http://localhost:8000/games/${params.id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section id="game">
      <Link to="/">&#8249; Back to directory</Link>
      {game && <article>
        <h2>{game.title}</h2>
        <div>
          <p>Release Date: {new Date(game.releaseDate).toLocaleDateString()}</p>
          <p>Genre: {game.genre}</p>
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