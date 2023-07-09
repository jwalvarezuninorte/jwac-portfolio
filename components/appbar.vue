<template>
  <div class="sticky z-50 w-full bg-secondary text-center py-2">
    <span class="text-sm font-normal text-base-300 text-opacity-70">
      Get a
      <span class="font-black"> FREE </span>
      quote for your project
      <button class="btn btn-sm normal-case ml-2">Contact me</button>
    </span>
  </div>
  <div
    class="sticky top-0 z-50 px-4 md:px-20 lg:px-40 navbar bg-base-100 bg-opacity-60 backdrop-blur-md"
  >
    <div class="navbar-start">
      <a class="btn btn-ghost normal-case text-xl">
        <NuxtLink to="/">@jwalvarez</NuxtLink>
      </a>
    </div>

    <!-- TODO: try to optimeze this -->
    <div class="navbar-end hidden md:block">
      <ul class="menu menu-horizontal">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/projects">Projects</NuxtLink></li>
        <li><NuxtLink to="/contact">Contact</NuxtLink></li>
      </ul>
    </div>

    <!-- TODO: and this -->
    <div class="navbar-end md:hidden">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu dropdown-content mt-3 z-[1] p-2 shadow w-52 rounded-xl font-bold backdrop-blur-3xl"
        >
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/projects">Projects</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>
