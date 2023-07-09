<script setup>
const showHomeToast = useState("showHomeToast", () => false);

setTimeout(() => {
  showHomeToast.value = true;
}, 4000);
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <h1 class="text-4xl text-secondary">Projects</h1>
    <div v-show="showHomeToast" class="toast toast-center w-full">
      <button
        @click="showHomeToast = false"
        class="absolute btn btn-secondary btn-circle btn-sm top-2 right-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div class="alert alert-base">
        <span>
          You have an idea <br />
          I make real
        </span>
        <NuxtLink to="/contact" class="btn btn-primary w-full normal-case">
          I have an idea, let's talk!
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
