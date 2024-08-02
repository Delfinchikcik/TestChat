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

          <q-icon   class="absolute-right q-ma-sm cursor-pointer" name="account_circle" size="34px"
          @click="goAuth"/>
      </q-toolbar>
    </q-header>

    <q-page-container class="main_container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useChatStore } from 'src/stores/chatStore';

const title = ref('');
const route = useRoute();
const router = useRouter()
const chatStore = useChatStore();

watchEffect(() => {
  const currentPath = route.fullPath;
  if (currentPath === '/') {
    title.value = 'UseGramm';
  } else if (currentPath === '/chat') {
    title.value = chatStore.secondUserName;
  } else if (currentPath === '/auth') {
    title.value = 'Авторизация';}

});
const goAuth = () => {
  router.push('/auth')
}
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
