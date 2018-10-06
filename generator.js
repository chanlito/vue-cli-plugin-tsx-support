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
    const main = 'src/main.ts';
    if (files[main]) {
      const lines = files[main].split(/\r?\n/g);
      const hasImportStatement = lines.find(
        i => i.indexOf('vue-tsx-support/enable-check') > 0,
      );
      if (!hasImportStatement) {
        lines.unshift(`import 'vue-tsx-support/enable-check';\n`);
        files[main] = lines.join('\n');
      }
    } else {
      throw new Error(`Could not locate "src/main.ts" file.`);
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
