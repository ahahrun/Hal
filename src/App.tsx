import FlashCard from './components/FlashCard';
import { flashcards } from './data/flashcards';
import './App.css';

export default function App() {
  return (
    <main className="app-root">
      <FlashCard cards={flashcards} />
    </main>
  );
}
