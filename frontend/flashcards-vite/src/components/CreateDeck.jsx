import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { PlusIcon, ChartBarIcon } from 'lucide-react';
// import * as Toast from "@radix-ui/react-toast";
import { useState } from 'react';
import { useToast } from "./Toast";
import api from "../api/axios";


const sidebarStyles = {
    container: "fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-6",
    title: "text-2xl font-bold text-primary mb-8",
    nav: "space-y-4",
    link: "flex items-center space-x-3 text-text hover:text-primary p-2 rounded-lg hover:bg-background",
    dialogTrigger: "flex items-center space-x-3 text-text hover:text-primary p-2 rounded-lg hover:bg-background w-full",
    formContainer: "space-y-4 mt-4",
    label: "text-sm font-medium text-gray-700",
    input: "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
    button: "w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
  };



export const CreateDeckDialog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { showToast } = useToast();

  const handleCreateDeck = async () => {
    const name = title.trim()
    if (!name) {
        console.log(" Empty field ");
        
        showToast({
            title: "Error",
            description: "Please enter a deck title",
        });
        return;
    }

    try{
      const response = await api.post("/add-deck/",
        {
          name: name,
          description: description
        }
      );

      showToast({
        title: "Success",
        description: "Deck created successfully!",
      });

      console.log("Deck created:", response.data);

      // Reset the form
      setTitle("");
      setDescription("");
    } catch (error){
      
      showToast({
        title: "Error",
        description:  "Failed to create deck",
      });
      console.error("Error creating deck:", error);
    }
    
    console.log(title);
    
  };

  return (
    <Dialog>
      <DialogTrigger className={sidebarStyles.dialogTrigger}>
        <PlusIcon size={20} />
        <span>Create Deck</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Deck</DialogTitle>
        </DialogHeader>
        <div className={sidebarStyles.formContainer}>
          <div>
            <label htmlFor="title" className={sidebarStyles.label}>
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={sidebarStyles.input}
              placeholder="Enter deck title"
            />
          </div>
          <div>
            <label htmlFor="description" className={sidebarStyles.label}>
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={sidebarStyles.input}
              placeholder="Enter deck description"
              rows={3}
            />
          </div>
          <button
            onClick={handleCreateDeck}
            className={sidebarStyles.button}
          >
            Create Deck
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


export const GenerateDeckDialog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const { showToast } = useToast();

  const handleCreateDeck = async () => {
    const name = title.trim()
    if (!name) {
        console.log(" Empty field ");
        
        showToast({
            title: "Error",
            description: "Please enter a deck title",
        });
        return;
    }

    try{
      const response = await api.post("/generate-deck/",
        { 
          name: title,
          prompt: prompt,
          description: description
        }
      );

      showToast({
        title: "Success",
        description: "Deck Generated successfully!",
      });

      console.log("Deck created:", response.data);

      // Reset the form
      setTitle("");
      setDescription("");
      setPrompt("");
    } catch (error){
      
      showToast({
        title: "Error - cannot Generate deck",
        description:  "Failed to create deck",
      });
      console.error("Error creating deck:", error);
    }
    
    console.log(title);
    
  };

  return (
    <Dialog>
      <DialogTrigger className={sidebarStyles.dialogTrigger}>
        <ChartBarIcon size={20} />
        <span>Generate Deck</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate A New Deck</DialogTitle>
        </DialogHeader>
        <div className={sidebarStyles.formContainer}>
          <div>
            <label htmlFor="title" className={sidebarStyles.label}>
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={sidebarStyles.input}
              placeholder="Enter deck title"
            />
          </div>
          <div>
            <label htmlFor="description" className={sidebarStyles.label}>
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={sidebarStyles.input}
              placeholder="Enter deck description"
              rows={1}
            />
          </div>
          <div>
            <label htmlFor="prompt" className={sidebarStyles.label}>
              Prompt
            </label>
            <textarea
              required
              id="description"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={sidebarStyles.input}
              placeholder="Enter deck prompt: Anyrhing in specific you want in your deck?"
              rows={3}
            />
          </div>

          <button
            onClick={handleCreateDeck}
            className={sidebarStyles.button}
          >
            Generate Deck
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};