# Parc informatique

Application Vue.js 3 (Vite + Vue Router) pour consulter, ajouter, modifier et
supprimer des ordinateurs. Les données sont sauvegardées dans le localStorage
du navigateur (pas de serveur, pas de base de données).

## Fonctionnalités

- Liste des ordinateurs sous forme de cartes (photo + caractéristiques)
- Ajout et modification avec un même formulaire
- Suppression avec confirmation
- Validation : modèle et processeur obligatoires, mémoire et disque > 0
- Sauvegarde automatique dans le localStorage
- Bonus : recherche, compteur, tri par mémoire

## Installation et lancement

```
npm install
npm run dev
```

Ouvrir ensuite http://localhost:5173 dans le navigateur.

## Pages

| Route | Page |
|---|---|
| /ordinateurs | Liste |
| /ordinateurs/ajouter | Ajout |
| /ordinateurs/modifier/:id | Modification |

## Structure

- src/data/ordinateurs.js : données, localStorage et fonctions
- src/components/OrdinateurCard.vue : carte d'un ordinateur (props + emit)
- src/views/ListeOrdinateurs.vue : page liste
- src/views/EditOrdinateur.vue : page ajout / modification
- src/router/index.js : routes
- src/assets/images/ : photos des ordinateurs
- screenshots/ : captures d'écran
