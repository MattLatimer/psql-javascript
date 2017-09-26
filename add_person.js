const settings = require('./settings');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.host,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

const details = process.argv.slice(2);

knex.insert({first_name: details[0], last_name: details[1], birthdate: details[2]})
  .into('famous_people').asCallback((err, result) => {
    if (err) {
      console.log('Error');
    } else {
      console.log('Entered');
    }
    knex.destroy();
  });