<script setup>
const { info } = defineProps(["info"]);
</script>
<template>
  <NuxtLink :to="info.link">
    <div
      class="h-full text-center bg-gray-50 bg-opacity-5 px-4 py-8 rounded-3xl border-2 border-gray-50 border-opacity-10"
    >
      <span class="text-2xl"> {{ info.emoji }} </span>
      <h3 class="text-lg font-bold mb-2">{{ info.title }}</h3>
      <p class="text-sm">{{ info.description }}</p>
    </div>
  </NuxtLink>
</template>
