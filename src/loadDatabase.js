import inquirer from 'inquirer';

export default function loadDatabase(userstore) {
  return inquirer.prompt({
    type: 'input',
    name: 'filename',
    message: 'Path to the database file?',
    default: 'db/users.db',
  })
  .then(({ filename }) => {
    return userstore.load(filename);
  })
  .catch(console.error);
}
