import Sidebar from '../components/Sidebar';
import DeckCard from '../components/DeckCard';
import ContentBox from '../components/ContentBox'
import api from '../api/axios'
import { useToast } from "../components/Toast";
import { useEffect, useState } from "react";

import { CreditCard, IdCardIcon, WalletCards } from 'lucide-react';


const Index = () => {

  const [decks, setDecks] = useState([]);
  const [totalCards, setTotalCards] = useState(0);
  const [lastStudied, setLastStudied] = useState([]);
  const [error, setError] = useState(null);
  const { showToast } = useToast();


  const calculateTotalCards = () => {
    if (decks && decks.length > 0) {
      const total = decks.reduce((sum, deck) => sum + deck.cardCount, 0); // Apply callback for each deck to gather all deck sizes
      console.log(`total cards:${total}`);
      setTotalCards(total);
    }
  };

  const lastStudiedDecks = () => {
    // Filter decks that have a valid lastStudied date - Display up to 3
    if (decks && decks.length > 0) {
      const studiedDecks = decks
        .sort((a, b) =>  b.lastStudied - a.lastStudied)
        .slice(0, 3);

      setLastStudied(studiedDecks);
      
    }
  };

  const deleteCard = async(id) => {
    try {
      const response = await api.post(`/delete-deck/`, {
        id : id
      });
      console.log(response.data);
      setDecks(decks.filter((card) => card.id !== id));

      showToast(
        {
          title: `Deck Deleted Successfully :${id}`,
          description: `${error}`
        }
      );
      

    } catch (error) {
      showToast(
        {
          title: `Error Deleting deck :${id}`,
          description: `${error}`
        }
      );

      console.log(error);
      throw error.response ? error.response.data : new Error("Network Error");
    }
  }

  const getDecks = async () => {
    try {
      const response = await api.get("/get-decks/");
      console.log(response.data);
      setDecks(response.data);
      console.log(decks);
    } catch (error) {
      showToast(
        {
          title: "Error getting decks",
          description: `${error}`
        }
      );
      console.log(error);
      throw error.response ? error.response.data : new Error("Network Error");
    }
  };

  useEffect(() => {

    getDecks();
    console.log(decks);
  },[]); 

  useEffect(() => {
    calculateTotalCards();
    lastStudiedDecks();
    console.log(decks);
  },[decks]); 


  return (
    <div className="min-h-screen flex">
      <Sidebar getDecks={ getDecks } />
      <main className="ml-64 flex-1 p-8 ">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text">Welcome back!</h2>
          <p className="text-gray-600 mt-2">Ready to Study?</p>
        </div>
  

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <ContentBox
            title= "Current Decks"
            > 
              <WalletCards size={40} strokeWidth={1.5} />
               <b>{decks.length}</b>
            </ContentBox>

            <ContentBox
            title= "Total Cards"
            >
              <CreditCard size={40} strokeWidth={1.5} />
              <b>{totalCards}</b>
            </ContentBox>
        </div>


        <div>
            <ContentBox
            title= "Recent Study Sessions"
            >
              <div>
              {lastStudied.length > 0 ? (
                  <ul>
                    {lastStudied.map(deck => (
                      <li key={deck.id} className="deck-item">
                        <span className="deck-name">{deck.name} </span>
                        <span className="deck-date">
                          {Date(deck.lastStudied).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No sessions yet</p>
                )}
              </div>
            </ContentBox>

        </div>

        <div>
            <ContentBox
            title= "Today's Motivation ✨"
            >
              <p>You don't want a repeat of last semester!</p>
            </ContentBox>

        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text">Your Decks!</h2>
          <p className="text-gray-600 mt-2">Pick a deck to study or create a new one.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <DeckCard deleteCard={deleteCard}
              id={deck.id}
              key={deck.id}
              title={deck.name}
              description={deck.description}
              cardCount={deck.cardCount}
              lastStudied={deck.last_studied}
            />
          ))}
        </div>

          
        {decks.length === 0 && (
          <ContentBox
          title = "No decks found."
          >
            <p className="text-gray-600"> Create your first deck to get started!</p>
          </ContentBox> 
        )}
          
        
      </main>
    </div>
  );
};

export default Index;