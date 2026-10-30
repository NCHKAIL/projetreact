
 // Importe le hook useState pour créer des états dans le composant
import { useState } from "react";
// Importe Link pour les liens et useNavigate pour changer de page
import { Link, useNavigate } from "react-router";
// Importe les styles CSS Modules : styles.xxx renvoie un nom de classe unique
import styles from "./inscription.module.css";  // Remarque : le nom du fichier CSS est corrigé

// Déclare le composant Inscription (une fonction qui renvoie du JSX)
function Inscription() {
  // Hook permettant de rediriger l'utilisateur vers une autre page dans le composant
  const navigate = useNavigate();  


  // Un seul état objet pour tous les champs du formulaire
  // form = valeurs actuelles, setForm = fonction pour les modifier
  const [form, setForm] = useState({
    nom: "",            // valeur initiale vide
    prenom: "",
    email: "",
    password: "",
    confirmation: "",   // confirmation du mot de passe
    cgu: false,         // case à cocher : booléen
  });

  // État du message d'erreur ("" = pas d'erreur)
  const [erreur, setErreur] = useState("");
  // État du succès : false au départ, true quand l'inscription a réussi
  const [succes, setSucces] = useState(false);

  // Gestionnaire appelé à chaque modification d'un champ
  const handleChange = (e) => {
    // Extrait les propriétés utiles du champ qui a changé (déstructuration)
    const { name, value, type, checked } = e.target;
    // Met à jour l'état avec un nouvel objet (prev = ancien état)
    setForm((prev) => ({
      ...prev,  // recopie tous les champs existants
      // [name] : clé dynamique (nom, email...) ; une checkbox donne "checked", les autres "value"
      [name]: type === "checkbox" ? checked : value,
    }));
    // N'affiche pas les valeurs saisies dans la console pour protéger les informations personnelles
  };

  // Fonction appelée à l'envoi du formulaire ; async pour pouvoir utiliser await
  const handleSubmit = async (e) => {
    // Empêche le rechargement de la page (comportement par défaut d'un formulaire)
    e.preventDefault();

    // Efface les anciens messages avant les nouvelles vérifications
    setErreur("");
    setSucces(false);

    // Vérifie que les champs obligatoires sont remplis
    if (
      !form.nom.trim() ||
      !form.prenom.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmation
    ) {
      setErreur("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Vérifie que les deux mots de passe sont identiques
    if (form.password !== form.confirmation) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    // Vérifie la longueur minimale demandée par le backend
    if (form.password.length < 12) {
      setErreur("Le mot de passe doit contenir au moins 12 caractères.");
      return;
    }

    // Vérifie que l'utilisateur a accepté les conditions d'utilisation
    if (!form.cgu) {
      setErreur("Tu dois accepter les conditions d'utilisation.");
      return;
    }

    // try/catch : intercepte les erreurs réseau
    try {
      // Envoie la requête au backend et attend la réponse
      const res = await fetch("/api/inscription", {
        method: "POST",                                    // envoi de données
        headers: { "Content-Type": "application/json" },   // le corps est du JSON
        // Convertit l'objet en texte JSON ; confirmation et cgu ne sont pas envoyés
        body: JSON.stringify({
          nom: form.nom.trim(),
          prenom: form.prenom.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      // Lit le corps de la réponse et le convertit en objet JavaScript
      const data = await res.json();

      // res.ok vaut false pour tout code HTTP hors 200-299 (400, 409, 500...)
      if (!res.ok) {
        // Affiche le message renvoyé par le serveur
        setErreur(data.message || "L'inscription a échoué.");
        // Masque un éventuel message de succès précédent
        setSucces(false);
        // Arrête la fonction ici
        return;
      }

      // Réponse positive : efface l'erreur et affiche le succès
      setErreur("");
      setSucces(true);

      // Redirige l'utilisateur vers le catalogue après une inscription réussie
      navigate("/catalogue");
    } catch {
      // Le serveur n'a pas répondu (backend éteint, proxy Vite absent...)
      setErreur("Serveur injoignable. Vérifie que le backend est lancé.");
      setSucces(false);
    }
  };

  // JSX : ce que le composant affiche
  return (
    // Balise sémantique du contenu principal de la page
    <main className={styles.page}>
      {/* onSubmit : appelle handleSubmit à l'envoi ; noValidate désactive la validation du navigateur */}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h1>Créer un compte</h1>

        {/* Bloc du champ Nom */}
        <div className={styles.champ}>
          {/* htmlFor relie l'étiquette à l'input d'id "nom" : un clic dessus active le champ */}
          <label htmlFor="nom">Nom</label>
          {/* Champ contrôlé : value vient de l'état, onChange le met à jour ; name sert à handleChange */}
          <input
            type="text"
            id="nom"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            autoComplete="family-name"
          />
        </div>
        

        {/* Bloc du champ Prénom, même principe */}
        <div className={styles.champ}>
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            autoComplete="given-name"
          />
        </div>

        {/* Bloc du champ Email */}
        <div className={styles.champ}>
          <label htmlFor="email">Email</label>
          <input
            type="email"                    // clavier adapté sur mobile
            id="email"
            name="email"
            placeholder="nom@exemple.fr"    // texte d'exemple grisé
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        {/* Bloc du champ Mot de passe */}
        <div className={styles.champ}>
          <label htmlFor="password">Mot de passe</label>
          {/* type="password" masque les caractères saisis */}
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        {/* Bloc du champ Confirmation */}
        <div className={styles.champ}>
          <label htmlFor="confirmation">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmation"
            name="confirmation"
            value={form.confirmation}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        {/* Combine deux classes CSS : champ et champCase */}
        <div className={`${styles.champ} ${styles.champCase}`}>
          {/* Case à cocher : on utilise "checked" (booléen) au lieu de "value" */}
          <input
            type="checkbox"
            id="cgu"
            name="cgu"
            checked={form.cgu}
            onChange={handleChange}
          />
          <label htmlFor="cgu">J'accepte les conditions d'utilisation</label>
        </div>

        {/* Affiche le paragraphe d'erreur seulement si erreur n'est pas vide */}
        {erreur && <p className={styles.erreur}>{erreur}</p>}
        {/* Affiche le message de succès seulement si succes vaut true */}
        {succes && <p className={styles.succes}>Inscription réussie, {form.prenom} !</p>}

        {/* Bouton qui déclenche l'envoi du formulaire */}
        <button type="submit">S'inscrire</button>

        <p className={styles.lien}>
          {/* Lien vers la page de connexion, sans rechargement */}
          Déjà un compte ? <Link to="/authentification">Se connecter</Link>
        </p>
      </form>
    </main>
  );
}

// Exporte le composant pour l'importer dans App.jsx ou le routeur
export default Inscription;
