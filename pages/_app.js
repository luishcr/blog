import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main className=" container boxshadow boxborder">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;
