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
    const tsconfig = 'tsconfig.json';
    if (files[tsconfig]) {
      const tsconfigJSON = JSON.parse(files[tsconfig]);
      tsconfigJSON.include = [
        ...new Set([
          'node_modules/vue-tsx-support/enable-check.d.ts',
          ...(tsconfigJSON.include || []),
        ]),
      ];
      files[tsconfig] = JSON.stringify(tsconfigJSON, null, 2);
    }

    const shimsTSX = 'src/shims-tsx.d.ts';
    if (files[shimsTSX]) {
      const lines = files[shimsTSX].split(/\r?\n/g);
      const index = lines.findIndex(i => i.indexOf('[elem: string]: any') > 0);
      // remove vue `shims-tsx` default index signature
      // because 'vue-tsx-support/enable-check' already has it.
      lines.splice(index, 1);
      files[shimsTSX] = lines.join('\n');
    }
  });
};
