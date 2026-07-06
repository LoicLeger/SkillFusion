import adapter from '@sveltejs/adapter-node';

const isDev = process.env.NODE_ENV === 'development';

export default {
  kit: {
    adapter: adapter(),

    csp: {
      mode: 'nonce',

      directives: {
        'default-src': ['self'],

        'script-src': ['self'],

        'style-src': [
          'self',
          'unsafe-inline',
          'https://fonts.googleapis.com'
        ],

        'font-src': ['self', 'https://fonts.gstatic.com'],

        'img-src': ['self', 'data:', 'https:'],

        'connect-src': [
          'self',
          'https://api:3000',
          ...(isDev ? ['http://localhost:3000'] : []),
          'https://formspree.io'
        ]
      }
    }
  }
};