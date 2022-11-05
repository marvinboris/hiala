import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { handleError } from "../../app/helpers/utils";
import BouquetType from "../../app/types/bouquet";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<BouquetType[] | { error: string }>
) {
    try {
        const response = await axios.get<{ status: string, code: number, message: string, data: BouquetType[] }>(`${process.env.API_HOSTNAME!}/bouquets`)
        const { status, code, message, data } = response.data
        res.status(code).json(data)
    } catch (error) {
        handleError(res, error)
    }
}