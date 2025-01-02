import { HomeIcon, BookOpenIcon, PlusIcon, ChartBarIcon, CogIcon } from 'lucide-react';
import '../index.css'

import { CreateDeckDialog } from './CreateDeck';
//import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from 'react';
//import { useToast } from "@/components/ui/use-toast";


const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-6">
      <h1 className="text-2xl font-bold text-primary mb-8">Flashcards</h1>
      <nav className="space-y-4">
        <a href="/Dashboard" className="flex items-center space-x-3 text-text hover:text-primary p-2 rounded-lg hover:bg-background">
          <HomeIcon size={20} />
          <span>Dashboard</span>
        </a>
        <a href="/Dashboard" className="flex items-center space-x-3 text-text hover:text-primary p-2 rounded-lg hover:bg-background">
          <BookOpenIcon size={20} />
          <span>My Decks</span>
        </a>

        {/* <a href="#" className="flex items-center space-x-3 text-text hover:text-primary p-2 rounded-lg hover:bg-background">
        <PlusIcon size={20} />
        <span>Create Deck</span>
        </a>  */}
        
        <CreateDeckDialog/>

        <a href="#" className="flex items-center space-x-3 text-text hover:text-primary p-2 rounded-lg hover:bg-background">
          <ChartBarIcon size={20} />
          <span>Statistics</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-text hover:text-primary p-2 rounded-lg hover:bg-background">
          <CogIcon size={20} />
          <span>Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;