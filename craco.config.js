module.exports = {
  webpack: {
    configure: (config) => {
      config.module.rules.push({
        test: /\.m?js$/,
        include: [
          /node_modules[\\/]fast-png[\\/]/,
          /node_modules[\\/]iobuffer[\\/]/
        ],
        use: {
          loader: require.resolve('esbuild-loader'),
          options: { loader: 'js', target: 'es2019' }
        }
      });
      return config;
    }
  }
};
