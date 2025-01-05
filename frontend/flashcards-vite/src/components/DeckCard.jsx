import { Link } from 'react-router-dom';
import {Trash2} from 'lucide-react'

const DeckCard = ({ id, title, description= "No description", cardCount, lastStudied, deleteCard }) => {
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-card hover:shadow-lg transition-shadow card-hover">
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-5">
          <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
        </div>
        <div className="col-span-1">

        <button type="button" 
                    onClick={() => deleteCard(id)}
                    className="delete-card-btn"
                    >x</button>
        </div>
      </div>
      <p className="text-xl font-semibold text-text mb-2">{description}</p>
      <div className="text-gray-600 mb-4">
        <p>{cardCount} cards</p>
        <p>Last studied: {""}
        {lastStudied
          ? new Date(lastStudied).toLocaleString()
      : "Not studied yet"}
        </p>
      </div>
      <div className="flex gap-2">
        <Link 
          to={`/study/${id}`}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
        >
          Study Now
        </Link>
        <Link 
          to={`/edit/${id}`}
          className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary transition-colors"
        >
          Edit Deck
        </Link>
      </div>
    </div>
  );
};

export default DeckCard;