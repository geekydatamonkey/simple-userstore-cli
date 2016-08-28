#!/usr/bin/env node
import inquirer from 'inquirer';
import UserStore from 'simple-userstore';
import loadDatabase from './loadDatabase';
import listUsers from './listUsers';
import createNewUser from './createNewUser';
import changeUsername from './changeUsername';
import changePassword from './changePassword';
import removeUser from './removeUser';

function promptForAction(userstore) {
  return inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What do you want to do?',
    choices: [{
      name: 'List all users',
      value: 'LIST',
    }, {
      name: 'Create a new user',
      value: 'CREATE NEW',
    }, {
      name: 'Change a user\'s password',
      value: 'CHANGE PASSWORD',
    }, {
      name: 'Change a user\'s username',
      value: 'CHANGE USERNAME',
    }, {
      name: 'Remove a user',
      value: 'REMOVE',
    }, {
      name: 'Quit',
      value: 'QUIT',
    }],
  })
  .then(({ action }) => {
    switch (action) {
      case 'LIST':
        return listUsers(userstore);
      case 'CREATE NEW':
        return createNewUser(userstore);
      case 'CHANGE PASSWORD':
        return changePassword(userstore);
      case 'CHANGE USERNAME':
        return changeUsername(userstore);
      case 'REMOVE':
        return removeUser(userstore);
      case 'QUIT':
        return process.exit();
      default:
        return null;
    }
  })
  .then(() => {
    // return to main menu
    return promptForAction(userstore);
  })
  .catch(console.error);
}

function main() {
  const userstore = new UserStore();
  return loadDatabase(userstore)
    .then(() => {
      promptForAction(userstore);
    })
    .catch(console.error);
}

main();
