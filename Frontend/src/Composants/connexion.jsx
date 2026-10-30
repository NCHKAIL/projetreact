import { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./inscription.module.css";

function Connexion() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState(false);
  const [chargement, setChargement] = useState(false);

  // Gère la modification des champs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gère l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErreur("");
    setSucces(false);

    if (!form.email.trim() || !form.password) {
      setErreur("Renseigne ton email et ton mot de passe.");
      return;
    }

    try {
      setChargement(true);

      const res = await fetch("/api/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErreur(data.message || "Email ou mot de passe incorrect.");
        return;
      }

      // Enregistre l'utilisateur connecté
      localStorage.setItem(
        "utilisateurConnecte",
        JSON.stringify({
          email: data.user?.email || form.email.trim(),
        })
      );

      setSucces(true);

      // Redirection vers le catalogue
      navigate("/catalogue");
    } catch (error) {
      setErreur(
        "Impossible de contacter le serveur. Vérifie que le backend est lancé."
      );
    } finally {
      setChargement(false);
    }
  };

  return (
    <main className={styles.page}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <h1>Se connecter</h1>

        <div className={styles.champ}>
          <label htmlFor="email">Email</label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="nom@exemple.fr"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.champ}>
          <label htmlFor="password">Mot de passe</label>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ton mot de passe"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {erreur && (
          <p className={styles.erreur}>
            {erreur}
          </p>
        )}

        {succes && (
          <p className={styles.succes}>
            Connexion réussie !
          </p>
        )}

        <button type="submit" disabled={chargement}>
          {chargement ? "Connexion en cours..." : "Se connecter"}
        </button>

        <p className={styles.lien}>
          Pas encore de compte ?{" "}
          <Link to="/inscription">S'inscrire</Link>
        </p>
      </form>
    </main>
  );
}

export default Connexion;
