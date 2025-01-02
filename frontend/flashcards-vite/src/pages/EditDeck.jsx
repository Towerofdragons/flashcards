import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/Edit.css';

const EditDeck = () => {
  const { id } = useParams();
  const [deckName, setDeckName] = useState("JavaScript Basics");
  const [cards, setCards] = useState([
    { id: 1, front: "Example", back: "Example loaded from backend!" },
    { id: 2, front: "", back: "" },
    { id: 3, front: "", back: "" },
    { id: 4, front: "", back: "" }
  ]);

  const addCard = () => {
    setCards([...cards, { 
      id: cards.length + 1, 
      front: "", 
      back: "" 
    }]);
  };

  const updateCard = (id, field, value) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ deckName, cards });
  };
  
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="edit-container">
          <h2 className="text-3xl font-bold text-text mb-8">Edit Deck</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="deck-name-input">
              <label htmlFor="deckName">Deck Name</label>
              <input
                type="text"
                id="deckName"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 mb-6"
              />
            </div>
            <div className="cards-container">
              <h3 className="text-xl font-semibold mb-4">Cards</h3>
              {cards.map((card) => (
                <div key={card.id} className="card-edit-container">
                  <div className="card-side">
                    <label>Front</label>
                    <textarea
                      value={card.front}
                      onChange={(e) => updateCard(card.id, 'front', e.target.value)}
                      placeholder="Enter the front of the card"
                    />
                  </div>
                  <div className="card-side">
                    <label>Back</label>
                    <textarea
                      value={card.back}
                      onChange={(e) => updateCard(card.id, 'back', e.target.value)}
                      placeholder="Enter the back of the card"
                    />
                  </div>
                  <button type="button" 
                  onClick={() => deleteCard(card.id)}
                  className="delete-card-btn"
                  >

                  Delete Card
                </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addCard}
              className="add-card-btn"
            >
              Add New Card
            </button>
            <button
              type="submit"
              className="save-deck-btn"
            >
              Save Deck
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
export default EditDeck;