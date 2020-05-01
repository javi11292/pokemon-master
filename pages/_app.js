import Head from "next/head"
import Error from "next/error"
import Main from "components/Main"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pokémon Master</title>
        <meta name="description" content="Pokémon GO TDO database" />
      </Head>

      <Main>
        {pageProps.statusCode
          ? <Error statusCode={pageProps.statusCode} />
          : <Component {...pageProps} />
        }
      </Main>
    </>
  )
}