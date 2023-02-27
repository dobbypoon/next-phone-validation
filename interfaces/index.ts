export interface AreaCodeList {
  list: {
    code: string
    label: string
    phone: string
  }[]
}

export interface PhoneLookupResult {
  valid: boolean
  local_format: string
  intl_format: string
  country_code: string
  country_name: string
  location: string
  carrier: string
  line_type: string
}

export interface ApiErrorResponse {
  message: string
}
