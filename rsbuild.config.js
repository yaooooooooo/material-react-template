import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSvgr } from "@rsbuild/plugin-svgr";

const port = process.env.REACT_CLIENT_PORT || 3000;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const AGENT_SERVER = process.env.REACT_APP_AGENT_SERVER_URL;
const TEST_CASE_SERVER = process.env.REACT_APP_TEST_CASE_SERVER_URL;
const BASE_SERVER_URL = process.env.REACT_APP_BASE_SERVER_URL;

export default defineConfig(() => {
  const { publicVars } = loadEnv({ mode: process.env.MODE });

  return {
    dev: {
      assetPrefix: "/",
    },
    source: {
      define: {
        ...publicVars,
        "process.env.REACT_APP_BASE_URL": JSON.stringify(BASE_URL),
        "process.env.REACT_APP_BASE_SERVER_URL": JSON.stringify(BASE_SERVER_URL),
        "process.env.REACT_APP_AGENT_SERVER_URL": JSON.stringify(AGENT_SERVER),
      },
    },
    output: {
      distPath: {
        root: "build",
      },
      sourceMap: {
        js: process.env.NODE_ENV === "production" ? false : "cheap-module-source-map",
        css: false,
      },
      assetPrefix: process.env.ASSET_PREFIX,
    },
    plugins: [
      pluginReact({
        enableProfiler: process.env.REACT_PROFILER === "true",
      }),
      pluginSvgr({ mixedImport: true }),
      pluginBabel({
        plugins: [["babel-plugin-transform-remove-console", { exclude: ["error", "warn", "log"] }]],
      }),
    ],
    html: {
      template: "./public/index.html",
    },
    tools: {
      cssExtract: {
        pluginOptions: {
          ignoreOrder: false,
        },
      },
      postcss: (opts, { addPlugins }) => {
        // const postcssPx2Rem = require('postcss-pxtorem')({
        //   rootValue: 16,
        //   unitPrecision: 5,
        //   selectorBlackList: [],
        //   replace: true,
        //   mediaQuery: false,
        //   minPixelValue: 0,
        //   propList: ['*'], // 需要转换的属性，默认为 ['*']
        //   exclude: /(margin|padding|node_modules)/i, // 哪些文件不需要转换
        // });
        // addPlugins([require("autoprefixer"), postcssPx2Rem]);
        addPlugins([require("autoprefixer")]);
      },
    },
    performance: {
      chunkSplit: {
        strategy: "split-by-experience",
      },
      bundleAnalyze: process.env.BUNDLE_ANALYZE
        ? {
            analyzerMode: "server",
            openAnalyzer: true,
          }
        : {},
    },
    server: {
      port: port,
      hot: true,
      proxy: {
        "/agent": {
          target: AGENT_SERVER,
          changeOrigin: true,
          pathRewrite: { "^/": "" },
        },
        "/test-case": {
          target: TEST_CASE_SERVER,
          changeOrigin: true,
          pathRewrite: { "^/": "" },
        },
        "/tdlc-api": {
          target: TEST_CASE_SERVER,
          changeOrigin: true,
          pathRewrite: { "^/tdlc-api": "" },
        },
        "/user": {
          target: TEST_CASE_SERVER,
          changeOrigin: true,
          pathRewrite: { "^/": "" },
        },
      },
    },
  };
});
