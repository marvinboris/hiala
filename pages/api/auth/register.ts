// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

import Status from '../../../app/enums/status';
import { generateString, handleError } from '../../../app/helpers/utils'
import User from '../../../app/models/user'
import XtreamUser from '../../../app/models/xtream/user'

import sendMail from '../../../lib/nodemailer';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ status: Status, message?: string }>
) {
    const { first_name, last_name, email, code, phone } = req.body
    try {
        const response = await axios.post<{ username: string, password: string }>(`${process.env.API_HOSTNAME!}/users/create`, { name: `${first_name} ${last_name}`, phone: `${code}${phone}`, email })
        console.log(response.data)
        const { username, password } = response.data
        // const username = generateString(10)
        // const password = generateString(10)
        sendMail({
            to: email,
            subject: 'Bienvenue chez Hiala',
            html: `
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/plus-jakarta-display.min.css" />
                <main style="font-family: 'Plus Jakarta Display', sans-serif; color: #5A657D;">
                    <h2>Votre compte a bien été créé</h2>
                    <p>Vous pouvez vous y connecter en utilisant les paramètres suivants :</p>
                    <ul>
                    <li>Nom d'utilisateur : <strong>${username}</strong></li>
                    <li>Mot de passe : <strong>${password}</strong></li>
                    </ul>
                </main>
            `
        })

        res.json({ status: Status.IDLE })
    } catch (error) {
        handleError(res, error)
    }
}