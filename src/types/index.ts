import { Language } from '@/lib/language'

export type LocalizedField<T> = {
  [key in Language]: T
}

export interface PageMedia {
  image: {
    url: string
    width: number
    height: number
  }
  caption?: string | null
}

export interface Page {
  id: string
  title: LocalizedField<string>
  content: LocalizedField<string>
  media?: PageMedia[] | null
  createdAt: string
  updatedAt: string
}
