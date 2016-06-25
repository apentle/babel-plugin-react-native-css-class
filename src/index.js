'use strict';

const babylon = require('babylon');

module.exports = function ({types: t}) {
  var progPath, module, pragma;
  var style, css;

  return {
    visitor: {
      JSXOpeningElement: {
        exit(path, state) {
          if (css != null && t.isLiteral(css.node.value)) {
            // Process css class for current Component
            var classes = css.node.value.value.split(" ").filter(function(name){
              return name.length != 0;
            }).map(function(name){
              return t.memberExpression(pragma, t.identifier(name));
            });
            if (style == null) {
              style = css;
              style.node.name.name = 'style';
            } else {
              if (t.isArrayExpression(style.node.value.expression)) {
                classes = classes.concat(style.node.value.expression.elements);
              } else {
                classes.push(style.node.value.expression);
              }
              css.remove();
            }
            style.node.value = t.JSXExpressionContainer(t.ArrayExpression(classes));
            css = null;
            // Add header if needed
            if (progPath != null) {
              progPath.unshiftContainer('body', babylon.parse(
                `import _apTheme from '${module}';`,
                {sourceType: "module"}));
              progPath = null;
            };
          }
          style = null;
        }
      },
      JSXAttribute: function JSXAttribute(path, state) {
        if (path.node.name.name == 'class') {
          css = path;
        } else if (path.node.name.name == 'style') {
          style = path;
        }
      },
      Program: function Program(path, state) {
          // console.log(state.file);
          // Init rule for update layout
          module = state.opts.module;
          if (module != null) {
            pragma = '_apTheme.styles';
            progPath = path;
          } else {
            pragma = state.opts.pragma || 'styles';
          }
          pragma = pragma.split(".").map(function (name) {
              return t.identifier(name);
          }).reduce(function (object, property) {
              return t.memberExpression(object, property);
          });
        }
    }
  };
}
