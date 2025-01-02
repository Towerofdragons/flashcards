import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const StudyDeck = () => {
  const { id } = useParams();

  
  // Mock data - in a real app this would come from your backend - Load card data
  const [cards] = useState([
    { id: 1, front: "What is React?", back: "A JavaScript library for building user interfaces" },
    { id: 2, front: "What is JSX?", back: "A syntax extension for JavaScript that allows you to write HTML-like code in JavaScript" },
    { id: 3, front: "What is a Component?", back: "A reusable piece of UI that can contain its own content, logic, and styling" }
  ]);
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  const handleCorrect = () => {
    setCorrectCount(prev => prev + 1);
    setCurrentCardIndex(prev => (prev + 1) % cards.length);
    setIsFlipped(false);
  };
  const handleNext = () => {
    setCurrentCardIndex(prev => (prev + 1) % cards.length);
    setIsFlipped(false);
  };
  const progressPercentage = (correctCount / cards.length) * 100;
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-primary h-4 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-right mt-2 text-gray-600">
              Score: {correctCount}/{cards.length}
            </div>
          </div>
          <div 
            className={`card-container ${isFlipped ? 'flipped' : ''}`}
            onClick={handleCardClick}
          >
            <div className="card-inner">
              <div className="card-front">
                <p>{cards[currentCardIndex].front}</p>
              </div>
              <div className="card-back">
                <p>{cards[currentCardIndex].back}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handleCorrect}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Correct
            </button>
            <button
              onClick={handleNext}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default StudyDeck;