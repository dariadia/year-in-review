import pkg from 'next-i18next/package.json'
import { useTranslation, Trans } from 'next-i18next'
import type { FC } from 'react'

export const Footer: FC = () => {
  const { t } = useTranslation('footer')

  return (
    <footer>
      <p>{t('description')}</p>
    </footer>
  )
}
