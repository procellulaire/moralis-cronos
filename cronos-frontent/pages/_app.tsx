import { MoralisProvider } from 'react-moralis';
import '../styles/globals.css';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Menu from '../components/Menu/Menu';

const MyApp: React.FC<any> = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cdbootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cdbootstrap/css/cdb.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
      </Head>
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL!}
      appId={process.env.NEXT_PUBLIC_APP_ID!}
    >
      {/* <Menu/> */}
      <Component {...pageProps} />
    </MoralisProvider>
    </>
  );
}

export default MyApp;
