
import type { Metadata } from 'next';
import { Belleza, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const belleza = Belleza({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'INSD | Premier Graphic Design Course in Delhi',
  description: 'Turn your creativity into a career with INSD Delhi\'s Graphic Design programs. Industry-oriented curriculum with 100% placement support.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${belleza.variable}`}>
      <head>
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-T9NSTZP4');`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GTM-K6TRCZN5"
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GTM-K6TRCZN5');`,
          }}
        />
      </head>
      <body className="font-body antialiased">
        <noscript dangerouslySetInnerHTML={{__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9NSTZP4" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
