
import './App.css'
import Inscription from './Composants/inscription'
import Connexion from './Composants/connexion'
import Catalogue from "./Composants/Catalogue";
import Paiement from "./Composants/paiment";
import Compte from "./Composants/compte";
import { Navigate, Route, Routes } from 'react-router'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inscription" replace />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/authentification" element={<Connexion />} />
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/paiement" element={<Paiement />} />
      <Route path="/compte" element={<Compte />} />
      <Route path="*" element={<Navigate to="/inscription" replace />} />
    </Routes>
  )
}
//

export default App
