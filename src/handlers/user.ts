import { hashPassword, createJWT, comparePasswords } from './../modules/auth'
import prisma from '../db'

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  })

  const token = createJWT(user)
  res.json({ token })
}

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  })

  const isValid = await comparePasswords(req.body.password, user.password)

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = createJWT(user)
  res.json({ token })
}
