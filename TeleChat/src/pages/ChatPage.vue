<template>
    <div style="width: 100%; max-width: 700px; height: 96vh"
    class="q-mx-auto bgc flex column">
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, index) in chatMessages"
        :key="index"
        :sent="message.sent"
        :text-color="message.textColor"
        :bg-color="message.bgColor"
      >
        <template v-slot:name>{{ message.name }}</template>
        <template v-slot:avatar>
          <img class="q-message-avatar" :src="message.avatar" />
        </template>
        <div>{{ message.text }}</div>
      </q-chat-message>
      <q-chat-message
        sent
        text-color="white"
        bg-color="primary"
        v-if="newMessageText"
        class="justify-end"
      >
        <template v-slot:name>me</template>
        <template v-slot:avatar>
          <img
            class="q-message-avatar q-message-avatar--sent"
            src="https://cdn.quasar.dev/img/avatar4.jpg"
          />
        </template>
        <q-spinner-dots size="2rem" />
      </q-chat-message>
    </div>

    <div class="q-pa-md bg-primary">
      <q-input
        dark
        standout
        v-model="newMessageText"
        class="q-ml-md input_area"
        placeholder="Введите ваше сообщение"
        @keyup.enter="sendMessage"
      >
        <template v-slot:append>
          <q-icon
            v-if="newMessageText"
            name="send"
            class="cursor-pointer"
            @click="sendMessage"
          />
        </template>
      </q-input>
    </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const newMessageText = ref("");
const chatMessages = ref([]);
const sendMessage = () => {
  if (newMessageText.value != "") {
    chatMessages.value.push({
      name: "me",
      avatar: "https://cdn.quasar.dev/img/avatar4.jpg",
      text: newMessageText.value,
      sent: true,
      textColor: "white",
      bgColor: "primary",
    });
    newMessageText.value = "";
  } else {
    let catcher = document.querySelector(".input_area");
    catcher.classList.add("shake");
    setTimeout(() => {
      catcher.classList.remove("shake");
    }, 1000);
  }
};
</script>

<style>
.bgc {
  background-image: url("https://i.pinimg.com/236x/1b/a4/c2/1ba4c2b5be1aa2bc1799a95fdd1a975e.jpg");
}
.input_area {
  border-radius: 20px;
  background-color: #726f6f;
}
.chat_icon {
  position: fixed;
  bottom: 14vh;
  right: 2vw;
  z-index: 2;
  width: 4vw;
  height: 2vw;
  box-shadow: 5px 5px 3px 3px rgb(163, 209, 240);
}
.shake {
  animation: shake 0.3s;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  50% {
    transform: translateX(5px);
  }

  75% {
    transform: translateX(-5px);
  }

  100% {
    transform: translateX(0);
  }
}
.input-area {
  position: fixed;
  bottom: 40px;
  min-height: 60px;
}
.input_area {
  min-width: 600px;
}
</style>
