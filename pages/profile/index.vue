<template>
  <div>
    <h1>Profil</h1>
    <pre>{{ user }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const user = ref(null);

onMounted(async () => {
  const token = localStorage.getItem("token");
  // if (!token) return navigateTo("/login");

  try {
    const response = await fetch(`${useRuntimeConfig().public.baseUrl}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Unauthorized");

    const data = await response.json();
    user.value = data;
  } catch (e) {
    navigateTo("/login");
  }
});
</script>
