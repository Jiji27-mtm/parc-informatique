import { ref, watch } from 'vue'

// nom de la clé dans le localStorage
const CLE_STOCKAGE = 'parc-ordinateurs'

// les ordinateurs d'exemple (utilisés seulement à la première utilisation)
const exemples = [
  { id: 1, modele: 'Dell Latitude 5540', processeur: 'Intel Core i5', memoire: 16, disque: 512, carteGraphique: 'Intel Iris Xe', photo: 'dell.jpg' },
  { id: 2, modele: 'HP ProBook 450 G10', processeur: 'Intel Core i7', memoire: 32, disque: 1000, carteGraphique: 'NVIDIA GeForce MX', photo: 'hp.jpg' },
  { id: 3, modele: 'Lenovo ThinkPad E14', processeur: 'AMD Ryzen 5', memoire: 16, disque: 512, carteGraphique: 'Radeon Graphics', photo: 'lenovo.jpg' },
  { id: 4, modele: 'ASUS TUF Gaming F15', processeur: 'Intel Core i7', memoire: 32, disque: 1000, carteGraphique: 'NVIDIA GeForce RTX', photo: 'asus.jpg' },
  { id: 5, modele: 'Acer Aspire 5', processeur: 'Intel Core i5', memoire: 8, disque: 256, carteGraphique: 'Intel UHD Graphics', photo: 'acer.jpg' }
]

// on regarde s'il y a déjà des données sauvegardées
const texteSauvegarde = localStorage.getItem(CLE_STOCKAGE)
const premiereUtilisation = texteSauvegarde === null

function charger() {
  if (premiereUtilisation) {
    return exemples
  }
  try {
    return JSON.parse(texteSauvegarde)
  } catch (e) {
    return exemples
  }
}

// le tableau partagé entre les deux pages
export const ordinateurs = ref(charger())

function sauvegarder() {
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(ordinateurs.value))
}

// à la première utilisation, on enregistre tout de suite les exemples
if (premiereUtilisation) {
  sauvegarder()
}

// à chaque changement du tableau, on sauvegarde
watch(ordinateurs, sauvegarder, { deep: true })

// cherche un ordinateur grâce à son id
export function trouverOrdinateur(id) {
  return ordinateurs.value.find((o) => o.id === id)
}

export function ajouterOrdinateur(donnees) {
  // Date.now() donne un identifiant unique
  ordinateurs.value.push({ ...donnees, id: Date.now() })
}

export function modifierOrdinateur(donnees) {
  const position = ordinateurs.value.findIndex((o) => o.id === donnees.id)
  if (position !== -1) {
    ordinateurs.value[position] = donnees
  }
}

export function supprimerOrdinateur(id) {
  ordinateurs.value = ordinateurs.value.filter((o) => o.id !== id)
}

// image grise affichée quand la photo est introuvable
export const imageVide =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180">' +
      '<rect width="300" height="180" fill="#e5e7eb"/>' +
      '<text x="150" y="95" font-size="20" text-anchor="middle" fill="#6b7280" font-family="Arial">Pas d\'image</text>' +
      '</svg>'
  )

// renvoie l'adresse utilisable dans <img> à partir du champ photo
export function urlImage(photo) {
  if (!photo) {
    return imageVide
  }
  // adresse internet ou image choisie sur l'ordinateur
  if (photo.startsWith('http') || photo.startsWith('data:')) {
    return photo
  }
  // sinon c'est un nom de fichier dans src/assets/images
  return new URL(`../assets/images/${photo}`, import.meta.url).href
}
