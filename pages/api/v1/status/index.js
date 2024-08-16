import database from 'infra/database.js';

async function status(_req, res) {  
  const updatedAt = new Date().toISOString();

  const dbVersion = await database.query("SHOW server_version;");

  const dbMaxConnections = await database.query("SHOW max_connections;");
  
  const databaseName = process.env.POSTGRES_DB;
  const dbOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });

  const dbVersionValue = dbVersion.rows[0].server_version;
  const dbMaxConnectionsValue = dbMaxConnections.rows[0].max_connections;
  const openedConnectionsValue = dbOpenedConnections.rows[0].count;
  
  return res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: parseInt(dbMaxConnectionsValue),
        used_connections: openedConnectionsValue
      }
    }
  });
};

export default status;
