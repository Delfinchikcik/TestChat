<template>
  <div>

    <q-list bordered>
<q-item v-for="user in users" :key="user.user_id" class="q-my-sm" clickable v-ripple to="/chat">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.user_name }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ `${user.user_name}  ${user.user_last_name } `}}</q-item-label>
          <q-item-label caption lines="1">{{ }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>
      </q-list>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { USERS_QUERY } from 'src/queries/getUsers.js';

defineOptions({
  name: 'IndexPage'
});
const { result} = useQuery(USERS_QUERY);

const users = ref([]);

watchEffect(() => {
  if (result.value) {
    users.value = result.value.users;
  }
});
</script>
