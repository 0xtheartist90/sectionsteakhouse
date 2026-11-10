import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/app/globals.css';
import SmoothScroll from '@/components/smooth-scroll';

// Section's own fonts from section.ca (use confirmed by the client, 2026-11-10). Each ships as a
// single cut; the weight ranges stop the browser from faking bolder versions of it.
const display = localFont({
    src: './fonts/AcmeGothic-Bold.ttf',
    weight: '400 900',
    variable: '--font-display-family'
});
const serif = localFont({
    src: './fonts/LeifSN-Light.woff2',
    weight: '300 700',
    variable: '--font-serif-family'
});

const title = 'Section | Steakhouse & Supper Club in Unionville, Markham';
const description =
    'Dry-aged prime steaks, a raw bar, classic martinis and a serious cellar in an intimate supper club at 162 Main Street, Unionville. Open Tuesday to Saturday until midnight. Call to reserve.';

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3011';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    icons: { icon: '/brand/logo-house.svg' },
    openGraph: { title, description, images: ['/og.jpg'], type: 'website', locale: 'en_CA' }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => (
    <html lang='en'>
        <body className={`${display.variable} ${serif.variable} overscroll-none antialiased`}>
            <SmoothScroll />
            {children}
        </body>
    </html>
);

export default Layout;
