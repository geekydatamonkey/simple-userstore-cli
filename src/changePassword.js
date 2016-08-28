import inquirer from 'inquirer';
import { printSuccess, printFailure } from './helpers';

export default async function changePassword(userstore) {
  if (!userstore) throw new Error('No userstore provided.');

  const { username, password } = await inquirer.prompt([{
    name: 'username',
    type: 'input',
    message: 'Username?',
    validate: async (currentUsername) => {
      const currentUserExists = await userstore.findByUsername(currentUsername);
      if (currentUserExists) return true;
      return `No user exists with username ${currentUsername}.`;
    },
  }, {
    name: 'password',
    type: 'password',
    message: 'New Password?',
    validate: async (newUsername) => {
      const newUsernameIsUsed = await userstore.findByUsername(newUsername);
      if (!newUsernameIsUsed) { return true; }
      return `new username '${newUsername}' is already used.`;
    },
  }]);

  const currentUser = await userstore.findByUsername(username);

  try {
    await userstore.setPassword(currentUser._id, password);
  } catch (err) {
    printFailure(`No password changed. ${err.message}`);
  }
  printSuccess(`Password changed for user '${username}'.`);
}
