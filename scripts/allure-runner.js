const { spawnSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const isWindows = process.platform === 'win32';

const binPath = path.join(process.cwd(), 'node_modules', 'allure-commandline', 'bin', 'allure');
const command = isWindows ? 'node.exe' : 'node';

const result = spawnSync(command, [binPath, ...args], {
  stdio: 'inherit',
  shell: false,
  env: { ...process.env, JAVA_HOME: process.env.JAVA_HOME || 'C:\\Program Files\\Java\\jdk-26.0.1' }
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
