import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useToast } from "../components/Toast";
import '../styles/Edit.css';
import api from "../api/axios";

import {Trash2} from 'lucide-react'


const EditDeck = () => {
  const { showToast } = useToast();
  const { id } = useParams();
  const [deckName, setDeckName] = useState("");
  const [cards, setCards] = useState([]);
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const getDeck = async () => {

      try {
        const response = await api.get(`/get-deck/${id}`);
        console.log(response.data);

        setDeckName(response.data.deck.name) // TODO Deck name
        setCards(response.data.flashcards);
        setSize(response.data.size);
        setLoading(false);

      } catch (error) {
        showToast(
          {
            title: `Error getting deck :${id}`,
            description: `${error}`
          }
        );
        setLoading(false);
        console.log(error);
        throw error.response ? error.response.data : new Error("Network Error");
      }
    };

    getDeck(); // Calls get deck to get all decks when component loads - runs once
    console.log(`Cards ${cards.length <= 0}`);
  },[]); 


  const addCard = async () => {

    try{
      const response = await api.post(`/add-flashcard/${id}/`);
    }catch(error){
      showToast(
        {
          title: `Error getting deck :${id}`,
          description: `${error}`
        }
      );

      throw error.response ? error.response.data : new Error("Network Error");
    }

    setSize(size + 1);
    setCards([...cards, { 
      id: response.id, 
      front: response.data.term, 
      back: response.data.description 
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
    <div className="min-h-screen flex bg-gray-300">
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
              {
                size <= 0 ? (
                <p>No cards here</p>
                ) : (
                  cards.map((card) => (
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
                      <Trash2 />
                  </button>
                  </div>
                ))) 
            }

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