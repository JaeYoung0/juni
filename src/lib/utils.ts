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

export const unixToUTC = (unix: number) => dayjs.unix(unix).utc()

export const isNumeric = (data: string | number) => {
  return !isNaN(Number(data))
}

/**
 * db에 utc로 저장한 경우와(string), 분단위로 저장한 경우를 모두 대응하여 (2시 => 120)
 * 분단위로 저장한 값을 리턴한다.
 */
export const totalMinParser = (time: string | number) => {
  let _time = 0
  if (isNumeric(time)) {
    _time = Number(time)
  } else {
    _time = dayjs.utc(time).local().hour() * 60 + dayjs.utc(time).local().minute()
  }

  return _time
}
