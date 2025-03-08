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
          
          {/* DNS prefetch and preconnect */}
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Meta tags for better performance */}
          <meta httpEquiv="x-dns-prefetch-control" content="on" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          
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
              -webkit-font-smoothing: antialiased;
              text-rendering: optimizeLegibility;
            }
            
            /* Reduce content reflow */
            img, video {
              max-width: 100%;
              height: auto;
            }
            
            /* Gridlines styling */
            .gridlines[data-v-257aca76] {
              background-image: url('/gridlines/gridlines.svg');
            }
            
            .dark .gridlines[data-v-257aca76] {
              background-image: url('/gridlines/gridlines-dark.svg');
            }
          `}} />
          
          {/* Preload critical images */}
          <link
            rel="preload"
            as="image"
            href="/image/logo.png"
            type="image/png"
          />
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