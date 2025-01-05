import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from "../components/Toast";

import Sidebar from '../components/Sidebar';

import api from "../api/axios"

const StudyDeck = () => {
  const { id } = useParams();

  const [deckName, setDeckName] = useState("");
  const [flashcards, setCards] = useState([]);
  const [size, setSize] = useState(0);
  const [error, setError] = useState(null);
  const { showToast } = useToast();
  
  
  // const [cards] = useState([
  //   { id: 1, front: "What is React?", back: "A JavaScript library for building user interfaces" },
  //   { id: 2, front: "What is JSX?", back: "A syntax extension for JavaScript that allows you to write HTML-like code in JavaScript" },
  //   { id: 3, front: "What is a Component?", back: "A reusable piece of UI that can contain its own content, logic, and styling" }
  // ]);
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);


  useEffect(() => {
    const getDeck = async () => {

      try {
        const response = await api.get(`/get-deck/${id}`);
        api.post(`/study-deck/${id}/`);
        console.log(response.data);

        setDeckName(response.data.deck.name) // TODO Deck name
        setCards(response.data.flashcards);
        setSize(response.data.size);

      } catch (error) {
        showToast(
          {
            title: `Error getting deck :${deck}`,
            description: `${error}`
          }
        );
        console.log(error);
        throw error.response ? error.response.data : new Error("Network Error");
      }
    };

    getDeck(); // Calls get deck to get all decks when component loads - runs once
  },[]); 
  
  //flashcards[currentCardIndex]?.term - conditional chaining - handles undefined gracefully
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  const handleCorrect = () => {
    setCorrectCount(prev => prev + 1);
    setCurrentCardIndex(prev => (prev + 1) % size);
    setIsFlipped(false);
  };
  const handleNext = () => {
    setCurrentCardIndex(prev => (prev + 1) % size);
    setIsFlipped(false);
  };
  const progressPercentage = (correctCount / flashcards.length) * 100;
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-8">{deckName}</h2>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-primary h-4 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-right mt-2 text-gray-600">
              Score: {correctCount}/{size}
            </div>
          </div>
          { size > 0 ?(

            <div 
              className={`card-container ${isFlipped ? 'flipped' : ''}`}
              onClick={handleCardClick}
            >
              <div className="card-inner">
                <div className="card-front">
                  <p>{flashcards[currentCardIndex]?.term}</p> 
                </div>
                <div className="card-back">
                  <p>{flashcards[currentCardIndex]?.definition}</p>
                </div>
              </div>
            </div>
            ) : (

            <div 
            className={`card-container ${isFlipped ? 'flipped' : ''}`}
            onClick={handleCardClick}
            >
              <div className="card-inner">
                <div className="card-front">
                  <p>No cards in this deck. (Tap me)</p> 
              </div>
                <div className="card-back">
                  <p>Add a Few!</p>
                </div>
              </div>
            </div>

            )}
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