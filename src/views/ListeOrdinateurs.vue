<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import OrdinateurCard from '../components/OrdinateurCard.vue'
import { ordinateurs, supprimerOrdinateur } from '../data/ordinateurs.js'

const router = useRouter()

// bonus : recherche et tri
const recherche = ref('')
const tri = ref('aucun')

// la liste affichée : filtrée puis triée
const listeAffichee = computed(() => {
  const texte = recherche.value.toLowerCase()

  let liste = ordinateurs.value.filter((o) => {
    return (
      o.modele.toLowerCase().includes(texte) ||
      o.processeur.toLowerCase().includes(texte)
    )
  })

  // [...liste] fait une copie pour ne pas changer l'ordre du tableau d'origine
  if (tri.value === 'croissant') {
    liste = [...liste].sort((a, b) => a.memoire - b.memoire)
  } else if (tri.value === 'decroissant') {
    liste = [...liste].sort((a, b) => b.memoire - a.memoire)
  }

  return liste
})

function allerAjouter() {
  router.push('/ordinateurs/ajouter')
}

function allerModifier(id) {
  router.push('/ordinateurs/modifier/' + id)
}

function supprimer(id) {
  // on demande confirmation avant de supprimer
  if (confirm('Voulez-vous vraiment supprimer cet ordinateur ?')) {
    supprimerOrdinateur(id)
  }
}
</script>

<template>
  <div>
    <header class="entete">
      <div>
        <h1>Parc informatique</h1>
        <small>Gestion des ordinateurs</small>
      </div>
      <button class="btn-ajouter" @click="allerAjouter">+ Ajouter un ordinateur</button>
    </header>

    <main class="contenu">
      <div class="outils">
        <input v-model="recherche" type="text" placeholder="Rechercher un modèle ou un processeur" />
        <select v-model="tri">
          <option value="aucun">Pas de tri</option>
          <option value="croissant">Mémoire croissante</option>
          <option value="decroissant">Mémoire décroissante</option>
        </select>
        <span>{{ listeAffichee.length }} ordinateur(s)</span>
      </div>

      <p v-if="listeAffichee.length === 0">Aucun ordinateur à afficher.</p>

      <div class="grille">
        <OrdinateurCard
          v-for="o in listeAffichee"
          :key="o.id"
          :ordinateur="o"
          @modifier="allerModifier"
          @supprimer="supprimer"
        />
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

.btn-ajouter {
  background-color: #16a34a;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 16px;
  cursor: pointer;
}

.contenu {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.outils {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.outils input {
  flex: 1;
  min-width: 200px;
  padding: 8px;
}

.outils select {
  padding: 8px;
}

.grille {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 16px;
}
</style>
