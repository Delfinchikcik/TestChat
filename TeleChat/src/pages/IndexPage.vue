<template>
  <div>
    <ClerkLoaded v-if="isLoaded">
    <q-list bordered>
      <q-item
        v-for="chat in userChats"
        :key="chat.id"
        class="q-my-sm"
        clickable
        v-ripple
        to="/chat"
        @click="currentRef(chat)"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ chatStore.getUserNameInitials(chat) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ chatStore.getUserName(chat) }}</q-item-label>
          <q-item-label caption lines="1">{{ chatStore.getUserEmail(chat) }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>
    </q-list>
  </ClerkLoaded>
  <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GETUSER_BY_ID } from 'src/queries/getUsers.js';
import { useSessionStore } from 'src/stores/sessionStore';
import { useChatStore } from 'src/stores/chatStore';
import { ClerkLoaded, useSignIn } from 'vue-clerk';

const sessionStore = useSessionStore();
const chatStore = useChatStore();
const {isLoaded, signIn} = useSignIn()

const initializeComponent = async () => {
  await sessionStore.fetchSession();
  const userId = sessionStore.user?.id;
  const token = sessionStore.token;
  console.log(userId, token);

  if (userId && token) {
    chatStore.setUserId(userId);
    chatStore.setToken(token);
    loadUserChats(userId, token);
  }
};

const loadUserChats = (userId, token) => {
  try {
    const { result, loading, error } = useQuery(GETUSER_BY_ID, { user_id: userId });
    watch(
      () => result.value,
      (newResult) => {
        if (!loading.value && newResult) {
          const chatData = newResult.chats ?? [];
          chatStore.setChats(chatData);
        } else if (loading.value) {
          console.log('Data is still loading...');
        } else if (error.value) {
          console.error('Error in query:', error.value);
        }
      },
      { immediate: true }
    );
  } catch (error) {
    console.error('Error loading user chats:', error);
  }
};

onMounted(() => {
  initializeComponent();
});

const currentRef = (chat) => {
  chatStore.getUserName(chat);
  chatStore.setCurrentChatID(chat)
}
const userChats = computed(() => chatStore.chats);

</script>
