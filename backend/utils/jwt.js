import crypto from 'crypto'

function base64Url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function parseDuration(value = '7d') {
  const match = String(value).match(/^(\d+)([hd])$/)
  if (!match) return 7 * 24 * 60 * 60 * 1000

  const amount = Number(match[1])
  return match[2] === 'h' ? amount * 60 * 60 * 1000 : amount * 24 * 60 * 60 * 1000
}

function signPart(value, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(value)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export function signJwt(payload, expiresIn = '7d') {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET is required')
  }

  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Date.now()
  const body = {
    ...payload,
    iat: Math.floor(now / 1000),
    exp: Math.floor((now + parseDuration(expiresIn)) / 1000),
  }
  const unsignedToken = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(body))}`
  return `${unsignedToken}.${signPart(unsignedToken, secret)}`
}

export function verifyJwt(token) {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET is required')
  }

  const [encodedHeader, encodedPayload, signature] = String(token).split('.')

  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error('Invalid token')
  }

  const unsignedToken = `${encodedHeader}.${encodedPayload}`
  const expectedSignature = signPart(unsignedToken, secret)

  if (
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    )
  ) {
    throw new Error('Invalid token')
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'))

  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired')
  }

  return payload
}
