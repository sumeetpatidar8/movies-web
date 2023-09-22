
import { MoviesList } from './components/moviesList';
import { MovieInfoModal } from './components/movieInfoModal';
import { WatchlistModal } from './components/watchlistModal';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-10 py-20">
      <MoviesList />
      <MovieInfoModal />
      <WatchlistModal />
    </main>
  )
}
