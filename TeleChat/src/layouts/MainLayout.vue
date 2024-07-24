<template>
  <q-layout view="lHh Lpr lFf" class="bg_img">
    <q-header elevated>
      <q-toolbar class="main_header">
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          to="/"
          icon="arrow_back"
          flat
          dense
          label="Back"
        />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-icon class="absolute-right q-ma-sm" name="settings" size="34px" />
      </q-toolbar>
    </q-header>

    <q-page-container class="main_container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const title = ref('');
const route = useRoute();

watchEffect(() => {
  const currentPath = route.fullPath;
  if (currentPath === '/') {
    title.value = 'UseGramm';
  } else if (currentPath === '/chat') {
    title.value = 'Чат';
  } else if (currentPath === '/auth') {
    title.value = 'Авторизация';}

});
</script>

<style>
.main_container, .main_header {
  max-width: 1200px;
  margin: 0 auto;
}
/* .bg_img {
  background-image: url(../assets/bg.jpg);
} */
</style>
