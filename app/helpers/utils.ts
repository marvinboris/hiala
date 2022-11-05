import Status from "../enums/status"

export const handleError = (res: any, error: any) => {
    console.log(error)
    res.status(500).send({ status: Status.FAILED, message: 'Failed to fetch data' })
}

export const decryptPayload = (str: string) => {
    const withoutJ = str.split('').filter((char, i) => i > 1).join('')

    return JSON.parse(withoutJ)
}

export const classNames = (...c: string[]) => c.join(' ')

export const generateString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}