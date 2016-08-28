import inquirer from 'inquirer';

export default function createNewUser(userstore) {
  return inquirer.prompt([{
    name: 'username',
    type: 'input',
    message: 'Username?',
  }, {
    name: 'password',
    type: 'password',
    message: 'Password?',
  }])
  .then(({ username, password }) => {
    console.log(`username: ${username}, password: ${password}`);
  })
  .catch(console.error);
}
