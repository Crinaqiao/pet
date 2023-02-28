module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
        style:'css'
      }
    ]
  ],
}
// const proxyObj = {}
// proxyObj['/'] = {
//   target: 'http://localhost:8085',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/': ''
//   }
// }
