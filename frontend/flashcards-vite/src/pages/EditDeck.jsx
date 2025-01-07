import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ContentBox from '../components/ContentBox';
import { useToast } from "../components/Toast";
import '../styles/Edit.css';
import api from "../api/axios";

import {Trash2} from 'lucide-react'


const EditDeck = () => {
  const { showToast } = useToast();
  const { id } = useParams();
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDescription] = useState("");
  const [cards, setCards] = useState([]);
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(true);

  const [pendingChanges, setPendingChanges] = useState({
    toUpdate: [],
    toDelete: []
  });

  
  const processBatch = async () => {
  
    // Update flashcards
    for (const flashcard of pendingChanges.toUpdate) {
      try {
        const data = await api.post(`/edit-flashcard/`, flashcard);
        // results.updated.push(data);
        console.log(flashcard);
      } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
      }
    }
  
    // Delete flashcards
    for (const id of pendingChanges.toDelete) {
      try {
        await api.post('/delete-flashcard/', 
          {
            id: id
          });
      } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
      }
    }
  
    console.log("Batch results:", pendingChanges);
    return pendingChanges;
  };
  
 

  useEffect(() => {
    const getDeck = async () => {

      try {
        const response = await api.get(`/get-deck/${id}`);
        const flashcards = response.data.flashcards;
        console.log(flashcards);

        setDeckName(response.data.deck.name) // TODO Deck name
        setCards(flashcards);
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
      const response = await api.post(`/add-flashcard/`, 
      {
        deck: id,
        term: "Fill",
        definition: "Fill"
      });

    setSize(size + 1);
    setCards([...cards, { 
      id: response.id, 
      term: response.data.term, 
      description: response.data.description 
    }]);

    }catch(error){
      showToast(
        {
          title: `Error Adding card for deck :${id}`,
          description: `${error}`
        }
      );

      throw error.response ? error.response.data : new Error("Network Error");
    }

  };

  const updateCard = (id, field, value) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );

    setPendingChanges((prevChanges) => {
      const existingUpdate = prevChanges.toUpdate.find((card) => card.id === id);
      if (existingUpdate) {
        return {
          ...prevChanges,
          toUpdate: prevChanges.toUpdate.map((card) =>
            card.id === id ? { ...card, [field]: value } : card
          ),
        };
      } else {
        const updatedCard = cards.find((card) => card.id === id);
        return {
          ...prevChanges,
          toUpdate: [...prevChanges.toUpdate, { ...updatedCard, [field]: value }],
        };
      }
    });
  };

  const deleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));

    setPendingChanges((prevChanges) => ({
      ...prevChanges,
      toDelete: [...prevChanges.toDelete, id],
      toUpdate: prevChanges.toUpdate.filter((card) => card.id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processBatch();
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

              <label htmlFor="deckDescription">Deck Description</label>
              <input
                type="text"
                id="deckDescription"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 mb-6"
              />
            </div>
            <div className="cards-container">
              <h3 className="text-xl font-semibold mb-4">Cards ({size})</h3>
              {
                size <= 0 ? (
                  <ContentBox>

                    <p>No cards here</p>

                  </ContentBox>
                ) : (
                  cards.map((card) => (
                  <div key={card.id} className="card-edit-container">
                    <div className="card-side">
                      <label>Front</label>
                      <textarea
                        value={card.term}
                        onChange={(e) => updateCard(card.id, 'term', e.target.value)}
                        placeholder="Enter the front of the card"
                      >
                        </textarea>
                    </div>
                    <div className="card-side">
                      <label>Back</label>
                      <textarea
                        value={card.definition}
                        onChange={(e) => updateCard(card.id, 'definition', e.target.value)}
                        placeholder="Enter the back of the card"
                      />
                    </div>
                    <div>
                      <button type="button" 
                      onClick={() => deleteCard(card.id)}
                      className="delete-card-btn"
                      >
                        <Trash2 /> Delete Card
                      </button>
                    </div>
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