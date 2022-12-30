export type YearInReviewState = {
  general?: GeneralData
  country?: CountryData
  personal?: PersonalData
  quiz?: QuizData
  requested?: boolean
}

export type MapCountryData = {
  read_pages: number
  listened_hours: number
  releases: number
  likes_count: number
  quotes_count: number
  emotions_count: number
  id?: string
  name?: string
}

export type GeneralData = {
  world: MapCountryData
  countries: Record<string, MapCountryData>
}

export type YearInReviewQuote = {
  uuid: string
  text: string
  book: { title: string; uuid: string; kind: BookOrSerial }
  authors: { author_name: string; uuid: string }[]
  likes_count: number
}

export type YearInReviewAuthor = {
  uuid: string
  name?: string
  author_name?: string
  works_count: number
  readers_count: number
  cover: string
}

export type YearInReviewBook = {
  uuid: string
  cover: string
  title: string
  name?: string
  authors: {
    author_name: string; uuid: string
  }[]
  kind: BookOrSerial
  readers_count: number
  quotes_count: number
  impressions_count: number
  hex?: string
  pages_count?: number
  hours_read?: number
  answer_correct?: boolean
  label?: string
  reading_progress?: number
}

export type YearInReviewAudiobook = {
  uuid: string
  cover: string
  title: string
  authors: { author_name: string; uuid: string }[]
  listeners_count: number
  impressions_count: number
  hex?: string
  hours?: number
}

export type YearInReviewShelf = {
  title: string
  books_count: number
  readers_count: number
  covers: { src: string; type: 'book' | 'audiobook' }[]
  uuid: string
}

export type CountryData = {
  quotes: YearInReviewQuote[]
  authors: YearInReviewAuthor[]
  books: YearInReviewBook[]
  shelves: YearInReviewShelf[]
  most_read_month: string[]
}

export type PersonalData = {
  books_finished_count: number
  pages_read: number
  hours_read: number
  books_read: {
    min_pages: number
    max_pages: number
    books: YearInReviewBook[]
  }
  audiobooks_finished_count: number
  hours_listened: number
  audiobooks_listened: {
    min_minutes: number
    max_hours: number
    audiobooks: YearInReviewAudiobook[]
  }
}

export type YearInReviewFriend = {
  name: string
  cover: string
  answer_correct: boolean
  user_login: string
  likes_count: number
}

export type QuizAuthor = {
  author_name: string
  author_uuid: string
  hours_read: number
  answer_correct: boolean
  author_image: string
}

export type YearInReviewGenres = {
  total_count: number
  genres_list: string[]
  top_read: [{ title: string; uuid: string; books_read_count: number }]
}

export type YearInReviewQuoteAuthor = {
  text: string
  variants: YearInReviewQuizAuthor[]
}

export type YearInReviewQuizAuthor = {
  name: string
  cover: string
  uuid: string
  quotes_count: number
  answer_correct: boolean
}

export type QuizData = {
  read_most: QuizAuthor[]
  most_actioned_quotes: {
    recent: {
      text: string
      uuid: string
      authors: { author_name: string; uuid: string }[]
      book: { title: string; kind: BookOrSerial; uuid: string }
      likes_count: number
    }
    most_likes: {
      text: string
      uuid: string
      authors: { author_name: string; uuid: string }[]
      book: { title: string; kind: BookOrSerial; uuid: string }
      likes_count: number
    }
    friends: {
      text: string
      uuid: string
      authors: { name: string; uuid: string }[]
      book: { title: string; kind: BookOrSerial; uuid: string }
      likes_count: number
    }
    user_first: {
      text: string
      uuid: string
      authors: { name: string; uuid: string }[]
      book: { title: string; kind: BookOrSerial; uuid: string }
      likes_count: number
    }
  }
  friend_best: YearInReviewFriend[]
  book_most_time: YearInReviewBook[]
  total_reading_time: number
  genres_most: YearInReviewGenres
  books_fastest: YearInReviewBook[]
  quote_author: YearInReviewQuoteAuthor
  books_length: YearInReviewBooks
  almost_finished_books: YearInReviewBook[]
}

export type YearInReviewBooks = {
  min_pages: number
  max_pages: number
  books: YearInReviewBook[]
}

type BookOrSerial = 'book' | 'serial'

export type EventTarget = {
  id?: string
  parentNode?: { id: string }
  name?: { value: string }
  value?: string
  [key: string]: any
}

export type Event = {
  preventDefault: () => void
  target: EventTarget
}
