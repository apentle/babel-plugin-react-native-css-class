'use strict';

const chalk = require('chalk');
const diff = require('diff');
const fs = require('fs');
const path = require('path');
const babel = require('babel-core');

const pluginPath = require.resolve('../lib');

// Run each test case
var error = 0;

function normalizeLines(str) {
  return str.trimRight().replace(/\r\n/g, '\n');
}

function runTest(dir) {
  var options = {};
  fs.readdirSync(dir.path).map(item => {
    if (item == 'options.json') {
      options = JSON.parse(fs.readFileSync(dir.path + '/options.json', 'utf8'));
    };
  });

  var output = babel.transformFileSync(dir.path + '/actual.js', {
    plugins: [
      'syntax-jsx',
      [pluginPath, options]
    ]
  });
  var expected = fs.readFileSync(dir.path + '/expected.js', 'utf8');

  var diffs = diff.diffLines(normalizeLines(output.code), normalizeLines(expected));
  if (diffs.length == 1) {
    process.stdout.write(chalk.bgGreen.white(' PASS '));
    process.stdout.write(chalk.green(' ' + dir.name));
  } else {
    process.stdout.write(chalk.bgRed.white(' ERR '));
    process.stdout.write(chalk.red(' ' + dir.name + '\n'));
    error++;
    diffs.forEach(part => {
      var value = part.value;
      if (part.added) {
        value = chalk.green(part.value);
      } else if (part.removed) {
        value = chalk.red(part.value);
      }
      process.stdout.write(value);
    });
  }

  process.stdout.write('\n');
}

// Start to test
fs.readdirSync(__dirname + '/fixtures/').map(item => {
  return {
    path: path.join(__dirname, 'fixtures', item),
    name: item,
  };
}).filter(item => fs.statSync(item.path).isDirectory()).forEach(runTest);

process.exit(error);
