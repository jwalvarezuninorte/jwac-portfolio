<script setup>
import {useState} from "#app";

const {data: data} = await useFetch('https://dev-portfolio-be.pockethost.io/api/collections/projects/records?expand=tags&filter=is_top_project=true')
const topProjects = data;

const whyPeopleLoveMyWork = [
  {
    emoji: "🚀",
    title: "Fast",
    description:
        "Fast load times and lag free interaction, my highest priority.",
  },
  {
    emoji: "📱",
    title: "Responsive",
    description: "My layouts will work on any device, big or small.",
  },
  {
    emoji: "💎",
    title: "Intuitive",
    description: "Strong preference for easy to use, intuitive UX/UI.",
  },
  {
    emoji: "📚",
    title: "Dynamic",
    description:
        "Websites don't have to be static, I love making pages come to life.",
  },
];

const formState = useState('formState', () => ({
  email: '',
  message: '',
  receive_emails: false,
}));

const emailStatus = useState('emailStatus', () => ({
  error: null,
  message: '',
  loading: false,
}))


const sendMessage = async () => {
  emailStatus.value.loading = true;
  try {
    const response = await useFetch('https://dev-portfolio-be.pockethost.io/api/collections/email_messages/records', {
      method: 'POST',
      body: {
        'email': formState.value.email,
        'message': formState.value.message,
        'receive_emails': formState.value.receive_emails,
      }
    })
    if (response.status.value === 'error') {
      emailStatus.value = {
        error: true,
        message: 'There was an error trying to send message.',
        loading: false,
      };
      return;
    }
    emailStatus.value = {
      error: false,
      message: 'You will receive response in less than 24 hours 🎉',
      loading: false,
    };
  } catch (e) {
    emailStatus.value = {
      error: true,
      message: 'There was an unexpected error trying to send message.',
      loading: false,
    };
  }
}
</script>

