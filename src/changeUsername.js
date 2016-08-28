import inquirer from 'inquirer';
import { printSuccess, printFailure } from './helpers';

export default function changeUsername(userstore) {
  if (!userstore) throw new Error('No userstore provided.');

  return inquirer.prompt([{
    name: 'currentUsername',
    type: 'input',
    message: 'Current Username?',
    validate: async (currentUsername) => {
      const currentUserExists = await userstore.findByUsername(currentUsername);
      if (currentUserExists) return true;
      return `No user exists with username ${currentUsername}.`;
    },
  }, {
    name: 'newUsername',
    type: 'input',
    message: 'New Username?',
    validate: async (newUsername) => {
      const newUsernameIsUsed = await userstore.findByUsername(newUsername);
      if (!newUsernameIsUsed) { return true; }
      return `new username '${newUsername}' is already used.`;
    },
  }])
  .then(async ({ currentUsername, newUsername }) => {
    // we could make this faster since validate does a lookup
    // ignoring for clarify, and since user I/O will be MUCH slower
    // than any lookup time.
    const currentUser = await userstore.findByUsername(currentUsername);
    try {
      await userstore.setUsername(currentUser._id, newUsername);
    } catch (err) {
      printFailure(`No username changed. ${err.message}`);
    }
    printSuccess(`Username changed from '${currentUsername}' to '${newUsername}'`);
  })
  .catch((err) => {
    console.error(err.message);
  });
}
