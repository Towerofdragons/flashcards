import { HomeIcon, BookOpenIcon, PlusIcon, ChartBarIcon, CogIcon } from 'lucide-react';
import '../index.css'

import { CreateDeckDialog, GenerateDeckDialog } from './CreateDeck';

import { useState } from 'react';


const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-200 shadow-lg p-6">
      <h1 className="text-2xl font-bold text-primary mb-8">MnW Flashcards</h1>
      <nav className="space-y-4">
        <a href="/Dashboard" className="flex items-center space-x-3 text-text hover:text-primary p-2 rounded-lg hover:bg-background">
          <HomeIcon size={20} />
          <span>Dashboard</span>
        </a>
        <a href="/Dashboard" className="flex items-center space-x-3 text-text hover:text-primary p-2 rounded-lg hover:bg-background">
          <BookOpenIcon size={20} />
          <span>My Decks</span>
        </a>

        
        <CreateDeckDialog/>
        <GenerateDeckDialog/>
        
        <a href="#" className="flex items-center space-x-3 text-text hover:text-primary p-2 rounded-lg hover:bg-background">
          <CogIcon size={20} />
          <span>Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;