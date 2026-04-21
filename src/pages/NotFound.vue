<!-- views/NotFound.vue -->
<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the path "{{ $route.params.pathMatch }}" does not exist.</p>
    <router-link to="/">Go back home</router-link>
  </div>
</template>
