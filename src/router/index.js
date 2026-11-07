import { createRouter, createWebHistory } from 'vue-router'
import ListeOrdinateurs from '../views/ListeOrdinateurs.vue'
import EditOrdinateur from '../views/EditOrdinateur.vue'

const routes = [
  // la page d'accueil renvoie vers la liste
  { path: '/', redirect: '/ordinateurs' },
  { path: '/ordinateurs', component: ListeOrdinateurs },
  // la même page sert pour l'ajout et la modification
  { path: '/ordinateurs/ajouter', component: EditOrdinateur },
  { path: '/ordinateurs/modifier/:id', component: EditOrdinateur }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
