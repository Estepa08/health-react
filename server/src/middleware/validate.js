export function requireParam(name) {
  return (req, res, next) => {
    if (!req.params[name]) {
      return res.status(400).json({ error: `Missing required parameter: ${name}` })
    }
    next()
  }
}
