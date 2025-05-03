<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "blank",
});

const config = useRuntimeConfig();

const email = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
  try {
    const response = await fetch(`${config.public.baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("role", data.user.role);

    if (data.user.role === "superadmin") {
      navigateTo("/superadmin");
    } else if (data.user.role === "admin") {
      navigateTo("/admin");
    } else if (data.user.role === "user") {
      navigateTo("/");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
