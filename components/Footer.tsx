import { useTranslation, Trans } from 'next-i18next'
import type { FC } from 'react'

export const Footer: FC = () => {
  /* @ts-ignore */
  // It's a react-i18next: v12+ bug https://github.com/i18next/react-i18next/issues/1601
  const { t } = useTranslation('footer')

  return (
    <footer>
      <p>{t('description')}</p>
    </footer>
  )
}
