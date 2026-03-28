<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>Видео</p>
    <div class="flex flex-col gap-2">
      <UInput placeholder="Название видео"/>
      <UInput placeholder="Ссылка на видео"/>
      <p>или</p>
      <UFileUpload
        layout="list"
        label="Перетащите ваше видео сюда"
        description="SVG, PNG, JPG or GIF (max. 1GB)"
        class="w-70"
        :ui="{
        base: 'min-h-12',
      }"
      />
    </div>
  </div>
</template>
