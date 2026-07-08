const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const nodeCmd = process.execPath;
const args = process.argv.slice(2);
const shouldOpen = args.includes('--open');

const cypressBin = path.join(rootDir, 'node_modules', 'cypress', 'bin', 'cypress');
const allureRunner = path.join(rootDir, 'scripts', 'allure-runner.js');

function run(command, commandArgs) {
  const result = spawnSync(command, commandArgs, {
    stdio: 'inherit',
    shell: false,
    env: process.env,
  });

  if (result.error) {
    console.error(result.error.message);
    return 1;
  }

  return result.status ?? 1;
}

const cypressStatus = run(nodeCmd, [
  cypressBin,
  'run',
  '--browser',
  'chrome',
  '--headed',
  '--spec',
  'cypress/e2e/ui/**/*.cy.js',
]);

const apiStatus = run(nodeCmd, [
  cypressBin,
  'run',
  '--spec',
  'cypress/e2e/api/**/*.cy.js',
]);

const generateStatus = run(nodeCmd, [
  allureRunner,
  'generate',
  'allure-results',
  '--clean',
  '-o',
  'allure-report',
]);

if (shouldOpen && fs.existsSync(path.join(rootDir, 'allure-report'))) {
  run(nodeCmd, [allureRunner, 'open', 'allure-report']);
}

const exitCode = cypressStatus !== 0 ? cypressStatus : apiStatus !== 0 ? apiStatus : generateStatus;
process.exit(exitCode);
