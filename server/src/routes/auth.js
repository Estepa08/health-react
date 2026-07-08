import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import { db } from '../db/client.js'
import { users } from '../db/schema.js'

export const authRouter = Router()

function issueToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

authRouter.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Заполните все поля' })
    }

    const [existing] = await db.select().from(users).where(eq(users.email, email))
    if (existing) {
      return res.status(409).json({ error: 'Пользователь с таким email уже существует' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const [user] = await db
      .insert(users)
      .values({ name, email, passwordHash })
      .returning({ id: users.id, name: users.name, email: users.email })

    res.status(201).json({ token: issueToken(user), user })
  } catch (err) {
    next(err)
  }
})

authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Заполните все поля' })
    }

    const [user] = await db.select().from(users).where(eq(users.email, email))
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' })
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Неверный email или пароль' })
    }

    res.json({
      token: issueToken(user),
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch (err) {
    next(err)
  }
})
