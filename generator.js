//@ts-check
module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      'vue-tsx-support': '^2.3.0',
    },
    devDependencies: {
      'vue-jsx-hot-loader': '^1.4.0',
    },
  });

  api.postProcessFiles(files => {
    const shimsTSX = 'src/shims-tsx.d.ts';
    if (files[shimsTSX]) {
      const lines = files[shimsTSX].split(/\r?\n/g);
      // import `vue-tsx-suppport` check
      lines.unshift(`import 'vue-tsx-support/enable-check';`, '');
      const index = lines.findIndex(i => i.indexOf('[elem: string]: any') > 0);
      // remove vue `shims-tsx` default index signature
      // because 'vue-tsx-support/enable-check' already has it.
      lines.splice(index, 1);
      files[shimsTSX] = lines.join('\n');
    }
  });
};
