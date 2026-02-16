export default {
  multipass: true,
  js2svg: {
    pretty: false,
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIds: false,
          convertShapeToPath: false,
        },
      },
    },
    {
      name: 'removeDimensions',
      active: true,
    },
    {
      name: 'sortAttrs',
      active: true,
    },
  ],
};
