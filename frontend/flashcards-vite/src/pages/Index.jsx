import Sidebar from '../components/Sidebar';
import DeckCard from '../components/DeckCard';

const Index = () => {
  const decks = [
    { id: 1, title: "JavaScript Basics", cardCount: 25, lastStudied: "2 days ago" },
    { id: 2, title: "React Fundamentals", cardCount: 30, lastStudied: "1 week ago" },
    { id: 3, title: "CSS Properties", cardCount: 20, lastStudied: "3 days ago" },
    { id: 4, title: "HTML Elements", cardCount: 15, lastStudied: "1 day ago" },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text">Welcome back!</h2>
          <p className="text-gray-600 mt-2">Pick a deck to study or create a new one.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <DeckCard
              key={deck.id}
              title={deck.title}
              cardCount={deck.cardCount}
              lastStudied={deck.lastStudied}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;