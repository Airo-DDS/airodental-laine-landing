import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Laine',
    short_name: 'Laine',
    description: 'Your Complete AI Dental Admin Assistant',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#09474C',
    icons: [
      {
        src: '/laine-favicon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/laine-favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
} 