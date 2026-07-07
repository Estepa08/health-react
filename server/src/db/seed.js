import 'dotenv/config'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sql = neon(process.env.DATABASE_URL)

const files = [
  '01_themes.sql',
  '02_questions_anxiety.sql',
  '03_questions_burnout.sql',
  '04_questions_cognitive.sql',
  '05_questions_depression.sql',
  '06_result_levels.sql',
]

for (const file of files) {
  const filePath = path.join(__dirname, file)
  const content = readFileSync(filePath, 'utf-8')
  const statements = content
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)

  console.log(`Applying ${file}...`)
  for (const statement of statements) {
    await sql.query(statement)
  }
}

console.log('Seed complete.')
