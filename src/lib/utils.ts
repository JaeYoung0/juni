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
 * time이 utc인 경우와(2023-01-18T14:02:33Z), 분단위로 저장한 경우(120) 모두에 대응하여
 * 분단위 값을(120) 리턴한다.
 */
export const minParser = (time: string | number) => {
  let _time

  if (isNumeric(time)) {
    _time = Number(time)
  } else {
    _time = dayjs.utc(time).local().hour() * 60 + dayjs.utc(time).local().minute()
  }

  return _time
}

/**
 * time이 utc인 경우와(2023-01-18T14:02:33Z), 분단위로 저장한 경우(120) 모두에 대응하여
 * utc 값을(120) 리턴한다.
 */
export const utcParser = (time: string | number, currentUnix: number) => {
  let _time

  if (isNumeric(time)) {
    _time = dayjs.unix(currentUnix).add(Number(time), 'm').utc().format()
  } else {
    _time = time
  }

  return _time
}
