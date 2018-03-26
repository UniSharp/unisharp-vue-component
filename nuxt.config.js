const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Blue Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A base template' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  mode: 'spa',
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00ccc5', height: '4px' },
  loadingIndicator: '~/loading/logo.html',
  /*
  ** Global css
  */
  css: [
    { src: '~/assets/scss/uni-admin.scss', lang: 'scss' }
  ],
  plugins: [
    '~/plugins/uni-admin',
    '~/plugins/vue-markdown'
  ],
  /*
  ** Build configuration
  */
  router: {
    base: process.env.TRAVIS === 'true' ? '/unisharp-vue-component/' : '/'
  },
  build: {
    /*
    ** Run ESLINT and STYLELINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })

        config.plugins.push(new StylelintPlugin({
          files: ['**/*.scss', '**/*.vue'],
          syntax: 'scss'
        }))
      }

      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    },
    vendor: ['./', 'vue-quill-editor']
  }
}
