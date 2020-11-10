// Initialize Database Migration + Teacher Table
exports.up = function (knex) {
  return Promise.all([
    knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'),
    knex.raw('CREATE SCHEMA IF NOT EXISTS prisma'),
    knex.schema.withSchema('prisma').createTable('teacher', function (table) {
      table.uuid('uuid').defaultTo(knex.raw('uuid_generate_v4()')).primary()
      table.string('name').notNull()
      table.specificType('grades', 'text ARRAY')
    })
  ])
};

exports.down = function (knex) {
  return knex.schema.withSchema('prisma').dropTable('teacher')
};
