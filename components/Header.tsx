import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

export const Header: FC = () => {
  /* @ts-ignore */
  // It's a react-i18next: v12+ bug https://github.com/i18next/react-i18next/issues/1601
  const { t } = useTranslation('common')

  return <>
    <Head>
      <title>{t('meta_title')}</title>
      <link rel="manifest" href="/assets/favicon/site.webmanifest.json" />
      <link rel="icon" href="/assets/favicon/favicon.ico" />
      <link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png" />
      <link
        rel="preload"
        as="font"
        crossOrigin="crossorigin"
        href="/assets/fonts/spectral/spectral-v7-latin_cyrillic-regular.woff2"
      />
      <link
        rel="preload"
        as="font"
        crossOrigin="crossorigin"
        href="/assets/fonts/spectral/spectral-v7-latin_cyrillic-italic.woff2"
      />
      <link
        rel="preload"
        as="font"
        crossOrigin="crossorigin"
        href="/assets/fonts/spectral/spectral-v7-latin_cyrillic-600.woff2"
      />
      <link
        rel="preload"
        as="font"
        crossOrigin="crossorigin"
        href="/assets/fonts/spectral/spectral-v7-latin_cyrillic-700.woff2"
      />
      <link
        rel="preload"
        as="font"
        crossOrigin="crossorigin"
        href="/assets/fonts/spectral/spectral-v7-latin_cyrillic-800.woff2"
      />
      <link
        rel="preload"
        as="font"
        crossOrigin="crossorigin"
        href="/assets/fonts/karla/karla-v15-latin-regular.woff2"
      />
      <link
        rel="preload"
        as="font"
        crossOrigin="crossorigin"
        href="/assets/fonts/karla/karla-v15-latin-italic.woff2"
      />
      <link
        rel="preload"
        as="font"
        crossOrigin="crossorigin"
        href="/assets/fonts/karla/karla-v15-latin-600.woff2"
      />
      <link
        rel="preload"
        as="font"
        crossOrigin="crossorigin"
        href="/assets/fonts/karla/karla-v15-latin-700.woff2"
      />
      <link
        rel="preload"
        as="font"
        crossOrigin="crossorigin"
        href="/assets/fonts/karla/karla-v15-latin-800.woff2"
      />
    </Head>
    <header>
      <div className="logo_header user-avatar_header" />
      <div className="logo_header your-company-logo_header" />
    </header>
  </>
}
