export default function Welcome({ user }) {
  console.log('PETIT-ENFANT 2', { user });
 
  return <p>{user ? `Bienvenue, ${user.name}.` : 'Connectez-vous.'}</p>;
}