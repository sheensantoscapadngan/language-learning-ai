import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "./styles.css";

const queryClient = new QueryClient();

const gaMeasurementId = ""; // TODO: Add your measurement ID here and remove this commend after

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to web!</title>
      </Head>
      <main className="app">
        <QueryClientProvider client={queryClient}>
          <GoogleAnalytics trackPageViews gaMeasurementId={gaMeasurementId} />
          <Component {...pageProps} />
        </QueryClientProvider>
      </main>
    </>
  );
}

export default CustomApp;
