import type { SelectItem } from '@nuxt/ui'

export const ELEMENT_TITLES = {
  description: 'Добавить описание',
  video: 'Добавить видео',
  image: 'Добавить изображение',
  button: 'Добавить кнопку',
  banner: 'Добавить баннер',
  carousel: 'Добавить карусель',
}

export const SELECT_OPTIONS: SelectItem[] = [
  { label: 'image', value: 'image' },
  { label: 'description', value: 'description' },
  { label: 'video', value: 'video' },
  { label: 'button', value: 'button' },
  { label: 'carousel', value: 'carousel' },
  { label: 'banner', value: 'banner' },
] as const

export const BUTTONS_DISPLAY_OPTIONS = [
  { label: 'Списком', value: 'LIST' },
  { label: 'Горизонтально', value: 'HORIZONTAL' },
]

export const DEFAULT_VALUES = {
  video: { url: '' },
  description: { text: '' },
  banner: { title: '', link: '' },
  carousel: { carouselTitle: '', urls: [{ url: '' }] },
  button: {
    buttonColor: '#000000',
    buttonDisplay: 'HORIZONTAL',
    buttons: [{ name: '', url: '' }],
  },
}
