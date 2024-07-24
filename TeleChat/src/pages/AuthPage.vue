<template>
  <q-page class="auth-page flex flex-center">
    <q-card class="auth-card">
      <q-card-section class="text-center">
        <q-avatar size="100px" class="q-mb-md">
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" alt="App Logo">
        </q-avatar>
        <div class="text-h5 q-mb-md">Добро пожаловать в UseGramm</div>
        <div class="text-subtitle2 q-mb-md">Авторизуйтесь для продолжения</div>
      </q-card-section>

      <SignedOut>
        <q-card-section class="q-mb-md">
          <q-btn 
            class="full-width q-pa-sm"
            label="Sign In"
            color="primary"
            @click="signIn"
          />
        </q-card-section>
      </SignedOut>

      <SignedIn>
        <q-card-section class="q-mb-md">
          <q-btn 
            class="full-width q-pa-sm"
            label="Go to Home"
            color="primary"
            @click="goToHome"
          />
        </q-card-section>
      </SignedIn>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { SignedIn, SignedOut } from 'vue-clerk';
import { useClerk } from 'vue-clerk';

const router = useRouter();
const { openSignIn, userProfile } = useClerk();

const signIn = () => {
  openSignIn({
    afterSignInUrl: '/',
  });
};

const goToHome = () => {
  router.push('/');
};
</script>

<style>
.auth-page {
  background-color: #f0f0f0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.full-width {
  width: 100%;
}

.q-btn {
  text-transform: none;
}

.q-avatar img {
  border-radius: 50%;
}
</style>
