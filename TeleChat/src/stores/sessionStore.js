// src/stores/sessionStore.js
import { defineStore } from 'pinia';
import { useClerk } from 'vue-clerk';

export const useSessionStore = defineStore('session', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async fetchSession() {
      const { session } = useClerk();
      if (session) {
        const user = session.user;
        if (user) {
          this.user = user;
          this.token = await session.getToken({ template: 'HasuraTeleChat' });
        }
      }
    },
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
    },
  },
});
