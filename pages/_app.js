import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/a25f409e18.js"
          crossOrigin="anonymous"
        ></script>
        <title>👨🏽‍💻 Blog.luishcr</title>
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
