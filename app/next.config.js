/** @type {import('next').NextConfig} */
// next.config.js

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const path = require("path");

module.exports = {
  reactStrictMode: true,

  webpack(config, options) {
    const { isServer } = options;
    const moduleConfig = {
      name: "next1",
      remotes: {
        next2: `next2@${
          process.env.NEXT_PUBLIC_EXPORT_COMPONENT_URL
        }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
      },
      filename: "static/chunks/remoteEntry.js",
      exposes: {
        "./home": "./src/pages/index.tsx",
      },
    };
    config.plugins.push(new NextFederationPlugin(moduleConfig));
    config.plugins.push(
      new FederatedTypesPlugin({
        federationConfig: moduleConfig,
        typescriptLoader: {
          loader: "typescript",
          options: {
            transpileOnly: true,
          },
        },
      })
    );

    return config;
  },
};
