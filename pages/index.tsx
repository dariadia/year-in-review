import Link from 'next/link'
import { useRouter } from 'next/router'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useState } from 'react'

// @ts-ignore
import general from '/public/assets/data/countries.json'
import { Event } from 'types/data'

type Props = {
  country: string
}

const Homepage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const router = useRouter()
  /* @ts-ignore */
  // It's a react-i18next: v12+ bug https://github.com/i18next/react-i18next/issues/1601
  const { t } = useTranslation(['common', 'countries', 'countries_locative'])

  const [activeTab, setActiveTab] = useState('read_pages')
  const [activeTabLabel, setActiveTabLabel] = useState('read')

  const setMapTab = (id: string): void => {
    const mapNode = document.getElementById('map-container')
    if (mapNode && mapNode.firstChild) {
      mapNode.removeChild(mapNode.firstChild)
    }
    setActiveTab(id)
    setActiveTabLabel(id?.split('_')[0])
  }

  return (
    <>
      <Header {...{ activeTab, activeTabLabel, general, country: _props.country }} />
      <main>
        <h1>
          {t('common:year_in_review_heading')}
        </h1>
        <p className="year-in-review__desc">
          <Trans
            i18nKey="year_in_review_desc"
            values={{ countryName: t(`countries_locative:${_props.country}`) }}
            components={{ accented: <span className="accented" /> }}
          />
        </p>
        <h2 className="year-in-review__map-desc">
          <Trans
            i18nKey="year_in_review_desc_world"
            components={{ accented: <span className="accented" /> }}
          />
        </h2>
        <ul className="map-navigation">
          <li
            id="read_pages"
            className={`year-in-review__button ${activeTab === 'read_pages' ? 'active' : 'inactive'
              }`}
            onClick={(event: Event) =>
              setMapTab(event.target?.id as string)
            }
          >
            <Trans
              i18nKey="caption_read"
              count={general.world?.read_pages}
              values={{
                formattedCount: general.world?.read_pages.toLocaleString(),
              }}
            />
          </li>
          <li
            id="listened_hours"
            className={`year-in-review__button ${activeTab === 'listened_hours'
              ? 'active'
              : 'inactive'
              }`}
            onClick={(event: Event) =>
              setMapTab(event.target?.id as string)
            }
          >
            <Trans
              i18nKey="caption_listened"
              count={general.world?.listened_hours}
              values={{
                formattedCount: general.world?.listened_hours.toLocaleString(),
              }}
            />
          </li>
          <li
            id="releases"
            className={`year-in-review__button ${activeTab === 'releases' ? 'active' : 'inactive'
              }`}
            onClick={(event: Event) =>
              setMapTab(event.target?.id as string)
            }
          >
            <Trans
              i18nKey="caption_releases"
              count={general.world?.releases}
              values={{
                formattedCount: general.world?.releases.toLocaleString(),
              }}
            />
          </li>
          <li
            id="likes_count"
            className={`year-in-review__button ${activeTab === 'likes_count' ? 'active' : 'inactive'
              }`}
            onClick={(event: Event) =>
              setMapTab(event.target?.id as string)
            }
          >
            <Trans
              i18nKey="caption_likes"
              count={general.world?.likes_count}
              values={{
                formattedCount: general.world?.likes_count.toLocaleString(),
              }}
            />
          </li>
          <li
            id="quotes_count"
            className={`year-in-review__button ${activeTab === 'quotes_count' ? 'active' : 'inactive'
              }`}
            onClick={(event: Event) =>
              setMapTab(event.target?.id as string)
            }
          >
            <Trans
              i18nKey="caption_quotes"
              count={general.world?.quotes_count}
              values={{
                formattedCount: general.world?.quotes_count.toLocaleString(),
              }}
            />
          </li>
          <li
            id="emotions_count"
            className={`year-in-review__button ${activeTab === 'emotions_count'
              ? 'active'
              : 'inactive'
              }`}
            onClick={(event: Event) =>
              setMapTab(event.target?.id as string)
            }
          >
            <Trans
              i18nKey="caption_emotions"
              count={general.world?.emotions_count}
              values={{
                formattedCount: general.world?.emotions_count.toLocaleString(),
              }}
            />
          </li>
        </ul>
        <div id="map-container" />
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
  hr: 'HR',
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => {
  return ({
    props: {
      country: LOCALE_TO_COUNTRY_CODE[locale as keyof typeof LOCALE_TO_COUNTRY_CODE] || 'RS',
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'countries',
        'countries_locative'
      ])),
    },
  })
}

export default Homepage
