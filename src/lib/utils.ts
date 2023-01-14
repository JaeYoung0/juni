import dayjs from 'dayjs'

export const unixToYYYYMMDD = (unix: number) => {
  return {
    year: dayjs.unix(unix).get('year'),
    month: dayjs.unix(unix).get('month'),
    date: dayjs.unix(unix).get('date'),
  }
}
