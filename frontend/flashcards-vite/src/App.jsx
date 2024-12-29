import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EditDeck from "./pages/EditDeck";
import StudyDeck from "./pages/StudyDeck";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/Dashboard" element={<Index />} />
      <Route path="/edit/:id" element={<EditDeck />} />
      <Route path="/study/:id" element={<StudyDeck />} />
    </Routes>
  </BrowserRouter>
);

export default App;