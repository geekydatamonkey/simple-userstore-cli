import inquirer from 'inquirer';
import { printFailure, printSuccess } from './helpers';

export default async function createNewUser(userstore) {
  const { username, password } = await inquirer.prompt([{
    name: 'username',
    type: 'input',
    message: 'Username?',
    validate: async (usernameCandidate) => {
      const userExists = await userstore.findByUsername(usernameCandidate);
      if (!userExists) return true;
      return `A user with username '${username}' already exists`;
    },
  }, {
    name: 'password',
    type: 'password',
    message: 'Password?',
    validate(passwordCandidate) {
      if (passwordCandidate.length) return true;
      return 'Invalid password.';
    },
  }]);

  try {
    await userstore.createUser({ username, password });
  } catch (err) {
    printFailure(`No user '${username}' created. ${err.message}`);
  }
  printSuccess(`Created new user '${username}'`);
}
