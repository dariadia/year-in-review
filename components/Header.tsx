import Head from 'next/head'
import type { FC } from 'react'

type Props = {
  title: string
}

export const Header: FC<Props> = ({ title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
  </>
)