<template>
  <div>
    <!-- svg background -->
    <div
        class="absolute bottom-[340px] right-32 md:right-[35%] z-0 animate-pulse"
    >
      <svg
          viewBox="0 0 2000 2000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-32 h-32 md:w-56 md:h-56 object-cover fill-pink-400"
      >
        <circle cx="1000" cy="1000" r="1000"/>
      </svg>
    </div>

    <div class="magicpattern absolute z-10 w-full opacity-40"></div>

    <div class="absolute bottom-1/4 md:right-1/2 z-0 opacity-90">
      <svg
          viewBox="0 0 2000 2000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-56 h-5w-56 md:w-80 md:h-80 object-cover fill-secondary"
      >
        <circle cx="1000" cy="1000" r="1000"/>
      </svg>
    </div>

    <!-- hero -->
    <div
        class="hero min-h-screen bg-base-100 bg-opacity-80 backdrop-blur-3xl -translate-y-32 sm:-translate-y-32"
    >
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md flex flex-col gap-2">
          <h1 class="text-5xl font-bold">
            Hi, I'm
            <span class="text-secondary"> Jhon </span>
          </h1>
          <span class="text-md text-white text-opacity-60">
            Full Stack
            <span class="badge badge-lg badge-secondary font-semibold">
              Developer
            </span>
            with +3 year of experience
          </span>
        </div>
      </div>
      <a
          href="#q"
          class="btn btn-secondary btn-circle absolute bottom-0 mb-4 animate-bounce z-50"
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </a>
    </div>

    <!-- section -->
    <div
        id="q"
        class="h-screen flex flex-col justify-center items-center py-20 px-4 md:px-20 lg:px-40 text-center"
    >
      <h2 class="text-4xl text-secondary text-center">
        Why people <br/>
        love my work ✨
      </h2>

      <!-- some of my habilities -->
      <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
        <SimpleInfoCard
            :key="info.id"
            v-for="info in whyPeopleLoveMyWork"
            :info="info"
        ></SimpleInfoCard>
      </div>

      <span class="text-md text-white text-opacity-60">
        Full Stack
        <span class="badge badge-lg badge-secondary font-semibold">
          Developer
        </span>
        with +3 year of experience
      </span>

      <br/>

      <button class="btn btn-secondary normal-case w-full md:max-w-lg">
        Know more about me on social media
      </button>
    </div>

    <!-- top projects section -->
    <div
        id="projects-section"
        class="magicpattern h-screen flex flex-col justify-center items-center py-20 px-4 md:px-20 lg:px-40 text-center"
    >
      <h2 class="text-4xl text-secondary text-center">
        Some of my top <br/>
        projects 🚀
      </h2>

      <br/>

      <div
          class="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 my-10"
      >
        <ProjectCard
            :key="project.id"
            v-for="project in topProjects.items"
            :project="project"
        ></ProjectCard>
      </div>

      <br/>

      <button class="btn btn-secondary normal-case w-full md:max-w-lg">
        <NuxtLink to="/projects"> See more projects</NuxtLink>
      </button>
    </div>

    <!-- section -->
    <div
        id="marketing"
        class="h-screen relative flex flex-col justify-center py-20 px-4 md:px-20 lg:px-40 text-center text-black bg-gradient-to-br from-secondary to-cyan-200"
    >
      <h2 class="text-4xl text-center">
        Lets connect and <br/>
        make something great ✨
      </h2>

      <!-- mailchimp here -->
      <div
          v-show="emailStatus.error == null"
          class="w-full my-10 flex flex-col justify-center items-center gap-2"
      >

        <input
            v-model="formState.email"
            type="email"
            pattern=".+@globex\.com"
            placeholder="youremail@example.com*"
            class="input input-ghost w-full max-w-md text-center placeholder-neutral placeholder-opacity-50 border-1 border-neutral border-opacity-50 text-black focus:text-black focus:bg-black focus:bg-opacity-10"
        />

        <textarea
            v-model="formState.message"
            class="w-full max-w-md rounded-3xl text-center textarea textarea-ghost placeholder-neutral placeholder-opacity-50 border-1 border-neutral border-opacity-50 text-black focus:text-black focus:bg-black focus:bg-opacity-10"
            placeholder="Write your message here*"
        ></textarea>

        <div class="form-control w-full max-w-md">
          <label class="label cursor-pointer">
            <span class="label-text text-neutral font-bold">Receive promotional emails</span>
            <input v-model="formState.receive_emails" type="checkbox" class="toggle" checked/>
          </label>
        </div>

        <button
            v-show="emailStatus.error == null"
            :disabled="emailStatus.loading"
            @click="sendMessage"
            class="btn w-full md:w-1/4 max-w-md normal-case">
          {{ emailStatus.loading ? 'Sending message' : 'Send message' }}
          <span v-show="emailStatus.loading" class="loading loading-spinner loading-xs"/>
        </button>
      </div>

      <div class="w-full my-10 flex flex-col justify-center items-center">
        <div v-show="emailStatus.error != null"
             :class="(emailStatus.error ? 'bg-red-600 ' : 'bg-black bg-opacity-20 ') +'alert sm:flex sm:justify-between w-full max-w-md mb-8 border-none text-base-300'">
          <div>
            <h3 class="font-bold">
              {{ emailStatus.error ? 'Error :c' : 'Yeiii 🌈' }}
            </h3>
            <div class="text-xs">{{ emailStatus.message }}</div>
          </div>
          <button
              @click="emailStatus.error = null"
              class="btn btn-sm normal-case"
          >
            {{ emailStatus.error ? 'Try again' : 'Send another' }}
          </button>
        </div>
      </div>

      <div class="absolute left-0 bottom-0 w-full flex justify-center gap-6 -translate-y-20">
        <button class="btn btn-circle bg-black bg-opacity-10 border-none">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-twitter fill-neutral"
              viewBox="0 0 16 16"
          >
            <path
                d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
            />
          </svg>
        </button>

        <button class="btn btn-circle bg-black bg-opacity-10 border-none">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-github fill-neutral"
              viewBox="0 0 16 16"
          >
            <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
        </button>

        <button class="btn btn-circle bg-black bg-opacity-10 border-none">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-instagram fill-neutral"
              viewBox="0 0 16 16"
          >
            <path
                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

