module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: 'https://red-stone-0163d6203.azurestaticapps.net'
  }
}