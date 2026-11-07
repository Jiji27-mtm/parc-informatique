<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  trouverOrdinateur,
  ajouterOrdinateur,
  modifierOrdinateur,
  urlImage,
  imageVide
} from '../data/ordinateurs.js'

const route = useRoute()
const router = useRouter()

// si l'adresse contient un :id, on est en mode modification
const estModification = computed(() => route.params.id !== undefined)

// les champs du formulaire (vides en mode ajout)
const formulaire = ref({
  modele: '',
  processeur: '',
  memoire: '',
  disque: '',
  carteGraphique: '',
  photo: ''
})

const erreurs = ref([])
const imageEnErreur = ref(false)

// en mode modification, on remplit le formulaire avec l'ordinateur existant
if (estModification.value) {
  const existant = trouverOrdinateur(Number(route.params.id))
  if (existant) {
    formulaire.value = { ...existant }
  } else {
    router.push('/ordinateurs')
  }
}

// vrai si l'image vient d'un fichier choisi sur l'ordinateur
const photoImportee = computed(() => formulaire.value.photo.startsWith('data:'))

const apercu = computed(() => {
  if (imageEnErreur.value) {
    return imageVide
  }
  return urlImage(formulaire.value.photo)
})

// bouton « Choisir une image »
function choisirImage(event) {
  const fichier = event.target.files[0]
  if (!fichier) {
    return
  }
  // on limite la taille car le localStorage est petit
  if (fichier.size > 500 * 1024) {
    alert('Image trop grande (500 Ko maximum).')
    return
  }
  const lecteur = new FileReader()
  lecteur.onload = () => {
    formulaire.value.photo = lecteur.result
    imageEnErreur.value = false
  }
  lecteur.readAsDataURL(fichier)
}

function retirerImage() {
  formulaire.value.photo = ''
}

// vérifie les champs et remplit la liste des erreurs
function valider() {
  erreurs.value = []

  if (formulaire.value.modele.trim() === '') {
    erreurs.value.push('Le modèle est obligatoire.')
  }
  if (formulaire.value.processeur.trim() === '') {
    erreurs.value.push('Le processeur est obligatoire.')
  }
  if (!(Number(formulaire.value.memoire) > 0)) {
    erreurs.value.push('La mémoire doit être un nombre supérieur à 0.')
  }
  if (!(Number(formulaire.value.disque) > 0)) {
    erreurs.value.push('Le disque doit être un nombre supérieur à 0.')
  }

  return erreurs.value.length === 0
}

function enregistrer() {
  if (!valider()) {
    return
  }

  // on transforme la mémoire et le disque en nombres
  const donnees = {
    ...formulaire.value,
    memoire: Number(formulaire.value.memoire),
    disque: Number(formulaire.value.disque)
  }

  if (estModification.value) {
    modifierOrdinateur(donnees)
  } else {
    ajouterOrdinateur(donnees)
  }

  // après la validation, on retourne à la liste
  router.push('/ordinateurs')
}

function annuler() {
  router.push('/ordinateurs')
}
</script>

<template>
  <div>
    <header class="entete">
      <h1>{{ estModification ? 'Modifier un ordinateur' : 'Ajouter un ordinateur' }}</h1>
      <button class="btn-retour" @click="annuler">← Retour à la liste</button>
    </header>

    <main class="contenu">
      <div class="gauche">
        <img :src="apercu" alt="Aperçu" @error="imageEnErreur = true" />
        <label class="btn-fichier">
          Choisir une image
          <input type="file" accept="image/*" @change="choisirImage" hidden />
        </label>
        <small>(ou indiquer un nom de fichier)</small>
      </div>

      <div class="droite">
        <ul v-if="erreurs.length > 0" class="erreurs">
          <li v-for="e in erreurs" :key="e">{{ e }}</li>
        </ul>

        <label>Modèle *</label>
        <input v-model="formulaire.modele" type="text" />

        <label>Processeur *</label>
        <input v-model="formulaire.processeur" type="text" />

        <div class="deux-colonnes">
          <div>
            <label>Mémoire (Go) *</label>
            <input v-model="formulaire.memoire" type="number" min="1" />
          </div>
          <div>
            <label>Disque (Go) *</label>
            <input v-model="formulaire.disque" type="number" min="1" />
          </div>
        </div>

        <label>Carte graphique</label>
        <input v-model="formulaire.carteGraphique" type="text" />

        <label>Photo (nom ou chemin)</label>
        <p v-if="photoImportee" class="info">
          Image choisie sur l'ordinateur
          <button type="button" @click="retirerImage">Retirer</button>
        </p>
        <input v-else v-model="formulaire.photo" type="text" placeholder="dell.jpg" />

        <div class="boutons">
          <button class="btn-annuler" @click="annuler">Annuler</button>
          <button class="btn-enregistrer" @click="enregistrer">Enregistrer</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.entete {
  background-color: #1565c0;
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
  font-size: 22px;
}

.btn-retour {
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 14px;
  cursor: pointer;
}

.contenu {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.gauche {
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.gauche img {
  width: 100%;
  height: 160px;
  object-fit: contain;
}

.btn-fichier {
  background-color: #e5e7eb;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.droite {
  flex: 1;
  min-width: 260px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  font-size: 14px;
  margin: 10px 0 4px;
}

input[type='text'],
input[type='number'] {
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

.deux-colonnes {
  display: flex;
  gap: 12px;
}

.deux-colonnes > div {
  flex: 1;
}

.erreurs {
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 10px 10px 10px 28px;
  border-radius: 5px;
  margin: 0;
  font-size: 14px;
}

.info {
  margin: 0;
  font-size: 14px;
}

.boutons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.boutons button {
  padding: 10px 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-annuler {
  background-color: #e5e7eb;
}

.btn-enregistrer {
  background-color: #1d6fd8;
  color: white;
}
</style>