/* todo: verify free version of this font */
@font-face {
  font-family: "GelicaSemiBold";
  src: url("/public/fonts/GelicaSemiBold.woff2") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

html {
  scroll-behavior: smooth;
}

h1,
h2 {
  font-family: "GelicaSemiBold";
}

.font-poppins {
  font-family: "Poppins";
}

.magicpattern {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: repeat;
  background-image: url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 2000 1125%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cmask id=%22b%22 x=%220%22 y=%220%22 width=%222000%22 height=%221125%22%3E%3Cpath fill=%22url(%23a)%22 d=%22M0 0h2000v1125H0z%22%2F%3E%3C%2Fmask%3E%3Cg style=%22transform-origin:center center%22 stroke=%22%234c4e724d%22 stroke-width=%221.4%22 fill=%22none%22 mask=%22url(%23b)%22%3E%3Cpath d=%22M0 0h50v50H0zM50 0h50v50H50zM100 0h50v50h-50zM150 0h50v50h-50zM200 0h50v50h-50zM250 0h50v50h-50zM300 0h50v50h-50zM350 0h50v50h-50zM400 0h50v50h-50zM450 0h50v50h-50zM500 0h50v50h-50zM550 0h50v50h-50zM600 0h50v50h-50zM650 0h50v50h-50zM700 0h50v50h-50zM750 0h50v50h-50zM800 0h50v50h-50zM850 0h50v50h-50zM900 0h50v50h-50zM950 0h50v50h-50zM1000 0h50v50h-50zM1050 0h50v50h-50zM1100 0h50v50h-50zM1150 0h50v50h-50zM1200 0h50v50h-50zM1250 0h50v50h-50zM1300 0h50v50h-50zM1350 0h50v50h-50zM1400 0h50v50h-50zM1450 0h50v50h-50zM1500 0h50v50h-50zM1550 0h50v50h-50zM1600 0h50v50h-50zM1650 0h50v50h-50zM1700 0h50v50h-50zM1750 0h50v50h-50zM1800 0h50v50h-50zM1850 0h50v50h-50zM1900 0h50v50h-50zM1950 0h50v50h-50zM0 50h50v50H0zM50 50h50v50H50zM100 50h50v50h-50zM150 50h50v50h-50zM200 50h50v50h-50zM250 50h50v50h-50zM300 50h50v50h-50zM350 50h50v50h-50zM400 50h50v50h-50zM450 50h50v50h-50zM500 50h50v50h-50zM550 50h50v50h-50zM600 50h50v50h-50zM650 50h50v50h-50zM700 50h50v50h-50zM750 50h50v50h-50zM800 50h50v50h-50zM850 50h50v50h-50zM900 50h50v50h-50zM950 50h50v50h-50zM1000 50h50v50h-50zM1050 50h50v50h-50zM1100 50h50v50h-50zM1150 50h50v50h-50zM1200 50h50v50h-50zM1250 50h50v50h-50zM1300 50h50v50h-50zM1350 50h50v50h-50zM1400 50h50v50h-50zM1450 50h50v50h-50zM1500 50h50v50h-50zM1550 50h50v50h-50zM1600 50h50v50h-50zM1650 50h50v50h-50zM1700 50h50v50h-50zM1750 50h50v50h-50zM1800 50h50v50h-50zM1850 50h50v50h-50zM1900 50h50v50h-50zM1950 50h50v50h-50zM0 100h50v50H0zM50 100h50v50H50zM100 100h50v50h-50zM150 100h50v50h-50zM200 100h50v50h-50zM250 100h50v50h-50zM300 100h50v50h-50zM350 100h50v50h-50zM400 100h50v50h-50zM450 100h50v50h-50zM500 100h50v50h-50zM550 100h50v50h-50zM600 100h50v50h-50zM650 100h50v50h-50zM700 100h50v50h-50zM750 100h50v50h-50zM800 100h50v50h-50zM850 100h50v50h-50zM900 100h50v50h-50zM950 100h50v50h-50zM1000 100h50v50h-50zM1050 100h50v50h-50zM1100 100h50v50h-50zM1150 100h50v50h-50zM1200 100h50v50h-50zM1250 100h50v50h-50zM1300 100h50v50h-50zM1350 100h50v50h-50zM1400 100h50v50h-50zM1450 100h50v50h-50zM1500 100h50v50h-50zM1550 100h50v50h-50zM1600 100h50v50h-50zM1650 100h50v50h-50zM1700 100h50v50h-50zM1750 100h50v50h-50zM1800 100h50v50h-50zM1850 100h50v50h-50zM1900 100h50v50h-50zM1950 100h50v50h-50zM0 150h50v50H0zM50 150h50v50H50zM100 150h50v50h-50zM150 150h50v50h-50zM200 150h50v50h-50zM250 150h50v50h-50zM300 150h50v50h-50zM350 150h50v50h-50zM400 150h50v50h-50zM450 150h50v50h-50zM500 150h50v50h-50zM550 150h50v50h-50zM600 150h50v50h-50zM650 150h50v50h-50zM700 150h50v50h-50zM750 150h50v50h-50zM800 150h50v50h-50zM850 150h50v50h-50zM900 150h50v50h-50zM950 150h50v50h-50zM1000 150h50v50h-50zM1050 150h50v50h-50zM1100 150h50v50h-50zM1150 150h50v50h-50zM1200 150h50v50h-50zM1250 150h50v50h-50zM1300 150h50v50h-50zM1350 150h50v50h-50zM1400 150h50v50h-50zM1450 150h50v50h-50zM1500 150h50v50h-50zM1550 150h50v50h-50zM1600 150h50v50h-50zM1650 150h50v50h-50zM1700 150h50v50h-50zM1750 150h50v50h-50zM1800 150h50v50h-50zM1850 150h50v50h-50zM1900 150h50v50h-50zM1950 150h50v50h-50zM0 200h50v50H0zM50 200h50v50H50zM100 200h50v50h-50zM150 200h50v50h-50zM200 200h50v50h-50zM250 200h50v50h-50zM300 200h50v50h-50zM350 200h50v50h-50zM400 200h50v50h-50zM450 200h50v50h-50zM500 200h50v50h-50zM550 200h50v50h-50zM600 200h50v50h-50zM650 200h50v50h-50zM700 200h50v50h-50zM750 200h50v50h-50zM800 200h50v50h-50zM850 200h50v50h-50zM900 200h50v50h-50zM950 200h50v50h-50zM1000 200h50v50h-50zM1050 200h50v50h-50zM1100 200h50v50h-50zM1150 200h50v50h-50zM1200 200h50v50h-50zM1250 200h50v50h-50zM1300 200h50v50h-50zM1350 200h50v50h-50zM1400 200h50v50h-50zM1450 200h50v50h-50zM1500 200h50v50h-50zM1550 200h50v50h-50zM1600 200h50v50h-50zM1650 200h50v50h-50zM1700 200h50v50h-50zM1750 200h50v50h-50zM1800 200h50v50h-50zM1850 200h50v50h-50zM1900 200h50v50h-50zM1950 200h50v50h-50zM0 250h50v50H0zM50 250h50v50H50zM100 250h50v50h-50zM150 250h50v50h-50zM200 250h50v50h-50zM250 250h50v50h-50zM300 250h50v50h-50zM350 250h50v50h-50zM400 250h50v50h-50zM450 250h50v50h-50zM500 250h50v50h-50zM550 250h50v50h-50zM600 250h50v50h-50zM650 250h50v50h-50zM700 250h50v50h-50zM750 250h50v50h-50zM800 250h50v50h-50zM850 250h50v50h-50zM900 250h50v50h-50zM950 250h50v50h-50zM1000 250h50v50h-50zM1050 250h50v50h-50zM1100 250h50v50h-50zM1150 250h50v50h-50zM1200 250h50v50h-50zM1250 250h50v50h-50zM1300 250h50v50h-50zM1350 250h50v50h-50zM1400 250h50v50h-50zM1450 250h50v50h-50zM1500 250h50v50h-50zM1550 250h50v50h-50zM1600 250h50v50h-50zM1650 250h50v50h-50zM1700 250h50v50h-50zM1750 250h50v50h-50zM1800 250h50v50h-50zM1850 250h50v50h-50zM1900 250h50v50h-50zM1950 250h50v50h-50zM0 300h50v50H0zM50 300h50v50H50zM100 300h50v50h-50zM150 300h50v50h-50zM200 300h50v50h-50zM250 300h50v50h-50zM300 300h50v50h-50zM350 300h50v50h-50zM400 300h50v50h-50zM450 300h50v50h-50zM500 300h50v50h-50zM550 300h50v50h-50zM600 300h50v50h-50zM650 300h50v50h-50zM700 300h50v50h-50zM750 300h50v50h-50zM800 300h50v50h-50zM850 300h50v50h-50zM900 300h50v50h-50zM950 300h50v50h-50zM1000 300h50v50h-50zM1050 300h50v50h-50zM1100 300h50v50h-50zM1150 300h50v50h-50zM1200 300h50v50h-50zM1250 300h50v50h-50zM1300 300h50v50h-50zM1350 300h50v50h-50zM1400 300h50v50h-50zM1450 300h50v50h-50zM1500 300h50v50h-50zM1550 300h50v50h-50zM1600 300h50v50h-50zM1650 300h50v50h-50zM1700 300h50v50h-50zM1750 300h50v50h-50zM1800 300h50v50h-50zM1850 300h50v50h-50zM1900 300h50v50h-50zM1950 300h50v50h-50zM0 350h50v50H0zM50 350h50v50H50zM100 350h50v50h-50zM150 350h50v50h-50zM200 350h50v50h-50zM250 350h50v50h-50zM300 350h50v50h-50zM350 350h50v50h-50zM400 350h50v50h-50zM450 350h50v50h-50zM500 350h50v50h-50zM550 350h50v50h-50zM600 350h50v50h-50zM650 350h50v50h-50zM700 350h50v50h-50zM750 350h50v50h-50zM800 350h50v50h-50zM850 350h50v50h-50zM900 350h50v50h-50zM950 350h50v50h-50zM1000 350h50v50h-50zM1050 350h50v50h-50zM1100 350h50v50h-50zM1150 350h50v50h-50zM1200 350h50v50h-50zM1250 350h50v50h-50zM1300 350h50v50h-50zM1350 350h50v50h-50zM1400 350h50v50h-50zM1450 350h50v50h-50zM1500 350h50v50h-50zM1550 350h50v50h-50zM1600 350h50v50h-50zM1650 350h50v50h-50zM1700 350h50v50h-50zM1750 350h50v50h-50zM1800 350h50v50h-50zM1850 350h50v50h-50zM1900 350h50v50h-50zM1950 350h50v50h-50zM0 400h50v50H0zM50 400h50v50H50zM100 400h50v50h-50zM150 400h50v50h-50zM200 400h50v50h-50zM250 400h50v50h-50zM300 400h50v50h-50zM350 400h50v50h-50zM400 400h50v50h-50zM450 400h50v50h-50zM500 400h50v50h-50zM550 400h50v50h-50zM600 400h50v50h-50zM650 400h50v50h-50zM700 400h50v50h-50zM750 400h50v50h-50zM800 400h50v50h-50zM850 400h50v50h-50zM900 400h50v50h-50zM950 400h50v50h-50zM1000 400h50v50h-50zM1050 400h50v50h-50zM1100 400h50v50h-50zM1150 400h50v50h-50zM1200 400h50v50h-50zM1250 400h50v50h-50zM1300 400h50v50h-50zM1350 400h50v50h-50zM1400 400h50v50h-50zM1450 400h50v50h-50zM1500 400h50v50h-50zM1550 400h50v50h-50zM1600 400h50v50h-50zM1650 400h50v50h-50zM1700 400h50v50h-50zM1750 400h50v50h-50zM1800 400h50v50h-50zM1850 400h50v50h-50zM1900 400h50v50h-50zM1950 400h50v50h-50zM0 450h50v50H0zM50 450h50v50H50zM100 450h50v50h-50zM150 450h50v50h-50zM200 450h50v50h-50zM250 450h50v50h-50zM300 450h50v50h-50zM350 450h50v50h-50zM400 450h50v50h-50zM450 450h50v50h-50zM500 450h50v50h-50zM550 450h50v50h-50zM600 450h50v50h-50zM650 450h50v50h-50zM700 450h50v50h-50zM750 450h50v50h-50zM800 450h50v50h-50zM850 450h50v50h-50zM900 450h50v50h-50zM950 450h50v50h-50zM1000 450h50v50h-50zM1050 450h50v50h-50zM1100 450h50v50h-50zM1150 450h50v50h-50zM1200 450h50v50h-50zM1250 450h50v50h-50zM1300 450h50v50h-50zM1350 450h50v50h-50zM1400 450h50v50h-50zM1450 450h50v50h-50zM1500 450h50v50h-50zM1550 450h50v50h-50zM1600 450h50v50h-50zM1650 450h50v50h-50zM1700 450h50v50h-50zM1750 450h50v50h-50zM1800 450h50v50h-50zM1850 450h50v50h-50zM1900 450h50v50h-50zM1950 450h50v50h-50zM0 500h50v50H0zM50 500h50v50H50zM100 500h50v50h-50zM150 500h50v50h-50zM200 500h50v50h-50zM250 500h50v50h-50zM300 500h50v50h-50zM350 500h50v50h-50zM400 500h50v50h-50zM450 500h50v50h-50zM500 500h50v50h-50zM550 500h50v50h-50zM600 500h50v50h-50zM650 500h50v50h-50zM700 500h50v50h-50zM750 500h50v50h-50zM800 500h50v50h-50zM850 500h50v50h-50zM900 500h50v50h-50zM950 500h50v50h-50zM1000 500h50v50h-50zM1050 500h50v50h-50zM1100 500h50v50h-50zM1150 500h50v50h-50zM1200 500h50v50h-50zM1250 500h50v50h-50zM1300 500h50v50h-50zM1350 500h50v50h-50zM1400 500h50v50h-50zM1450 500h50v50h-50zM1500 500h50v50h-50zM1550 500h50v50h-50zM1600 500h50v50h-50zM1650 500h50v50h-50zM1700 500h50v50h-50zM1750 500h50v50h-50zM1800 500h50v50h-50zM1850 500h50v50h-50zM1900 500h50v50h-50zM1950 500h50v50h-50zM0 550h50v50H0zM50 550h50v50H50zM100 550h50v50h-50zM150 550h50v50h-50zM200 550h50v50h-50zM250 550h50v50h-50zM300 550h50v50h-50zM350 550h50v50h-50zM400 550h50v50h-50zM450 550h50v50h-50zM500 550h50v50h-50zM550 550h50v50h-50zM600 550h50v50h-50zM650 550h50v50h-50zM700 550h50v50h-50zM750 550h50v50h-50zM800 550h50v50h-50zM850 550h50v50h-50zM900 550h50v50h-50zM950 550h50v50h-50zM1000 550h50v50h-50zM1050 550h50v50h-50zM1100 550h50v50h-50zM1150 550h50v50h-50zM1200 550h50v50h-50zM1250 550h50v50h-50zM1300 550h50v50h-50zM1350 550h50v50h-50zM1400 550h50v50h-50zM1450 550h50v50h-50zM1500 550h50v50h-50zM1550 550h50v50h-50zM1600 550h50v50h-50zM1650 550h50v50h-50zM1700 550h50v50h-50zM1750 550h50v50h-50zM1800 550h50v50h-50zM1850 550h50v50h-50zM1900 550h50v50h-50zM1950 550h50v50h-50zM0 600h50v50H0zM50 600h50v50H50zM100 600h50v50h-50zM150 600h50v50h-50zM200 600h50v50h-50zM250 600h50v50h-50zM300 600h50v50h-50zM350 600h50v50h-50zM400 600h50v50h-50zM450 600h50v50h-50zM500 600h50v50h-50zM550 600h50v50h-50zM600 600h50v50h-50zM650 600h50v50h-50zM700 600h50v50h-50zM750 600h50v50h-50zM800 600h50v50h-50zM850 600h50v50h-50zM900 600h50v50h-50zM950 600h50v50h-50zM1000 600h50v50h-50zM1050 600h50v50h-50zM1100 600h50v50h-50zM1150 600h50v50h-50zM1200 600h50v50h-50zM1250 600h50v50h-50zM1300 600h50v50h-50zM1350 600h50v50h-50zM1400 600h50v50h-50zM1450 600h50v50h-50zM1500 600h50v50h-50zM1550 600h50v50h-50zM1600 600h50v50h-50zM1650 600h50v50h-50zM1700 600h50v50h-50zM1750 600h50v50h-50zM1800 600h50v50h-50zM1850 600h50v50h-50zM1900 600h50v50h-50zM1950 600h50v50h-50zM0 650h50v50H0zM50 650h50v50H50zM100 650h50v50h-50zM150 650h50v50h-50zM200 650h50v50h-50zM250 650h50v50h-50zM300 650h50v50h-50zM350 650h50v50h-50zM400 650h50v50h-50zM450 650h50v50h-50zM500 650h50v50h-50zM550 650h50v50h-50zM600 650h50v50h-50zM650 650h50v50h-50zM700 650h50v50h-50zM750 650h50v50h-50zM800 650h50v50h-50zM850 650h50v50h-50zM900 650h50v50h-50zM950 650h50v50h-50zM1000 650h50v50h-50zM1050 650h50v50h-50zM1100 650h50v50h-50zM1150 650h50v50h-50zM1200 650h50v50h-50zM1250 650h50v50h-50zM1300 650h50v50h-50zM1350 650h50v50h-50zM1400 650h50v50h-50zM1450 650h50v50h-50zM1500 650h50v50h-50zM1550 650h50v50h-50zM1600 650h50v50h-50zM1650 650h50v50h-50zM1700 650h50v50h-50zM1750 650h50v50h-50zM1800 650h50v50h-50zM1850 650h50v50h-50zM1900 650h50v50h-50zM1950 650h50v50h-50zM0 700h50v50H0zM50 700h50v50H50zM100 700h50v50h-50zM150 700h50v50h-50zM200 700h50v50h-50zM250 700h50v50h-50zM300 700h50v50h-50zM350 700h50v50h-50zM400 700h50v50h-50zM450 700h50v50h-50zM500 700h50v50h-50zM550 700h50v50h-50zM600 700h50v50h-50zM650 700h50v50h-50zM700 700h50v50h-50zM750 700h50v50h-50zM800 700h50v50h-50zM850 700h50v50h-50zM900 700h50v50h-50zM950 700h50v50h-50zM1000 700h50v50h-50zM1050 700h50v50h-50zM1100 700h50v50h-50zM1150 700h50v50h-50zM1200 700h50v50h-50zM1250 700h50v50h-50zM1300 700h50v50h-50zM1350 700h50v50h-50zM1400 700h50v50h-50zM1450 700h50v50h-50zM1500 700h50v50h-50zM1550 700h50v50h-50zM1600 700h50v50h-50zM1650 700h50v50h-50zM1700 700h50v50h-50zM1750 700h50v50h-50zM1800 700h50v50h-50zM1850 700h50v50h-50zM1900 700h50v50h-50zM1950 700h50v50h-50zM0 750h50v50H0zM50 750h50v50H50zM100 750h50v50h-50zM150 750h50v50h-50zM200 750h50v50h-50zM250 750h50v50h-50zM300 750h50v50h-50zM350 750h50v50h-50zM400 750h50v50h-50zM450 750h50v50h-50zM500 750h50v50h-50zM550 750h50v50h-50zM600 750h50v50h-50zM650 750h50v50h-50zM700 750h50v50h-50zM750 750h50v50h-50zM800 750h50v50h-50zM850 750h50v50h-50zM900 750h50v50h-50zM950 750h50v50h-50zM1000 750h50v50h-50zM1050 750h50v50h-50zM1100 750h50v50h-50zM1150 750h50v50h-50zM1200 750h50v50h-50zM1250 750h50v50h-50zM1300 750h50v50h-50zM1350 750h50v50h-50zM1400 750h50v50h-50zM1450 750h50v50h-50zM1500 750h50v50h-50zM1550 750h50v50h-50zM1600 750h50v50h-50zM1650 750h50v50h-50zM1700 750h50v50h-50zM1750 750h50v50h-50zM1800 750h50v50h-50zM1850 750h50v50h-50zM1900 750h50v50h-50zM1950 750h50v50h-50zM0 800h50v50H0zM50 800h50v50H50zM100 800h50v50h-50zM150 800h50v50h-50zM200 800h50v50h-50zM250 800h50v50h-50zM300 800h50v50h-50zM350 800h50v50h-50zM400 800h50v50h-50zM450 800h50v50h-50zM500 800h50v50h-50zM550 800h50v50h-50zM600 800h50v50h-50zM650 800h50v50h-50zM700 800h50v50h-50zM750 800h50v50h-50zM800 800h50v50h-50zM850 800h50v50h-50zM900 800h50v50h-50zM950 800h50v50h-50zM1000 800h50v50h-50zM1050 800h50v50h-50zM1100 800h50v50h-50zM1150 800h50v50h-50zM1200 800h50v50h-50zM1250 800h50v50h-50zM1300 800h50v50h-50zM1350 800h50v50h-50zM1400 800h50v50h-50zM1450 800h50v50h-50zM1500 800h50v50h-50zM1550 800h50v50h-50zM1600 800h50v50h-50zM1650 800h50v50h-50zM1700 800h50v50h-50zM1750 800h50v50h-50zM1800 800h50v50h-50zM1850 800h50v50h-50zM1900 800h50v50h-50zM1950 800h50v50h-50zM0 850h50v50H0zM50 850h50v50H50zM100 850h50v50h-50zM150 850h50v50h-50zM200 850h50v50h-50zM250 850h50v50h-50zM300 850h50v50h-50zM350 850h50v50h-50zM400 850h50v50h-50zM450 850h50v50h-50zM500 850h50v50h-50zM550 850h50v50h-50zM600 850h50v50h-50zM650 850h50v50h-50zM700 850h50v50h-50zM750 850h50v50h-50zM800 850h50v50h-50zM850 850h50v50h-50zM900 850h50v50h-50zM950 850h50v50h-50zM1000 850h50v50h-50zM1050 850h50v50h-50zM1100 850h50v50h-50zM1150 850h50v50h-50zM1200 850h50v50h-50zM1250 850h50v50h-50zM1300 850h50v50h-50zM1350 850h50v50h-50zM1400 850h50v50h-50zM1450 850h50v50h-50zM1500 850h50v50h-50zM1550 850h50v50h-50zM1600 850h50v50h-50zM1650 850h50v50h-50zM1700 850h50v50h-50zM1750 850h50v50h-50zM1800 850h50v50h-50zM1850 850h50v50h-50zM1900 850h50v50h-50zM1950 850h50v50h-50zM0 900h50v50H0zM50 900h50v50H50zM100 900h50v50h-50zM150 900h50v50h-50zM200 900h50v50h-50zM250 900h50v50h-50zM300 900h50v50h-50zM350 900h50v50h-50zM400 900h50v50h-50zM450 900h50v50h-50zM500 900h50v50h-50zM550 900h50v50h-50zM600 900h50v50h-50zM650 900h50v50h-50zM700 900h50v50h-50zM750 900h50v50h-50zM800 900h50v50h-50zM850 900h50v50h-50zM900 900h50v50h-50zM950 900h50v50h-50zM1000 900h50v50h-50zM1050 900h50v50h-50zM1100 900h50v50h-50zM1150 900h50v50h-50zM1200 900h50v50h-50zM1250 900h50v50h-50zM1300 900h50v50h-50zM1350 900h50v50h-50zM1400 900h50v50h-50zM1450 900h50v50h-50zM1500 900h50v50h-50zM1550 900h50v50h-50zM1600 900h50v50h-50zM1650 900h50v50h-50zM1700 900h50v50h-50zM1750 900h50v50h-50zM1800 900h50v50h-50zM1850 900h50v50h-50zM1900 900h50v50h-50zM1950 900h50v50h-50zM0 950h50v50H0zM50 950h50v50H50zM100 950h50v50h-50zM150 950h50v50h-50zM200 950h50v50h-50zM250 950h50v50h-50zM300 950h50v50h-50zM350 950h50v50h-50zM400 950h50v50h-50zM450 950h50v50h-50zM500 950h50v50h-50zM550 950h50v50h-50zM600 950h50v50h-50zM650 950h50v50h-50zM700 950h50v50h-50zM750 950h50v50h-50zM800 950h50v50h-50zM850 950h50v50h-50zM900 950h50v50h-50zM950 950h50v50h-50zM1000 950h50v50h-50zM1050 950h50v50h-50zM1100 950h50v50h-50zM1150 950h50v50h-50zM1200 950h50v50h-50zM1250 950h50v50h-50zM1300 950h50v50h-50zM1350 950h50v50h-50zM1400 950h50v50h-50zM1450 950h50v50h-50zM1500 950h50v50h-50zM1550 950h50v50h-50zM1600 950h50v50h-50zM1650 950h50v50h-50zM1700 950h50v50h-50zM1750 950h50v50h-50zM1800 950h50v50h-50zM1850 950h50v50h-50zM1900 950h50v50h-50zM1950 950h50v50h-50zM0 1000h50v50H0zM50 1000h50v50H50zM100 1000h50v50h-50zM150 1000h50v50h-50zM200 1000h50v50h-50zM250 1000h50v50h-50zM300 1000h50v50h-50zM350 1000h50v50h-50zM400 1000h50v50h-50zM450 1000h50v50h-50zM500 1000h50v50h-50zM550 1000h50v50h-50zM600 1000h50v50h-50zM650 1000h50v50h-50zM700 1000h50v50h-50zM750 1000h50v50h-50zM800 1000h50v50h-50zM850 1000h50v50h-50zM900 1000h50v50h-50zM950 1000h50v50h-50zM1000 1000h50v50h-50zM1050 1000h50v50h-50zM1100 1000h50v50h-50zM1150 1000h50v50h-50zM1200 1000h50v50h-50zM1250 1000h50v50h-50zM1300 1000h50v50h-50zM1350 1000h50v50h-50zM1400 1000h50v50h-50zM1450 1000h50v50h-50zM1500 1000h50v50h-50zM1550 1000h50v50h-50zM1600 1000h50v50h-50zM1650 1000h50v50h-50zM1700 1000h50v50h-50zM1750 1000h50v50h-50zM1800 1000h50v50h-50zM1850 1000h50v50h-50zM1900 1000h50v50h-50zM1950 1000h50v50h-50zM0 1050h50v50H0zM50 1050h50v50H50zM100 1050h50v50h-50zM150 1050h50v50h-50zM200 1050h50v50h-50zM250 1050h50v50h-50zM300 1050h50v50h-50zM350 1050h50v50h-50zM400 1050h50v50h-50zM450 1050h50v50h-50zM500 1050h50v50h-50zM550 1050h50v50h-50zM600 1050h50v50h-50zM650 1050h50v50h-50zM700 1050h50v50h-50zM750 1050h50v50h-50zM800 1050h50v50h-50zM850 1050h50v50h-50zM900 1050h50v50h-50zM950 1050h50v50h-50zM1000 1050h50v50h-50zM1050 1050h50v50h-50zM1100 1050h50v50h-50zM1150 1050h50v50h-50zM1200 1050h50v50h-50zM1250 1050h50v50h-50zM1300 1050h50v50h-50zM1350 1050h50v50h-50zM1400 1050h50v50h-50zM1450 1050h50v50h-50zM1500 1050h50v50h-50zM1550 1050h50v50h-50zM1600 1050h50v50h-50zM1650 1050h50v50h-50zM1700 1050h50v50h-50zM1750 1050h50v50h-50zM1800 1050h50v50h-50zM1850 1050h50v50h-50zM1900 1050h50v50h-50zM1950 1050h50v50h-50zM0 1100h50v50H0zM50 1100h50v50H50zM100 1100h50v50h-50zM150 1100h50v50h-50zM200 1100h50v50h-50zM250 1100h50v50h-50zM300 1100h50v50h-50zM350 1100h50v50h-50zM400 1100h50v50h-50zM450 1100h50v50h-50zM500 1100h50v50h-50zM550 1100h50v50h-50zM600 1100h50v50h-50zM650 1100h50v50h-50zM700 1100h50v50h-50zM750 1100h50v50h-50zM800 1100h50v50h-50zM850 1100h50v50h-50zM900 1100h50v50h-50zM950 1100h50v50h-50zM1000 1100h50v50h-50zM1050 1100h50v50h-50zM1100 1100h50v50h-50zM1150 1100h50v50h-50zM1200 1100h50v50h-50zM1250 1100h50v50h-50zM1300 1100h50v50h-50zM1350 1100h50v50h-50zM1400 1100h50v50h-50zM1450 1100h50v50h-50zM1500 1100h50v50h-50zM1550 1100h50v50h-50zM1600 1100h50v50h-50zM1650 1100h50v50h-50zM1700 1100h50v50h-50zM1750 1100h50v50h-50zM1800 1100h50v50h-50zM1850 1100h50v50h-50zM1900 1100h50v50h-50zM1950 1100h50v50h-50z%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CradialGradient id=%22a%22%3E%3Cstop offset=%220%22 stop-color=%22%23fff%22%2F%3E%3Cstop offset=%221%22 stop-color=%22%23fff%22 stop-opacity=%220%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}
</style>
