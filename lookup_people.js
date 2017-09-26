const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.host,
  port: settings.port,
  ssl: settings.ssl
});

const term = process.argv[2];

const printNames = (result) => {
  console.log(`Found ${result.length} person(s) by the name '${term}':`);
  result.forEach((found) => {
    console.log(`- ${found.id}: ${found.first_name} ${found.last_name}, born ${found.birthdate.toDateString()}`);
  });
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1;`,
    [`${term}`], (err, result) => {
      if (err) {
        return console.error("Error running query", err);
      }
      printNames(result.rows);
      client.end();
    });
});