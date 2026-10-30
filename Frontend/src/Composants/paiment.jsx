import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import styles from "./inscription.module.css";

function Paiement() {
  const navigate = useNavigate();
  const location = useLocation();

  const panier = location.state?.panier || [];
  const total = location.state?.total || 0;

  const [form, setForm] = useState({
    nom: "",
    email: "",
    adresse: "",
    ville: "",
    codePostal: "",
  });

  const [erreur, setErreur] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.nom ||
      !form.email ||
      !form.adresse ||
      !form.ville ||
      !form.codePostal
    ) {
      setErreur("Merci de remplir tous les champs.");
      return;
    }

    if (panier.length === 0) {
      setErreur("Votre panier est vide. Retournez au catalogue.");
      return;
    }

    setErreur("");

    // Pour le moment, on affiche une confirmation de commande.
    // Le paiement réel sera ajouté ensuite.
    navigate("/confirmation", {
      state: {
        panier,
        total,
        form,
      },
    });
  };

  return (
    <main className={styles.page}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <h1>Finaliser ma commande</h1>

        <h2>Récapitulatif de la commande</h2>

        {panier.length === 0 ? (
          <p>
            Votre panier est vide.{" "}
            <Link to="/catalogue">Retour au catalogue</Link>
          </p>
        ) : (
          <>
            {panier.map((item) => (
              <p key={item.id}>
                {item.nom} × {item.quantite} —{" "}
                {(item.prix * item.quantite).toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </p>
            ))}

            <p>
              <strong>
                Total :{" "}
                {total.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </strong>
            </p>
          </>
        )}

        <div className={styles.champ}>
          <label htmlFor="nom">Nom complet</label>
          <input
            id="nom"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>

        <div className={styles.champ}>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        <div className={styles.champ}>
          <label htmlFor="adresse">Adresse de livraison</label>
          <input
            id="adresse"
            name="adresse"
            value={form.adresse}
            onChange={handleChange}
            autoComplete="street-address"
          />
        </div>

        <div className={styles.champ}>
          <label htmlFor="ville">Ville</label>
          <input
            id="ville"
            name="ville"
            value={form.ville}
            onChange={handleChange}
            autoComplete="address-level2"
          />
        </div>

        <div className={styles.champ}>
          <label htmlFor="codePostal">Code postal</label>
          <input
            id="codePostal"
            name="codePostal"
            value={form.codePostal}
            onChange={handleChange}
            autoComplete="postal-code"
          />
        </div>

        {erreur && <p className={styles.erreur}>{erreur}</p>}

        <button type="submit">Confirmer ma commande</button>

        <p className={styles.lien}>
          <Link to="/catalogue">Retour au catalogue</Link>
        </p>
      </form>
    </main>
  );
}

export default Paiement;