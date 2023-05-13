import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="th">
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta property="og:url" content="https://wecheck66th.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="We Check : แผนที่จับตาเลือกตั้ง 66" />
        <meta property="og:description" content="ติดตาม และรายงานความผิดปกติในหน่วยเลือกตั้งทั่วประเทศไปกับเรา" />
        <meta property="og:image" content="/assets/wecheck66.png" />

        <title>We Check 66</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
