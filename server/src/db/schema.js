import { pgTable, text, serial, integer, jsonb, unique, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const themes = pgTable('themes', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  icon: text('icon'),
  questionsFile: text('questions_file'),
  length: integer('length'),
  category: text('category'),
})

export const questions = pgTable(
  'questions',
  {
    id: serial('id').primaryKey(),
    themeId: text('theme_id')
      .notNull()
      .references(() => themes.id, { onDelete: 'cascade' }),
    questionNumber: integer('question_number').notNull(),
    question: text('question').notNull(),
    options: jsonb('options').notNull(),
    category: text('category'),
  },
  (table) => [unique().on(table.themeId, table.questionNumber)]
)

export const results = pgTable('results', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  themeId: text('theme_id')
    .notNull()
    .references(() => themes.id, { onDelete: 'cascade' }),
  score: integer('score').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const resultLevels = pgTable('result_levels', {
  id: serial('id').primaryKey(),
  minScore: integer('min_score').notNull(),
  maxScore: integer('max_score').notNull(),
  title: text('title').notNull(),
  emoji: text('emoji'),
  description: text('description'),
})
