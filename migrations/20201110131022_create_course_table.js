// Create Course Table Migration
exports.up = function (knex) {
  return knex.schema.withSchema('prisma').createTable('course', function (table) {
    table.uuid('uuid').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('class_name').notNull()
    table.string('description')

    table.uuid('teacherUuid')
    table.foreign('teacherUuid').references('uuid').inTable('prisma.teacher')
  })
};

exports.down = function (knex) {
  return knex.schema.withSchema('prisma').dropTable('course')
};
