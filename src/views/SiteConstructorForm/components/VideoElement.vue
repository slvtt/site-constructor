<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { VideoData } from '@/views/SiteConstructorForm/types.ts'

const props = defineProps<{ modelValue: VideoData }>()
const emit = defineEmits<{ 'update:modelValue': [value: VideoData] }>()

const local = reactive({ ...props.modelValue })

watch(local, (val) => emit('update:modelValue', { ...val }))
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>Видео</p>
    <div class="flex flex-col gap-2">
      <UInput v-model="local.url" placeholder="Ссылка на видео" />
      <p>или</p>
      <UFileUpload
        layout="list"
        label="Перетащите ваше видео сюда"
        description="MP4, MOV (max. 1GB)"
        class="w-70"
        :ui="{ base: 'min-h-12' }"
      />
    </div>
  </div>
</template>
