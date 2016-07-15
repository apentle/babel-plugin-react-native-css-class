'use strict';

const libName = '_apTheme';

module.exports = function ({types: t}) {
  var progPath, mod, pragma, expression;
  var style, css;

  return {
    visitor: {
      JSXOpeningElement: {
        exit(path, state) {
          if (css != null) {
            // Add header if needed
            if (progPath != null) {
              progPath.unshiftContainer('body', t.variableDeclaration(
                'var',
                [t.variableDeclarator(
                  t.identifier(libName),
                  t.callExpression(t.identifier('require'), [t.stringLiteral(mod)])
                )]
              ));
              progPath = null;
            }
            // Process classes
            var classes = [];
            if (t.isLiteral(css.node.value)) {
              // string classes
              classes = css.node.value.value.split(" ").filter(function(name){
                return name.length !== 0;
              }).map(function(name){
                return t.memberExpression(pragma, t.identifier(name));
              });
            } else if (t.isJSXExpressionContainer(css.node.value)) {
              // expression classes
              if (expression != null) {
                classes.push(t.callExpression(expression, [css.node.value.expression]));
              } else if (t.isArrayExpression(css.node.value.expression)) {
                classes = classes.concat(css.node.value.expression.elements);
              } else {
                classes.push(css.node.value.expression);
              }
            }
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
            if (classes.length === 0) {
              style.remove();
            } else if (classes.length === 1) {
              style.node.value = t.JSXExpressionContainer(classes[0]);
            } else {
              style.node.value = t.JSXExpressionContainer(t.ArrayExpression(classes));
            }
            // Reset temp variants
            css = null;
          }
          style = null;
        }
      },
      JSXAttribute: function JSXAttribute(path, state) {
        if (path.node.name.name === 'class') {
          css = path;
        } else if (path.node.name.name === 'style') {
          style = path;
        }
      },
      Program: function Program(path, state) {
        // Init rule for update layout
        mod = state.opts.module;
        pragma = state.opts.pragma;
        if (mod != null) {
          pragma = t.memberExpression(t.identifier(libName), t.identifier('styles'));
          expression = t.memberExpression(t.identifier(libName), t.identifier('css'));
          progPath = path;
        } else if (pragma != null) {
          pragma = pragma.split(".").map(function (name) {
            return t.identifier(name);
          }).reduce(function (object, property) {
            return t.memberExpression(object, property);
          });
        } else {
          pragma = t.identifier('styles');
        }
      }
    }
  };
}
