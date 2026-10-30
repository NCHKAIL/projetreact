import { useState } from "react";
import { useNavigate, Link } from "react-router";
import styles from "./catalogue.module.css";

const produits = [
  {
    id: 1,
    nom: "Casque audio",
    categorie: "Casques audio",
    description: "Un son immersif et un design élégant.",
    prix: 59.90,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    nom: "Montre connectée",
    categorie: "Montres connectées",
    description: "Gardez un œil sur vos activités quotidiennes.",
    prix: 89.90,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    nom: "Enceinte Bluetooth",
    categorie: "Enceintes Bluetooth",
    description: "Votre musique préférée partout avec vous.",
    prix: 39.90,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
  },
];

const euro = (prix) =>
  prix.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

export default function Catalogue() {
  const navigate = useNavigate();

  const [panier, setPanier] = useState([]);
  const [categorieActive, setCategorieActive] = useState("Toutes");
  const [recherche, setRecherche] = useState("");

  // Recherche par nom, catégorie ou description
  const produitsFiltres = produits.filter((produit) => {
    const texteRecherche = recherche.trim().toLocaleLowerCase("fr");

    const correspondCategorie =
      categorieActive === "Toutes" ||
      produit.categorie === categorieActive;

    const correspondRecherche =
      produit.nom.toLocaleLowerCase("fr").includes(texteRecherche) ||
      // Vérifie si le nom, la catégorie ou la description contient le texte recherché
      produit.categorie.toLocaleLowerCase("fr").includes(texteRecherche) ||
    
      produit.description.toLocaleLowerCase("fr").includes(texteRecherche);

    return correspondCategorie && correspondRecherche;
  });

  function ajouterAuPanier(produit) { 
    // Ajoute un produit au panier
    setPanier((ancienPanier) => { 
      // Met à jour l'état du panier avec une fonction qui reçoit l'ancien état
      const dejaPresent = ancienPanier.find(
        (item) => item.id === produit.id
      );

      if (dejaPresent) {
        return ancienPanier.map((item) => 
          // Si le produit est déjà dans le panier, on augmente sa quantité
          item.id === produit.id
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      }

      return [...ancienPanier, { ...produit, quantite: 1 }];
    });
  }

  function changerQuantite(id, variation) {
    setPanier((ancienPanier) =>
      ancienPanier
        .map((item) =>
          item.id === id
            ? { ...item, quantite: item.quantite + variation }
            : item
        )
        .filter((item) => item.quantite > 0)
    );
  }

  const nombreArticles = panier.reduce(
    (total, item) => total + item.quantite,
    0
  );

  const total = panier.reduce(
    (somme, item) => somme + item.prix * item.quantite,
    0
  );

  function passerAuPaiement() {
    if (panier.length === 0) {
      return;
    }

    navigate("/paiement", {
      state: {
        panier,
        total,
      },
    });
  }

  return (
    <main className={styles.page}>
      <header className={styles.entete}>
        <div>
          <p className={styles.surtitre}>LA BOUTIQUE</p>
          <h1>Des essentiels, tout simplement.</h1>
          <p className={styles.intro}>
            Découvrez notre sélection de produits.
          </p>
        </div>

        <div className={styles.actionsEntete}>
          <Link className={styles.lienCompte} to="/compte">
            👤 Mon compte
          </Link>

          <a className={styles.lienPanier} href="#mon-panier">
            ♡ Panier ({nombreArticles})
          </a>
        </div>
      </header>

      {/* Barre de recherche */}
      <div className={styles.barreRecherche}>
        <span className={styles.iconeRecherche} aria-hidden="true">
          ⌕
        </span>

        <input
          type="search"
          placeholder="Rechercher un produit..."
          aria-label="Rechercher un produit"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />

        {recherche && (
          <button
            type="button"
            className={styles.effacerRecherche}
            onClick={() => setRecherche("")}
            aria-label="Effacer la recherche"
          >
            ✕
          </button>
        )}
      </div>

      <div className={styles.contenuCatalogue}>
        <aside className={styles.categories}>
          <h2>Catégories</h2>

          <button
            type="button"
            className={
              categorieActive === "Toutes"
                ? styles.categorieActive
                : ""
            }
            onClick={() => setCategorieActive("Toutes")}
          >
            Tous les produits
          </button>

          <button
            type="button"
            className={
              categorieActive === "Casques audio"
                ? styles.categorieActive
                : ""
            }
            onClick={() => setCategorieActive("Casques audio")}
          >
            🎧 Casques audio
          </button>

          <button
            type="button"  // Ajout du bouton pour la catégorie "Montres connectées"
            className={  
              categorieActive === "Montres connectées"
                ? styles.categorieActive
                : ""
            }
            onClick={() => setCategorieActive("Montres connectées")}
          >
            ⌚ Montres connectées
          </button>

          <button
            type="button" // Ajout du bouton pour la catégorie "Enceintes Bluetooth"
            className={
              categorieActive === "Enceintes Bluetooth"
                ? styles.categorieActive
                : ""
            }
            onClick={() =>
              setCategorieActive("Enceintes Bluetooth")
            }
          >
            🔊 Enceintes Bluetooth
          </button>
        </aside>

        <section className={styles.catalogue}>
          <div className={styles.titreSection}>
            <h2>
              {recherche.trim()
                ? "Résultats de recherche"
                : categorieActive === "Toutes"
                  ? "Notre sélection"
                  : categorieActive}
            </h2>

            <span>
              {produitsFiltres.length} produit(s)
            </span>
          </div>

          {produitsFiltres.length > 0 ? (
            <div className={styles.grille}>
              {produitsFiltres.map((produit) => (
                <article className={styles.carte} key={produit.id}>
                  <div className={styles.imageWrapper}>
                    <img
                      className={styles.image}
                      src={produit.image}
                      alt={produit.nom}
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.infos}>
                    <h3>{produit.nom}</h3>

                    <p className={styles.description}>
                      {produit.description}
                    </p>

                    <div className={styles.basCarte}>
                      <strong>{euro(produit.prix)}</strong>

                      <button
                        type="button"
                        onClick={() => ajouterAuPanier(produit)}
                      >
                        + Ajouter
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.aucunResultat}>
              Aucun produit trouvé pour « {recherche} ».
              <button
                type="button"
                onClick={() => {
                  setRecherche("");
                  setCategorieActive("Toutes");
                }}
              >
                Afficher tous les produits
              </button>
            </p>
          )}
        </section>
      </div>

      <section className={styles.panier} id="mon-panier">
        <div className={styles.titreSection}>
          <h2>Mon panier</h2>
          <span>{nombreArticles} article(s)</span>
        </div>

        {panier.length === 0 ? (
          <p className={styles.vide}>
            Votre panier est vide. Ajoutez un produit pour commencer.
          </p>
        ) : (
          <>
            <div className={styles.listePanier}>
              {panier.map((item) => (
                <div className={styles.lignePanier} key={item.id}>
                  <div className={styles.detailsPanier}>
                    <strong>{item.nom}</strong>
                    <span>{euro(item.prix)} l'unité</span>
                  </div>

                  <div className={styles.quantite}>
                    <button
                      type="button"
                      aria-label={`Retirer une unité de ${item.nom}`}
                      onClick={() => changerQuantite(item.id, -1)}
                    >
                      −
                    </button>

                    <span>{item.quantite}</span>

                    <button
                      type="button"
                      aria-label={`Ajouter une unité de ${item.nom}`}
                      onClick={() => changerQuantite(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <strong>
                    {euro(item.prix * item.quantite)}
                  </strong>
                </div>
              ))}
            </div>

            <div className={styles.total}>
              <span>Total</span>
              <strong>{euro(total)}</strong>
            </div>

            <button
              type="button"
              onClick={passerAuPaiement}
            >
              Passer au paiement
            </button>

            <p className={styles.note}>
              Ceci est un panier de démonstration. Aucun paiement
              n'est effectué.
            </p>
          </>
        )}
      </section>

      <footer className={styles.pied}>
        © {new Date().getFullYear()} La Boutique
      </footer>
    </main>
  );
}