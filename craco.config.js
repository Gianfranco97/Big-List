const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#0090FF',
              '@text-color': '#353B40',
              '@table-header-bg': '#FFF',
              '@table-header-color': '#828891',
              '@border-radius-base': '4px',
              '@btn-font-weight': '500',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
};
