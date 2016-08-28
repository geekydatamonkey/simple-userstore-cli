import inquirer from 'inquirer';

export default async function createNewUser(userstore) {
  const { username, password } = await inquirer.prompt([{
    name: 'username',
    type: 'input',
    message: 'Username?',
  }, {
    name: 'password',
    type: 'password',
    message: 'Password?',
  }]);

  try {
    await userstore.createUser({ username, password });
  } catch (err) {
    // username exists
    console.error(`Sorry. A user with username '${username}' already exists`);
    console.error(err);
  }

  console.log(`Created new user '${username}'`);
}
