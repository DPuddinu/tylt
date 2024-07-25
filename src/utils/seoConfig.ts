// Type imports
import type { ManifestOptions } from 'vite-plugin-pwa';

/**
 * Defines the default SEO configuration for the website.
 */
export const seoConfig = {
  baseURL: 'https://tylt.vercel.app/', // Change this to your production URL.
  description: 'Astro PWA application to keep track of your learning progress.', // Change this to be your website's description.
  type: 'website',
  image: {
    url: 'https://picsum.photos/1200/630', // Change this to your website's thumbnail.
    alt: 'OpenGraph thumbnail description.', // Change this to your website's thumbnail description.
    width: 512,
    height: 512
  },
  siteName: 'Track You Learning Today' // Change this to your website's name,
};

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
  screenshots: [
    {
      src: '/screenshots/wide.png',
      form_factor: 'wide',
      sizes: '1920x958'
    },
    {
      src: '/screenshots/narrow.png',
      form_factor: 'narrow',
      sizes: '395x855'
    }
  ],
  name: 'Track You Learning Today', // Change this to your website's name.
  short_name: 'TYLT', // Change this to your website's short name.
  description: 'Astro PWA application to keep track of your learning progress.', // Change this to your websites description.
  theme_color: '#15191e', // Change this to your primary color.
  background_color: '#15191e', // Change this to your background color.
  display: 'standalone',
  display_override: ['standalone', 'fullscreen'],
  icons: [
    {
      src: '/favicons/Astro.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
};
