import Link from 'next/link'
import { useRouter } from 'next/router'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

type Props = {
  country: string
}

const Homepage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const router = useRouter()
  /* @ts-ignore */
  // It's a react-i18next: v12+ bug https://github.com/i18next/react-i18next/issues/1601
  const { t } = useTranslation(['common', 'countries_locative'])

  return (
    <>
      <Header />
      <main>
        <h1>
          {t('common:year_in_review_heading')}
        </h1>
        <p className="year-in-review__desc">
          {t("common:year_in_review_desc", { countryName: t(`countries_locative:${_props.country}`) })}
        </p>
        <h2 className="year-in-review__map-desc">
          <Trans
            i18nKey="year_in_review_desc_world"
            components={{ accented: <span className="accented" /> }}
          />
        </h2>
      </main>
      <Footer />
    </>
  )
}

const LOCALE_TO_COUNTRY_CODE = {
  da: 'DK',
  sr: 'RS',
  en: 'GB',
  es: 'MX',
  bg: 'BG',
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => {
  return ({
    props: {
      country: LOCALE_TO_COUNTRY_CODE[locale as keyof typeof LOCALE_TO_COUNTRY_CODE],
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'countries_locative'
      ])),
    },
  })
}

export default Homepage
