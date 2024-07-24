<template>
  <q-page class="q-pa-md">
    <q-list bordered>
      <q-item v-for="user in users" :key="user.id" clickable>
        <q-item-section avatar>
          <q-avatar :size="'50'">
            <img :src="user.avatar" alt="User Avatar" />
            <q-icon
              :name="user.online ? 'circle' : 'circle-off'"
              class="status-icon"
              :class="{ 'online': user.online, 'offline': !user.online }"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <strong>{{ user.name }}</strong>
          </q-item-label>
          <q-item-label caption>{{ user.lastMessage }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chevron-right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
  name: 'EssentialLink'
})

const users = ref([
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/50?img=1',
    lastMessage: 'Hey, how are you?',
    online: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/50?img=2',
    lastMessage: 'See you soon!',
    online: false,
  },
]);
</script>

<style scoped>
.status-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;
  font-size: 14px;
}

.online {
  color: green;
}

.offline {
  color: gray;
}

.q-avatar {
  position: relative;
}
</style>

