import { useState } from "react";
import { Header, GameForm } from "./components"
import { Directory, GamePage } from "./pages";
import { Routes, Route } from "react-router";


interface Game {
  _id: string
  title: string
  releaseDate: string
  genre: string
}

function App() {
  const API_BASE = import.meta.env.VITE_API_BASE;

  const [formShown, setFormShown] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [game, setGame] = useState<Game>();

  return (
    <>
      <Header />
      <main>
        {formShown && <GameForm game={game} setFormShown={setFormShown} refresh={refresh} setRefresh={setRefresh} API_BASE={API_BASE} />}
        <Routes>
          <Route path="/" element={<Directory setGame={setGame} setFormShown={setFormShown} refresh={refresh} API_BASE={API_BASE} />} />
          <Route path="/games/:id" element={<GamePage game={game} setGame={setGame} setFormShown={setFormShown} API_BASE={API_BASE} />} />
        </Routes>
      </main>
    </>
  )
}

export default App
