import { Dispatch, SetStateAction, useRef, useState, FormEvent } from "react";
import gamesService from "../services/games.service";

interface PageProps {
  game: Game | undefined
  setFormShown: Dispatch<SetStateAction<boolean>>
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

const GameForm = ({ game, setFormShown, refresh, setRefresh }: PageProps) => {
  const [error, setError] = useState<string | undefined>();

  const titleRef = useRef<HTMLInputElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);
  const genreRef = useRef<HTMLSelectElement>(null);

  const handleError = (err: any): void => {
    const message = err.response ? err.response.data.error : err.message;
    
    setError(message);

    if (err.response.data.invalidInputs) {
      const inputs: string[] = err.response.data.invalidInputs;
      if (inputs.includes("title")) {
        titleRef.current!.style.border = "2px solid red";
      } else {
        titleRef.current!.style.border = "none";
      }

      if (inputs.includes("releaseDate")) {
        releaseDateRef.current!.style.border = "2px solid red";
      } else {
        releaseDateRef.current!.style.border = "none";
      }
    }

  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const gameInfo: Game = {
      title: titleRef.current!.value,
      releaseDate: releaseDateRef.current!.value,
      genre: genreRef.current!.value,
    }

    if (!game) {
      try {
        gamesService.createPrivateGame(gameInfo);
        setRefresh(!refresh);
      } catch (err: any) {
        handleError(err);
        return;
      }
    } else {
      try {
        gamesService.updatePrivateGame(game._id!, gameInfo);
  
        game.title = gameInfo.title;
        game.releaseDate = gameInfo.releaseDate;
        game.genre = gameInfo.genre;
        game.updatedAt = new Date();
  
      } catch (err: any) {
        handleError(err);
        return;
      }
    }


    setError(undefined);
    setFormShown(false);
  }

  return (
    <form id="gameForm" onSubmit={handleSubmit}>
      <h3>{game ? 'Edit' : 'Create'} Game</h3>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required ref={titleRef} defaultValue={game ? game.title : ""} />
      </div>
      <div>
        <label htmlFor="releaseDate">Release Date (MM/DD/YY)</label>
        <input type="text" name="releaseDate" id="releaseDate" required ref={releaseDateRef} defaultValue={game ? new Date(game.releaseDate).toLocaleDateString() : ""} />
      </div>
      <div>
        <label htmlFor="genre">Genre</label>
        <select name="genre" id="genre" required ref={genreRef} defaultValue={game ? game.genre : "Action"}>
          <option value="Action">Action</option>
          <option value="MMO">MMO</option>
          <option value="FPS">FPS</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Platformer">Platformer</option>
        </select>
      </div>
      {error && <span>Error: {error}</span>}
      <div>
        <button type="submit">&#10004; {game ? `Update` : 'Create'}</button>
        <button type="reset" onClick={() => setFormShown(false)}>&#10006; Cancel</button>
      </div>
    </form>
  )
}

export default GameForm;