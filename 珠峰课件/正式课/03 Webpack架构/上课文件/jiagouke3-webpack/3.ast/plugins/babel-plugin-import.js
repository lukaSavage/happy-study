const babelCore = require("@babel/core");
const types = require("babel-types");

const plugin = {
  visitor: {
    ImportDeclaration: {
      //opts: { libraryName: 'lodash', libraryDirectory: '' },
      enter(nodePath, state) {
        let { node } = nodePath;
        let {
          opts: { libraryName, libraryDirectory },
        } = state;
        let source = node.source; //lodash
        const specifiers = node.specifiers;
        if (
          libraryName === source.value && //引入的模块名等于插件配置的模块名
          !types.isImportDefaultSpecifier(specifiers[0]) //如果不是默认导入才处理
        ) {
          const declarations = specifiers.map((specifier) => {
            return types.importDeclaration(
              [types.importDefaultSpecifier(specifier.local)],
              types.stringLiteral(`${source.value}/${specifier.local.name}`)
            );
          });
          nodePath.replaceWithMultiple(declarations);
        }
      },
    },
  },
};

module.exports = function () {
  return plugin;
};
