import Head from 'next/head'
import type { FC } from 'react'

type Props = {
  heading: string
  title: string
}

export const Header: FC<Props> = ({ heading, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
  </>
)
