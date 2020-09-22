import Axios, { AxiosResponse } from 'axios'
import { FormKeys } from '@/types/FormKeys'


export const sendUserData = (userData: Record<FormKeys, string>): Promise<AxiosResponse<any>> => {
    return Axios.post('/api/user', userData)
}
