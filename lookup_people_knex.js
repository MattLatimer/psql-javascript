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

const term = process.argv[2];

const printNames = (result) => {
  console.log(`Found ${result.length} person(s) by the name '${term}':`);
  result.forEach((found) => {
    console.log(`- ${found.id}: ${found.first_name} ${found.last_name}, born ${found.birthdate.toDateString()}`);
  });
};

knex('famous_people').select().where('first_name', term).orWhere('last_name', term)
  .asCallback( (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      printNames(result);
    }
    knex.destroy();
  });
