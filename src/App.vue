<script setup>
</script>

<template>
  <!-- la clé force Vue à recréer la page quand l'adresse change -->
  <RouterView :key="$route.fullPath" />
</template>

<style>
body {
  margin: 0;
  background-color: #f3f4f6;
  font-family: Arial, sans-serif;
  color: #1f2937;
}
</style>
