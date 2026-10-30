import Header from './Enfant1';
import Dashboard from './Enfant2';
import { UserProvider } from './UserContext';


/****************Parent****************************** */
// Plus d'état ici : le Parent se contente d'envelopper ses enfants
// dans le Provider. Plus aucune prop à transmettre.
export default function Parent() {
  console.log('App-Parent');

  return (
    <UserProvider>
    <Header/>
    <Dashboard/>
    </UserProvider>
  );
}
