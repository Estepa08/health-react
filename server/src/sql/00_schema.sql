-- Schema for health-survey on Neon (PostgreSQL)

CREATE TABLE IF NOT EXISTS themes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  questions_file TEXT,
  length INTEGER,
  category TEXT
);

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  theme_id TEXT NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  category TEXT,
  UNIQUE (theme_id, question_number)
);

CREATE TABLE IF NOT EXISTS result_levels (
  id SERIAL PRIMARY KEY,
  min_score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  title TEXT NOT NULL,
  emoji TEXT,
  description TEXT
);
