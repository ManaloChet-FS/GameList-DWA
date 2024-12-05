import { Link } from "react-router"

interface GameCardProps {
  id: string,
  title: string
}

const GameCard = ({ id, title }: GameCardProps) => {
  return (
    <article>
      <h2>{title}</h2>
      <Link to={`/games/${id}`}>Go to game's page</Link>
    </article>
  )
}

export default GameCard;