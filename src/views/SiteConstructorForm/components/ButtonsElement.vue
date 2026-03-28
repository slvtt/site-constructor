<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { ButtonData } from '@/views/SiteConstructorForm/types.ts'
import { BUTTONS_DISPLAY_OPTIONS } from '@/views/SiteConstructorForm/consts.ts'

const props = defineProps<{ modelValue: ButtonData }>()
const emit = defineEmits<{ 'update:modelValue': [value: ButtonData] }>()

const local = reactive({ ...props.modelValue, buttons: props.modelValue.buttons.map((b) => ({ ...b })) })

watch(local, (val) => emit('update:modelValue', { ...val, buttons: val.buttons.map((b) => ({ ...b })) }), { deep: true })

function addButton() {
  local.buttons.push({ name: '', url: '' })
}

function removeButton(index: number) {
  local.buttons.splice(index, 1)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>Кнопки</p>
    <div class="flex flex-col gap-2">
      <UInput v-model="local.buttonColor" type="color" placeholder="Цвет кнопки" />
      <USelect
        v-model="local.buttonDisplay"
        :items="BUTTONS_DISPLAY_OPTIONS"
        placeholder="Отображение кнопок"
      />
      <div
        v-for="(btn, index) in local.buttons"
        :key="index"
        class="flex gap-2 items-center"
      >
        <UInput v-model="btn.name" placeholder="Текст кнопки" class="flex-1" />
        <UInput v-model="btn.url" placeholder="Ссылка (опционально)" class="flex-1" />
        <UButton
          color="error"
          variant="ghost"
          size="sm"
          :disabled="local.buttons.length === 1"
          @click="removeButton(index)"
        >
          ✕
        </UButton>
      </div>
      <UButton variant="outline" size="sm" @click="addButton">+ Добавить кнопку</UButton>
    </div>
  </div>
</template>
