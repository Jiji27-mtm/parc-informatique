<script setup>
import { ref, computed } from 'vue'
import { urlImage, imageVide } from '../data/ordinateurs.js'

// la carte reçoit un ordinateur par les props
const props = defineProps({
  ordinateur: { type: Object, required: true }
})

// et prévient la page parent avec des événements
const emit = defineEmits(['modifier', 'supprimer'])

// vrai si l'image n'a pas pu se charger
const imageEnErreur = ref(false)

const imageSrc = computed(() => {
  if (imageEnErreur.value) {
    return imageVide
  }
  return urlImage(props.ordinateur.photo)
})
</script>

<template>
  <div class="carte">
    <img :src="imageSrc" :alt="ordinateur.modele" @error="imageEnErreur = true" />

    <h3>{{ ordinateur.modele }}</h3>
    <p>Processeur : {{ ordinateur.processeur }}</p>
    <p>Mémoire : {{ ordinateur.memoire }} Go</p>
    <p>Disque : {{ ordinateur.disque }} Go</p>
    <p>Carte graphique : {{ ordinateur.carteGraphique }}</p>

    <div class="boutons">
      <button class="btn-modifier" @click="emit('modifier', ordinateur.id)">Modifier</button>
      <button class="btn-supprimer" @click="emit('supprimer', ordinateur.id)">Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
.carte {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
}

img {
  width: 100%;
  height: 140px;
  object-fit: contain;
}

h3 {
  margin: 10px 0 6px;
  font-size: 15px;
}

p {
  margin: 2px 0;
  font-size: 12px;
  color: #4b5563;
}

.boutons {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 10px;
}

.boutons button {
  flex: 1;
  padding: 7px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.btn-modifier {
  background-color: #1d6fd8;
}

.btn-supprimer {
  background-color: #dc2626;
}
</style>
