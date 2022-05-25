import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap"
          media="print"
          onLoad="this.media='all'"
        />

        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap"
          />
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
