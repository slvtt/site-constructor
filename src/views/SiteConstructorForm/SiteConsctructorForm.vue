<script setup lang="ts">
import { ref } from 'vue'
import { SELECT_OPTIONS } from '@/views/SiteConstructorForm/consts.ts'
import CarouselElement from '@/views/SiteConstructorForm/components/CarouselElement.vue'
import ImageElement from '@/views/SiteConstructorForm/components/ImageElement.vue'
import ButtonsElement from '@/views/SiteConstructorForm/components/ButtonsElement.vue'
import VideoElement from '@/views/SiteConstructorForm/components/VideoElement.vue'

const value = ref('')

const inputValue = ref('')
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4">
      <h3>Site SEO Information</h3>
      <UFormField label="Site title">
        <UInput placeholder="Site title" v-model="inputValue" />
      </UFormField>
      <UFormField label="Site title" class="w-full">
        <UTextarea
          v-model="inputValue"
          placeholder="Site description (70 symbols)"
          class="w-full"
        />
      </UFormField>
    </div>
    <div>
      <h3>Select any element</h3>
      <USelect placeholder="Select element" v-model="value" :items="SELECT_OPTIONS" />
    </div>
    <CarouselElement />
    <ImageElement />
    <ButtonsElement />
    <VideoElement />
  </div>
</template>
