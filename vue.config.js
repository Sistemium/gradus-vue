process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  publicPath: '',
  transpileDependencies: [
    'sistemium-vue',
    // 'sistemium-jsdata',
    'vue-virtual-scroller',
  ],
  productionSourceMap: false,
  devServer: {
    proxy: {
      // '/api/(.+)/Campaign($|/)': {
      //   target: 'http://localhost:9090',
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   '/api/([^/]+)': '',
      //   // },
      // },
      // '/api/(.+)/Action($|/)': {
      //   target: 'http://localhost:9900/api',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '/api/([^/]+)': '',
      //   },
      // },
      // '/api/r50': {
      //   // target: 'https://api.sistemium.com/v4d/dr50',
      //   // target: 'http://localhost:9090/api/dr50',
      //   target: 'https://m.sistemium.com/api/r50',
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   '^/api/vr': '/api',
      //   // },
      // },
      // '/api/dr50/Campaign($|/)': {
      //   // target: 'https://api.sistemium.com/v4d/dr50',
      //   target: 'http://localhost:9090',
      //   // target: 'https://m.sistemium.com/api/dr50',
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   '^/api/dr50': '/api',
      //   // },
      // },
      // '/api/dr50': {
      //   // target: 'https://api.sistemium.com/v4d/dr50',
      //   // target: 'http://localhost:9090/api/dr50',
      //   target: 'https://m.sistemium.com/api/dr50',
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   '^/api/dr50': '/api',
      //   // },
      // },
      '/api/(.+)/': {
        // target: 'https://api.sistemium.com/v4d/dr50',
        // target: 'http://localhost:9090/api/dr50',
        target: 'https://m.sistemium.com',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api/dr50': '/api',
        // },
      },
      '/ims/': {
        target: 'https://api.sistemium.com',
        // target: 'http://localhost:8088/api/image',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/ims': '',
        //   // '^/ims/dr50': '',
        // },
      },
    },
  },
};
