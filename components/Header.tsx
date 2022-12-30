import Head from 'next/head'
import Link from 'next/link'
import { TFunction, Trans, useTranslation } from 'next-i18next'
import { FC } from 'react'
import omit from 'lodash/omit'

import type { GeneralData, MapCountryData } from 'types/data'

const mapCountriesData = (
  data: Record<string, MapCountryData>,
  t: any,
): MapCountryData[] => {
  if (!data) return []
  const countryNames = Object.keys(omit(data, 'world'))
  const countryData = Object.values(data)

  countryNames.forEach((name, index) => {
    countryData[index].id = name.toUpperCase()
    countryData[index].name = t(`countries:${countryData[index].id}`)
  })
  return countryData
}

const getMapScript = (data: string, sizedAs: string, label: string) => `
anychart.onDocumentReady(function () {
    var map = anychart.map();
    if (!map) return
    map.geoData('anychart.maps.world');
    map.interactivity().selectionMode('none');
    map.padding(0);
    map.background().fill("#1D2330");
    var dataSet = anychart.data.set(${data});
    var density_data = dataSet.mapAs({'size': '${sizedAs}'});
    var series = map.bubble(density_data);
    map.maxBubbleSize('10%')
      .minBubbleSize('1%');
    series.fill("#1FB6FF", 0.8);
    series.stroke("none");
    series.labels(false)
      .selectionMode('none');
    var series_choropleth = map.choropleth(density_data);
    series_choropleth.selectionMode('none')
      .fill('#fff')
      .stroke('black')
      .labels(false);
    series_choropleth.hovered()
      .stroke('#eaeaea')
      .fill('#D2D2D2');
    map.tooltip()
      .titleFormat("")
      .useHtml(true)
      .separator(false)
      .format(function () {
        return '' + this.getData('name') + '<hr/>' + '<span style="color: #d9d9d9">${label}</span>: ' + parseInt(this.getData('${sizedAs}')).toLocaleString() + '<br/>';});
    map.container('map-container');
    map.draw()
});`

const LaguageSwitcher = () => (
  <div className='language-switcher'>
    <Link href="/" locale='en'><button className='language-variant'>EN</button></Link>
    <Link href="/" locale='da'><button className='language-variant'>DA</button></Link>
    <Link href="/" locale='es'><button className='language-variant'>ES</button></Link>
    <Link href="/" locale='sr'><button className='language-variant'>SR</button></Link>
    <Link href="/" locale='hr'><button className='language-variant'>HR</button></Link>
    <Link href="/" locale='bg'><button className='language-variant'>BG</button></Link>
  </div>
)

type Props = { 
  activeTab: string
  activeTabLabel: string
  general: GeneralData
  country: string
  auth: boolean
  setAuth: (value: boolean) => void 
}

export const Header: FC<Props> = ({ 
  activeTab, 
  activeTabLabel, 
  general, 
  country, 
  auth,
  setAuth
 }) => {
  /* @ts-ignore */
  // It's a react-i18next: v12+ bug https://github.com/i18next/react-i18next/issues/1601
  const { t } = useTranslation(['common', 'countries'])

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
      <script src="https://cdn.anychart.com/samples/maps-general-features/world-bubble-map/data.js"></script>
      <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js?hcode=c11e6e3cfefb406e8ce8d99fa8368d33"></script>
      <script src="https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js?hcode=c11e6e3cfefb406e8ce8d99fa8368d33"></script>
      <script src="https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js?hcode=c11e6e3cfefb406e8ce8d99fa8368d33"></script>
      <script src="https://cdn.anychart.com/releases/v8/js/anychart-map.min.js?hcode=c11e6e3cfefb406e8ce8d99fa8368d33"></script>
      <script src="https://cdn.anychart.com/releases/v8/js/anychart-data-adapter.min.js?hcode=c11e6e3cfefb406e8ce8d99fa8368d33"></script>
      <script src="https://cdn.anychart.com/geodata/2.0.0/custom/world/world.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.15/proj4.js"></script>
      <script>
        {getMapScript(
          JSON.stringify(mapCountriesData(general.countries, t)),
          activeTab,
          // @ts-ignore
          t(`common:caption_${activeTabLabel}`, { formattedCount: '', count: general.countries[country.toLowerCase()][activeTab] }),
        )}
      </script>
    </Head>
    <header>
      <div className='icons_header'>
        {auth && <div className="logo_header user-avatar_header" />}
        {!auth && <button onClick={() => setAuth(true)}><Trans i18nKey="login" /></button>}
        <div className="logo_header your-company-logo_header" />
      </div>
      <LaguageSwitcher />
    </header>
  </>
}
