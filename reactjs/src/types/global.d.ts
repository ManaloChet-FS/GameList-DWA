export {};

declare global {
  interface Game {
    _id: string
    title: string
    releaseDate: string
    genre: string
    createdAt: Date
    updatedAt: Date
  }
}