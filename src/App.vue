<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <UApp>
    <div class="flex flex-col gap-4 w-full h-screen">
      <header>
        <h1>Simple site constructor</h1>
      </header>
      <RouterView />
    </div>
  </UApp>
</template>
