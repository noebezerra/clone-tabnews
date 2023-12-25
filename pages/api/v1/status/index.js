import database from "infra/database.js";

async function databaseVersion() {
  const response = await database.query("SHOW server_version;");
  return response?.rows[0]?.server_version;
}

async function databaseMaxConnections() {
  const response = await database.query("SHOW max_connections;");
  const rows = response.rows[0].max_connections;
  return rows;
}

async function databaseOpennedConnections() {
  const databaseName = process.env.POSTGRES_DB;
  const response = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const rows = response.rows[0].count;
  return rows;
}

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  // Versão do postgres
  const databaseVersionValue = await databaseVersion();
  // Quantidade de conexões máximas
  const databaseMaxConnectionsValue = await databaseMaxConnections();
  // Conexões usadas
  const databaseOpennedConnectionsValue = await databaseOpennedConnections();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        oppened_connections: databaseOpennedConnectionsValue,
      },
    },
  });
}

export default status;
