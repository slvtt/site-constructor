<script setup lang="ts">
import { reactive, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import type { CarouselData, CarouselItem } from '@/views/SiteConstructorForm/types.ts'

const props = defineProps<{ modelValue: CarouselData }>()
const emit = defineEmits<{ 'update:modelValue': [value: CarouselData] }>()

const local = reactive<CarouselData>({
  carouselTitle: props.modelValue.carouselTitle,
  items: props.modelValue.items.map((item) => ({ ...item })),
})

watch(
  local,
  (val) =>
    emit('update:modelValue', {
      carouselTitle: val.carouselTitle,
      items: val.items.map((item) => ({ ...item })),
    }),
  { deep: true },
)

function addItem() {
  local.items.push({ id: crypto.randomUUID(), url: '', file: null })
}

function removeItem(id: string) {
  local.items = local.items.filter((item) => item.id !== id)
}

function onFileChange(item: CarouselItem, files: File[]) {
  item.file = files[0] ?? null
  if (item.file) item.url = ''
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <p>Карусель</p>
    <UInput v-model="local.carouselTitle" placeholder="Название карусели" />

    <VueDraggable
      v-model="local.items"
      handle=".drag-handle"
      tag="TransitionGroup"
      :component-data="{ name: 'carousel-items', tag: 'div', class: 'flex flex-wrap gap-3' }"
    >
      <div
        v-for="item in local.items"
        :key="item.id"
        class="flex flex-col gap-2 border border-gray-100 rounded-md p-3 w-full max-w-[300px]"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-1">
            <span class="drag-handle cursor-grab text-gray-300 select-none">⠿</span>
            <span class="text-xs text-gray-400">Изображение</span>
          </div>
          <UButton
            color="error"
            variant="ghost"
            size="xs"
            :disabled="local.items.length === 1"
            @click="removeItem(item.id)"
          >
            ✕
          </UButton>
        </div>

        <UInput
          v-model="item.url"
          placeholder="Ссылка на изображение"
          :disabled="!!item.file"
        />

        <div class="flex items-center gap-2">
          <div class="h-px flex-1 bg-gray-100" />
          <span class="text-xs text-gray-400">или</span>
          <div class="h-px flex-1 bg-gray-100" />
        </div>

        <UFileUpload
          layout="list"
          label="Загрузить файл"
          description="SVG, PNG, JPG or GIF (max. 2MB)"
          accept="image/*"
          :ui="{ base: 'min-h-12' }"
          @update:model-value="onFileChange(item, $event)"
        />
      </div>
    </VueDraggable>

    <UButton variant="outline" size="sm" @click="addItem">+ Добавить изображение</UButton>
  </div>
</template>

<style>
.carousel-items-move,
.carousel-items-enter-active,
.carousel-items-leave-active {
  transition: all 0.3s ease;
}

.carousel-items-enter-from,
.carousel-items-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.carousel-items-leave-active {
  position: absolute;
}
</style>
