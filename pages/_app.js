import Head from "next/head"
import Main from "components/Main"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pokémon Master</title>
        <meta name="description" content="Pokémon GO TDO database" />
      </Head>

      <Main>
        <Component {...pageProps} />
      </Main>
    </>
  )
}