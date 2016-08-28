import inquirer from 'inquirer';
import { printFailure, printSuccess } from './helpers';

export default async function loadDatabase(userstore) {
  const { filename } = await inquirer.prompt({
    type: 'input',
    name: 'filename',
    message: 'Path to the database file?',
    default: 'db/users.db',
  });

  try {
    await userstore.load(filename);
  } catch (err) {
    printFailure(`Cannot load database from '${filename}'. ${err.message}`);
  }
  printSuccess(`UserStore loaded from '${filename}'.`);
}
