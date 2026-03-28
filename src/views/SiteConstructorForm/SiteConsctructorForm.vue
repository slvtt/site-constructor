<script setup lang="ts">
import { ref, type Component } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { SELECT_OPTIONS, DEFAULT_VALUES } from '@/views/SiteConstructorForm/consts.ts'
import type { SeoForm, PageElement, FieldType, ElementData } from '@/views/SiteConstructorForm/types.ts'
import CarouselElement from '@/views/SiteConstructorForm/components/CarouselElement.vue'
import ImageElement from '@/views/SiteConstructorForm/components/ImageElement.vue'
import ButtonsElement from '@/views/SiteConstructorForm/components/ButtonsElement.vue'
import VideoElement from '@/views/SiteConstructorForm/components/VideoElement.vue'
import DescriptionElement from '@/views/SiteConstructorForm/components/DescriptionElement.vue'

const seoSchema = z.object({
  siteTitle: z.string().min(1, 'Title is required').max(60, 'Max 60 characters'),
  siteDescription: z.string().min(1, 'Description is required').max(70, 'Max 70 characters'),
})

const { defineField, handleSubmit, errors } = useForm<SeoForm>({
  validationSchema: {
    siteTitle: (val: unknown): boolean | string => {
      const result = seoSchema.shape.siteTitle.safeParse(val)
      return result.success ? true : result.error.issues[0]?.message ?? 'Invalid'
    },
    siteDescription: (val: unknown): boolean | string => {
      const result = seoSchema.shape.siteDescription.safeParse(val)
      return result.success ? true : result.error.issues[0]?.message ?? 'Invalid'
    },
  },
})

const [siteTitle, siteTitleAttrs] = defineField('siteTitle')
const [siteDescription, siteDescriptionAttrs] = defineField('siteDescription')

const ELEMENT_COMPONENTS: Record<FieldType, Component> = {
  carousel: CarouselElement,
  image: ImageElement,
  banner: ImageElement,
  button: ButtonsElement,
  video: VideoElement,
  description: DescriptionElement,
}

const DEFAULT_DATA: Record<FieldType, ElementData> = {
  video: { ...DEFAULT_VALUES.video },
  description: { ...DEFAULT_VALUES.description },
  image: { ...DEFAULT_VALUES.image },
  banner: { ...DEFAULT_VALUES.banner },
  carousel: { ...DEFAULT_VALUES.carousel, items: [{ id: crypto.randomUUID(), url: '', file: null }] },
  button: { ...DEFAULT_VALUES.button, buttons: [{ name: '', url: '' }] },
}

const elements = ref<PageElement[]>([])
const showSelect = ref(false)
const pendingType = ref('')

function onTypeSelect(type: unknown) {
  if (typeof type !== 'string' || !type) return
  const fieldType = type as FieldType
  elements.value.push({
    id: crypto.randomUUID(),
    type: fieldType,
    data: structuredClone(DEFAULT_DATA[fieldType]),
  })
  pendingType.value = ''
  showSelect.value = false
}

function updateElementData(id: string, data: ElementData) {
  const el = elements.value.find((e) => e.id === id)
  if (el) el.data = data
}

function removeElement(id: string) {
  elements.value = elements.value.filter((el) => el.id !== id)
}

const onSubmit = handleSubmit((seoValues) => {
  const formData = {
    seo: seoValues,
    elements: elements.value.map(({ type, data }) => ({ type, data })),
  }
  console.log('Form submitted:', formData)
})
</script>

<template>
  <form class="flex flex-col gap-6" @submit="onSubmit">
    <div class="flex flex-col gap-4">
      <h3>Site SEO Information</h3>
      <UFormField label="Site title" :error="errors.siteTitle">
        <UInput
          v-model="siteTitle"
          v-bind="siteTitleAttrs"
          placeholder="My Awesome Site"
          class="w-full"
        />
      </UFormField>
      <UFormField
        label="Site description"
        :error="errors.siteDescription"
        :hint="`${(siteDescription ?? '').length}/70`"
        class="w-full"
      >
        <UTextarea
          v-model="siteDescription"
          v-bind="siteDescriptionAttrs"
          placeholder="Short description of the site (max 70 characters)"
          class="w-full"
        />
      </UFormField>
    </div>

    <div class="flex flex-col gap-4">
      <h3>Page elements</h3>

      <VueDraggable
        v-model="elements"
        handle=".drag-handle"
        :animation="150"
        tag="TransitionGroup"
        :component-data="{ name: 'page-elements', tag: 'div', class: 'flex flex-col gap-2' }"
      >
        <div
          v-for="element in elements"
          :key="element.id"
          class="flex flex-col gap-2 border border-gray-200 rounded-lg p-4"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span class="drag-handle cursor-grab text-gray-300 select-none">⠿</span>
              <span class="text-sm font-medium capitalize">{{ element.type }}</span>
            </div>
            <UButton color="error" variant="ghost" size="sm" @click="removeElement(element.id)">
              Удалить
            </UButton>
          </div>
          <component
            :is="ELEMENT_COMPONENTS[element.type]"
            :model-value="element.data"
            @update:model-value="updateElementData(element.id, $event)"
          />
        </div>
      </VueDraggable>

      <div v-if="showSelect" class="flex gap-2 items-center">
        <USelect
          v-model="pendingType"
          placeholder="Выберите тип элемента"
          :items="SELECT_OPTIONS"
          class="flex-1"
          @update:model-value="onTypeSelect"
        />
        <UButton color="neutral" variant="ghost" @click="showSelect = false">Отмена</UButton>
      </div>
      <UButton v-else variant="outline" @click="showSelect = true">+ Добавить элемент</UButton>
    </div>

    <UButton type="submit">Сохранить сайт</UButton>
  </form>
</template>

<style>
.page-elements-move,
.page-elements-enter-active,
.page-elements-leave-active {
  transition: all 0.3s ease;
}

.page-elements-enter-from,
.page-elements-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.page-elements-leave-active {
  position: absolute;
  width: 100%;
}
</style>
