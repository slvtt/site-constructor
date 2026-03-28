<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-2">
    <p>Загрузить баннер</p>
    <UInput placeholder="Название баннера" />
    <UInput placeholder="Ссылка по клику" />
    <UFileUpload
      layout="list"
      label="Drop your images here"
      description="SVG, PNG, JPG or GIF (max. 2MB)"
      class="w-70"
      :ui="{
        base: 'min-h-12',
      }"
    />
  </div>
</template>
