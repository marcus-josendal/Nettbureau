import {ErrorResponse} from 'nettbureau_common'
import {AxiosError} from 'axios'

export interface InvalidFormError extends AxiosError {
  data: {
    response: {
      error: ErrorResponse[]
    }
  }
}
