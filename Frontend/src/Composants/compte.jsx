import { Link, useNavigate } from "react-router";
import styles from "./inscription.module.css";

function Compte() {
const navigate = useNavigate();

const utilisateur = JSON.parse( 
    // Récupère l'utilisateur connecté depuis le localStorage
    localStorage.getItem("utilisateurConnecte") || "null"
);

function deconnexion() {
    localStorage.removeItem("utilisateurConnecte"); 
    // Supprime l'utilisateur connecté du localStorage ( une memoire interne du navigateur)
    navigate("/authentification");
}

if (!utilisateur) {
    return (
    <main className={styles.page}>
        <div className={styles.form}>
        <h1>Mon compte</h1>
        <p>Tu dois te connecter pour accéder à ton compte.</p>
        <Link to="/authentification">Se connecter</Link>
        </div>
    </main>
    );
}

return (
    <main className={styles.page}>
    <section className={styles.form}>
        <h1>Mon compte</h1>

        <p>Bienvenue dans ton espace personnel ! 💗</p>

        <div className={styles.champ}> 
        <label>Adresse e-mail</label>
        <p>{utilisateur.email}</p>
        </div>

        <p>Retrouve ici ton espace client.</p>


        <button type="button" onClick={() => navigate("/catalogue")}>  
            //onClick : detecter un clic  redirige vers le catalogue
            // Ajout du bouton pour revenir au catalogue 
        Retour au catalogue
        </button>

        <button type="button" onClick={deconnexion}> / 
        </button>
    </section>
    </main>
);
}

export default Compte;