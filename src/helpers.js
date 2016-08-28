import chalk from 'chalk';

export function printSuccess(msg) {
  console.log(`\n${chalk.green('✓')} ${msg}\n`);
}

export function printFailure(msg) {
  console.log(`\n${chalk.red('✘')} ${msg}\n`);
}

export default {
  printSuccess,
  printFailure,
};
