<script setup>
const darkMode = useState("darkMode", () => true);
</script>
<template>
  <Head>
    <Title>Jhon Álvarez | Portfolio</Title>
    <Meta name="description" content="Personal portfolio" />
    <meta name="theme-color" content="#1db990" />
  </Head>
  <div :data-theme="darkMode ? 'forest' : 'emerald'">
    <AppBar />
    <slot />
  </div>
</template>
