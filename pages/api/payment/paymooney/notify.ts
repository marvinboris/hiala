// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import { handleError } from '../../../../app/helpers/utils'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ error: string }>
) {
    const { item_ref, error_code } = req.body as {
        status: string
        ref_payment: string
        transaction_number: string
        public_key: string
        amount_received: number
        amount: number
        phone: string
        operator: string
        currency: string
        fees: number
        item_ref: string
        item_name: string
        description: string
        email: string
        name: string
        country: string
        postal_code: string
        error_code: string
        error_message: string
        sign_token: string
        environement: string
    }
    try {
        if (error_code === '') {
            const [username, id] = item_ref.split('_')
            const response = await axios.post<any>(`${process.env.API_HOST!}/bouquet`, { username, id })
            res.status(200).redirect('/pricing/success')
        } else {
            res.status(402).redirect('/pricing/failure')
        }
    } catch (error) {
        handleError(res, error)
    }
}