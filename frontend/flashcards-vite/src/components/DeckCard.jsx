// import { BookOpen } from 'lucide-react';

// const DeckCard = ({ title, cardCount, lastStudied }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-card card-hover">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-text">{title}</h3>
//         <BookOpen size={20} className="text-primary" />
//       </div>
//       <div className="space-y-2">
//         <p className="text-sm text-gray-600">{cardCount} cards</p>
//         <p className="text-sm text-gray-600">Last studied: {lastStudied}</p>
//       </div>
//       <button className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors">
//         Study Now
//       </button>
//     </div>
//   );
// };

// export default DeckCard;

// import { Link } from 'react-router-dom';

// const DeckCard = ({ id = 1, title, cardCount, lastStudied }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-card hover:shadow-lg transition-shadow card-hover">
//       <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
//       <div className="text-gray-600 mb-4">
//         <p>{cardCount} cards</p>
//         <p>Last studied: {lastStudied}</p>
//       </div>
//       <div className="flex gap-2">
//         <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
//           Study Now
//         </button>
//         <Link 
//           to={`/edit/${id}`}
//           className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary transition-colors"
//         >
//           Edit Deck
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default DeckCard;

import { Link } from 'react-router-dom';

const DeckCard = ({ id, title, cardCount, lastStudied }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-card hover:shadow-lg transition-shadow card-hover">
      <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
      <div className="text-gray-600 mb-4">
        <p>{cardCount} cards</p>
        <p>Last studied: {lastStudied}</p>
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