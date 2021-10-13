module.exports  = {
     devServer:{  // Unusable in production
          proxy: {
            '^/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api': '/' }
              }
          }
     }
}