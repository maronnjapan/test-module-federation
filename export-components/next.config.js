/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const moduleConfig = {
  name: "next2",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./test": "./src/components/Test.tsx",
  },
  shared: ["react", "react-dom"],
};
module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    const { isServer } = options;
    if (!isServer) {
      config.plugins.push(new NextFederationPlugin(moduleConfig));
      config.plugins.push(
        new FederatedTypesPlugin({ federationConfig: moduleConfig })
      );
    }

    return config;
  },
};
