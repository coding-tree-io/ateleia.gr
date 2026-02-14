export default {
  usesDtcg: true,
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "generated/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables"
        }
      ]
    },
    js: {
      transformGroup: "js",
      buildPath: "generated/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6"
        }
      ]
    }
  }
};
