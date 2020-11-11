// Create Student Table Migration
exports.up = function (knex) {
  return Promise.all([
    knex.schema.withSchema('prisma').createTable('student', function (table) {
      table.uuid('uuid').defaultTo(knex.raw('uuid_generate_v4()')).primary()
      table.string('name').notNull()
      table.integer('grade').notNull()
    }),
    knex.schema.withSchema('prisma').createTable('_CourseToStudent', function (table) {
      table.uuid('A').notNull()
      table.uuid('B').notNull()

      table.unique(['A', 'B'], 'course_student_unique')
      table.index('B', 'course_student_index')

      table.foreign('A').references('uuid').inTable('prisma.course').onUpdate('CASCADE').onDelete('CASCADE')
      table.foreign('B').references('uuid').inTable('prisma.student').onUpdate('CASCADE').onDelete('CASCADE')
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.withSchema('prisma').dropTable('_StudentToCourse'),
    knex.schema.withSchema('prisma').dropTable('student')
  ])
};
