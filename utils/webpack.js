function withoutFlow(nextConfig) {
  return {
    ...nextConfig,
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.flow$/,
        loader: "ignore-loader"
      });
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    }
  };
}

function withSvgsAsReactComponents(nextConfig) {
  return {
    ...nextConfig,
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        loader: "svg-react-loader"
      });
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    }
  };
}

module.exports = { withoutFlow, withSvgsAsReactComponents };
