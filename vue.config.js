module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.sistemium.com/v4d/dr50',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api/vr': '/api',
        // },
      },
      '/ims': {
        target: 'https://api.sistemium.com/ims',
        changeOrigin: true,
        pathRewrite: {
          '^/ims': '',
        },
      },
    },
  },
};
