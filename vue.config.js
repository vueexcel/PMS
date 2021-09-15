module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/app.scss";`
      }
    }
  }
};