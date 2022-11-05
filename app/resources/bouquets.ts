import axios from 'axios'

import BouquetType from '../types/bouquet'

export const getBouquets = async () => {
    const res = await axios.get<BouquetType[]>('/api/bouquets')
    return res.data
} 