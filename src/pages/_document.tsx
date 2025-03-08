import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="fa" dir="rtl">
        <Head>
          {/* Preload critical fonts */}
          <link
            rel="preload"
            href="/fonts/your-main-font.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          
          {/* Preconnect to domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Inline critical CSS */}
          <style dangerouslySetInnerHTML={{ __html: `
            /* Critical CSS for above-the-fold content */
            :root {
              --font-sans: /* your font settings */;
            }
            
            /* Basic resets and layout styles that prevent layout shift */
            body {
              margin: 0;
              padding: 0;
              direction: rtl;
              font-family: var(--font-sans);
            }
            
            /* Dark mode support */
            .dark body {
              background-color: rgb(9, 9, 11);
              color: rgb(250, 250, 250);
            }
          `}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 