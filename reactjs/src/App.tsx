import { useState, useEffect } from "react";
import { Header, GameForm } from "./components"
import authService from "./services/auth.service";
import { Directory, GamePage, NotFound, Login, SignUp } from "./pages";
import { Routes, Route } from "react-router";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [formShown, setFormShown] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setLoggedIn(true);
    }
  }, [])

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <main>
        {formShown && <GameForm game={game} setFormShown={setFormShown} refresh={refresh} setRefresh={setRefresh} />}
        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} />} />
          <Route path="/" element={<Directory setGame={setGame} setFormShown={setFormShown} refresh={refresh} />} />
          <Route path="/games/:id" element={<GamePage game={game} setGame={setGame} setFormShown={setFormShown} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
