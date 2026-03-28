<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { ImageData } from '@/views/SiteConstructorForm/types.ts'

const props = defineProps<{ modelValue: ImageData }>()
const emit = defineEmits<{ 'update:modelValue': [value: ImageData] }>()

const local = reactive<ImageData>({ ...props.modelValue })

watch(local, (val: ImageData) => emit('update:modelValue', { title: val.title, link: val.link }))
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>Загрузить баннер</p>
    <UInput v-model="local.title" placeholder="Название баннера" />
    <UInput v-model="local.link" placeholder="Ссылка по клику" />
    <UFileUpload
      layout="list"
      label="Drop your images here"
      description="SVG, PNG, JPG or GIF (max. 2MB)"
      class="w-70"
      :ui="{ base: 'min-h-12' }"
    />
  </div>
</template>
