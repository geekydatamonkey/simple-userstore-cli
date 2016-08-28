import Table from 'cli-table';

export default async function listUsers(userstore) {
  if (!userstore) throw new Error('No userstore provided');

  const table = new Table({
    head: ['_id', 'username', 'updatedAt', 'createdAt'],
    colWidths: [10, 20, 35, 35],
  });
  try {
    // return all users omitting password
    const users = await userstore.db.find({}, { password: false });
    users.forEach(u => {
      table.push([u._id, u.username, u.updatedAt, u.createdAt]);
    });
    console.log(table.toString());
  } catch (err) {
    console.error(err);
  }
}
