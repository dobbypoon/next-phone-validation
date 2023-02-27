import React, { useContext } from 'react'
import useSWRMutation from 'swr/mutation'
import ContentWrapper from '@/components/layout/ContentWrapper'
import { SubmitHandler, useForm } from 'react-hook-form'
import { fetcher, lookupPhoneFetcher } from '@/utils/utils'
import useSWR from 'swr'
import { AreaCodeList, PhoneLookupResult } from '@/interfaces'
import { useRouter } from 'next/router'
import { HistoryContext } from '@/pages/_app'
import cn from 'classnames'
import styles from './Home.module.css'
import headerImg from '../public/home_background.webp'

const HK_AREA_CODE = '852'

interface IFormInput {
  areaCode: string
  phone: string
}

export default function Home() {
  const router = useRouter()
  const { history, setHistory } = useContext(HistoryContext)

  const { data: areaCodeListData } = useSWR<AreaCodeList>(
    '/api/area_code_list',
    fetcher,
  )
  const { trigger: lookupPhoneTrigger, isMutating: lookupPhoneIsMutating } =
    useSWRMutation<PhoneLookupResult>('/api/phone_lookup', lookupPhoneFetcher)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      areaCode: HK_AREA_CODE,
    },
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const result = await lookupPhoneTrigger((data.areaCode + data.phone) as any)
    // console.log('result', result)

    // const result = {
    //   valid: true,
    //   number: '85223748954',
    //   local_format: '23748954',
    //   international_format: '+85223748954',
    //   country_prefix: '+852',
    //   country_code: 'HK',
    //   country_name: 'Hong Kong, China',
    //   location: '',
    //   carrier: '',
    //   line_type: 'landline',
    // }
    setHistory([
      ...history,
      { areaCode: data.areaCode, phone: data.phone, result },
    ])
    router.push('/history')
  }

  return (
    <ContentWrapper headerImg={headerImg}>
      <div className={styles.grid}>
        <div className={cn('md:pr-10', styles.intro)}>
          <h1 className="text-5xl mb-4">Phone Validation</h1>
          <p>Validate your phone here</p>
        </div>
        <form
          className={cn('flex flex-col gap-4 md:pl-10')}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          {areaCodeListData && (
            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="area-code-select">Area Code</label>
              <select
                className={styles.formInput}
                id="area-code-select"
                {...register('areaCode', {
                  required: { value: true, message: 'this field is required' },
                })}
              >
                {areaCodeListData.list.map((it) => (
                  <option key={it.code} value={it.phone}>
                    {`${it.label} (${it.code}) +${it.phone}`}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              Phone Number
              <input
                maxLength={12}
                className={styles.formInput}
                placeholder="(e.g. 98765432)"
                type="tel"
                {...register('phone', {
                  required: {
                    value: true,
                    message: 'this field is required',
                  },
                  pattern: {
                    value: /\d{6,12}/,
                    message: 'invalid phone number',
                  },
                })}
              />
              {errors.phone && (
                <p className={styles.errorMessage}>{errors.phone.message}</p>
              )}
            </label>
          </div>
          <button
            className={styles.submitBtn}
            type="submit"
            disabled={lookupPhoneIsMutating}
          >
            {lookupPhoneIsMutating ? 'Loading...' : 'Check!'}
          </button>
        </form>
      </div>
    </ContentWrapper>
  )
}
