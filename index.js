//@ts-check
module.exports = (api, projectOptions) => {
  api.chainWebpack(webpackConfig => {
    webpackConfig.module
      .rule(/\.(j|t)sx$/)
      .test(/\.(j|t)sx$/)
      .use('vue-jsx-hot-loader')
      .before('babel-loader')
      .loader('vue-jsx-hot-loader');
  });
};
