import { NextApiRequest, NextApiResponse } from 'next'
import { ApiErrorResponse, PhoneLookupResult } from '@/interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PhoneLookupResult | ApiErrorResponse>,
) {
  const { query } = req
  const { number } = query

  if (typeof number === 'string') {
    const searchParams = new URLSearchParams({
      number,
    })
    const url = 'https://api.apilayer.com/number_verification/validate?'
    const response = await fetch(url + searchParams, {
      headers: { apiKey: process.env.PHONE_LOOKUP_KEY as string },
      method: 'GET',
    })
    return res.status(200).json((await response.json()) as any)
  }
  return res.status(500).json({ message: 'Invalid phone number' })
}
