<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { DescriptionData } from '@/views/SiteConstructorForm/types.ts'

const props = defineProps<{ modelValue: DescriptionData }>()
const emit = defineEmits<{ 'update:modelValue': [value: DescriptionData] }>()

const local = reactive({ ...props.modelValue })

watch(local, (val) => emit('update:modelValue', { ...val }))
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>Описание</p>
    <UTextarea v-model="local.text" placeholder="Введите описание раздела" class="w-full" />
  </div>
</template>
