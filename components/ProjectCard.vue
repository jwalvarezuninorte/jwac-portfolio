<script setup>
const { project } = defineProps(["project"]);
</script>

<template>
  <div
    class="flex flex-col justify-start bg-gray-50 bg-opacity-5 p-4 rounded-3xl border-2 border-gray-50 border-opacity-10 backdrop-blur-sm"
  >
    <img
      class="rounded-2xl object-cover w-full mb-4"
      :src="project.image"
      alt=""
    />

    <h3 class="text-lg text-left font-bold">{{ project.title }}</h3>
    <div class="flex gap-2">
      <a
        :key="tag"
        v-for="tag in project.expand.tags"
        class="text-secondary font-bold text-sm text-left"
      >
        #{{ tag.name }}
      </a>
    </div>
    <p class="text-sm text-left mt-2">
      {{ project.description }}
    </p>
    <button class="btn btn-secondary btn-ghost normal-case mt-4">
      <NuxtLink :to="'/projects/' + project.id">
        Read more about this
      </NuxtLink>
    </button>
  </div>
</template>
