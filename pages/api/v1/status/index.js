import database from '../../../../infra/database.js';

async function status(_req, res) {
  const result = await database.query('SELECT 1 + 1 as sum;');
  return res.status(200).json({ message: 'Deu tudo certo!' });
};

export default status;
