export type FieldType = 'image' | 'description' | 'video' | 'button' | 'carousel' | 'banner'

export interface SeoForm {
  siteTitle: string
  siteDescription: string
}

export interface VideoData {
  url: string
}

export interface DescriptionData {
  text: string
}

export interface ImageData {
  title: string
  link: string
}

export interface CarouselItem {
  id: string
  url: string
  file: File | null
}

export interface CarouselData {
  carouselTitle: string
  items: CarouselItem[]
}

export interface ButtonData {
  buttonColor: string
  buttonDisplay: string
  buttons: Array<{ name: string; url: string }>
}

export type ElementData = VideoData | DescriptionData | ImageData | CarouselData | ButtonData

export interface PageElement {
  id: string
  type: FieldType
  data: ElementData
}

export interface SiteForm {
  seo: SeoForm
  elements: PageElement[]
}
