import {
  pgTable,
  text,
  serial,
  integer,
  smallint,
  jsonb,
  unique,
  timestamp,
  boolean,
  check,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

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
  themeId: text('theme_id').references(() => themes.id, { onDelete: 'cascade' }),
  minScore: integer('min_score').notNull(),
  maxScore: integer('max_score').notNull(),
  title: text('title').notNull(),
  emoji: text('emoji'),
  description: text('description'),
})

export const distortionGames = pgTable('distortion_games', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  orderNumber: integer('order_number').notNull(),
})

export const distortionCards = pgTable(
  'distortion_cards',
  {
    id: serial('id').primaryKey(),
    gameId: text('game_id')
      .notNull()
      .references(() => distortionGames.id, { onDelete: 'cascade' }),
    cardNumber: integer('card_number').notNull(),
    thought: text('thought').notNull(),
    isDistorted: boolean('is_distorted').notNull(),
  },
  (table) => [unique().on(table.gameId, table.cardNumber)]
)

export const distortionAttempts = pgTable('distortion_attempts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  gameId: text('game_id')
    .notNull()
    .references(() => distortionGames.id, { onDelete: 'cascade' }),
  correctCount: integer('correct_count').notNull(),
  incorrectCount: integer('incorrect_count').notNull(),
  unsureCount: integer('unsure_count').notNull(),
  totalCount: integer('total_count').notNull(),
  scorePercent: integer('score_percent').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Отдельная тренировка по искажениям: ситуация + 3 варианта ответа со шкалой 0-2.
// Не связана с distortion_games/distortion_cards.
export const distortionTypes = pgTable('distortion_types', {
  slug: text('slug').primaryKey(),
  nameRu: text('name_ru').notNull(),
})

export const distortionSituations = pgTable('distortion_situations', {
  id: serial('id').primaryKey(),
  distortionSlug: text('distortion_slug')
    .notNull()
    .references(() => distortionTypes.slug),
  situationText: text('situation_text').notNull(),
})

export const distortionOptions = pgTable(
  'distortion_options',
  {
    id: serial('id').primaryKey(),
    situationId: integer('situation_id')
      .notNull()
      .references(() => distortionSituations.id, { onDelete: 'cascade' }),
    optionText: text('option_text').notNull(),
    score: smallint('score').notNull(),
  },
  (table) => [check('distortion_options_score_check', sql`${table.score} IN (0, 1, 2)`)]
)

export const distortionTrainingAttempts = pgTable('distortion_training_attempts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  distortionSlug: text('distortion_slug')
    .notNull()
    .references(() => distortionTypes.slug),
  situationsCount: integer('situations_count').notNull(),
  totalScore: integer('total_score').notNull(),
  maxScore: integer('max_score').notNull(),
  scorePercent: integer('score_percent').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
