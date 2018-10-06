//@ts-check
module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      'vue-tsx-support': '^2.1.1',
    },
    devDependencies: {
      'vue-jsx-hot-loader': '^1.4.0',
    },
  });

  api.postProcessFiles(files => {
    // update main.ts
    const file = files['src/main.ts'];
    const main = files[file];

    if (!main) {
      throw new Error(`File "main.ts" does not exists.`);
    }

    const lines = main.split(/\r?\n/g).reverse();
    const lastImportIndex = lines.findIndex(line => line.match(/^import/));

    lines[lastImportIndex] += `\nimport 'vue-tsx-support/enable-check';`;
  });
};
