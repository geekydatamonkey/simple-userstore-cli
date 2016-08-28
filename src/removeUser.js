import inquirer from 'inquirer';
import { printFailure, printSuccess } from './helpers';

export default async function removeUser(userstore) {
  if (!userstore) throw new Error('No userstore provided');

  const { username } = await inquirer.prompt([{
    name: 'username',
    type: 'input',
    message: 'Username of user to remove?',
    validate: async (candidateUsername) => {
      const userExists = await userstore.findByUsername(candidateUsername);
      if (userExists) return true;
      return `User '${candidateUsername}' does not exist.`;
    },
  }]);

  try {
    const user = await userstore.findByUsername(username);
    await userstore.removeUser(user._id);
  } catch (err) {
    printFailure(`Cannot remove '${username}'. ${err.message}`);
  }
  printSuccess(`User '${username}' removed.`);
}
