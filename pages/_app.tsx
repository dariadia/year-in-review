import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import 'styles/content.css'
import 'styles/layout.css'
import 'public/assets/fonts/fonts.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default appWithTranslation(MyApp)
