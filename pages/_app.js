import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>👨🏽‍💻 blog.luishcr</title>
      </Head>

      <Header />
      <main className="container boxshadow boxborder">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;
