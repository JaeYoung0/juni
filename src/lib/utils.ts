import dayjs from 'dayjs'

export const unixToYYYYMMDD = (unix: number) => {
  return {
    year: dayjs.unix(unix).get('year'),
    month: dayjs.unix(unix).get('month'),
    date: dayjs.unix(unix).get('date'),
  }
}

export const getItemHeight = (startTime: number, endTime: number) => {
  // endTime이 자정일 때
  let _endTime = endTime
  if (startTime > endTime && endTime === 0) {
    _endTime = 24 * 60
  }
  return (Math.abs(_endTime - startTime) / (24 * 60)) * 100
}
