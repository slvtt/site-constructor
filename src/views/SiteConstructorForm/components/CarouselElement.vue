<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
</script>

<template>
  <div class="flex flex-col gap-4">
    <p>Carousel</p>
    <div class="flex flex-col gap-4">
      <UInput placeholder="Название карусели" v-model="inputValue" />
      <UFileUpload
        layout="list"
        multiple
        label="Drop your images here"
        description="SVG, PNG, JPG or GIF (max. 2MB)"
        class="w-70"
        :ui="{
          base: 'min-h-12',
        }"
      />
    </div>
  </div>
</template>
