import Axios, { AxiosResponse } from 'axios'
import { FormKeys } from 'nettbureau_common'

export const sendUserData = (userData: Record<FormKeys, string>): Promise<AxiosResponse<void>> => {
    return Axios.post('/api/user', userData)
}
