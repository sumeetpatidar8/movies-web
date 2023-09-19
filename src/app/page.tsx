import Image from 'next/image'
import { NavigationBar } from './components/navigationBar';
import { MoviesList } from './components/moviesList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-10 py-20">
      <MoviesList />
    </main>
  )
}
