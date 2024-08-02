// src/stores/chatStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chat', () => {
  const chats = ref([]);
  const userId = ref('');
  const tokenState = ref('');
const secondUserName = ref('')
const curentChatID = ref('')

  const initializeState = () => {
    const storedChats = localStorage.getItem('chats');
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');

    if (storedChats) {
      chats.value = JSON.parse(storedChats);
      console.log('Chats loaded from localStorage:', chats.value);
    }

    if (storedUserId) {
      userId.value = storedUserId;
    }
    if (storedToken) tokenState.value = storedToken;
  };

  const setChats = (newChats) => {
    chats.value = newChats;
    localStorage.setItem('chats', JSON.stringify(newChats));
    console.log('Chats saved to localStorage:', newChats);
  };

  const setCurrentChatID = (chat) =>{
    curentChatID.value = '';
    curentChatID.value = chat.id;
  }

  const setUserId = (newUserId) => {
    userId.value = newUserId;
    localStorage.setItem('userId', newUserId);
  };

  const setToken = (newToken) => {
    tokenState.value = newToken;
    localStorage.setItem('token', newToken);
  };

  const clearUserData = () => {
    userId.value = '';
    chats.value = [];
    localStorage.removeItem('chats');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  };

  const getUserName = (chat) => {
    secondUserName.value = ''
    if (!chat || !chat.user1_id || !chat.userByUser2Id || !chat.user) return '';
    return secondUserName.value = chat.user1_id === userId.value ? chat.userByUser2Id.user_name : chat.user.user_name;
  };

  const getUserNameInitials = (chat) => {
    const name = getUserName(chat);
    return name ? name.charAt(0) : '';
  };

  const getUserEmail = (chat) => {
    if (!chat || !chat.user1_id || !chat.userByUser2Id || !chat.user) return '';
    return chat.user1_id === userId.value ? chat.userByUser2Id.email : chat.user.email;
  };

  return {
    chats,
    userId,
    tokenState,
    secondUserName,
    curentChatID,
    initializeState,
    setChats,
    setCurrentChatID,
    setUserId,
    setToken,
    clearUserData,
    getUserName,
    getUserNameInitials,
    getUserEmail,
  };
});
