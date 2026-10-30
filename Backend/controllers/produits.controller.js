// Importe la connexion à la base SQLite depuis db.js
// ("../" remonte d'un dossier : on sort de controllers/ pour atteindre la racine)
import { db } from "../db.js";

// Fonction exportée : appelée par la route GET /api/produits
// req = requête reçue (inutilisée ici), res = réponse à renvoyer
export function listerProduits(req, res) {
  // Récupère les produits dans la base et les stocke dans la variable "produits"
const produits = db
    // Prépare la requête SQL : sélectionne id, nom et prix,
    // triés par nom dans l'ordre alphabétique
    .prepare("SELECT id, nom, prix FROM produits ORDER BY nom")
    // .all() exécute la requête et renvoie toutes les lignes
    // sous forme de tableau d'objets : [{ id, nom, prix }, ...]
    .all();
  // Envoie le tableau au client au format JSON (code HTTP 200 par défaut)
res.json(produits);
}