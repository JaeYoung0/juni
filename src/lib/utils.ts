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
 * @deprecated
 * time이 utc인 경우와(2023-01-18T14:02:33Z), 분단위로 저장한 경우(120) 모두에 대응하여
 * utc 값을(120) 리턴한다.
 *
 * startTime, endTime은 무조건 utc를 ISO8601 형식으로 저장한다.
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

// https://gist.github.com/danieliser/b4b24c9f772066bcf0a6
export const convertHexToRGBA = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100
  }

  return `rgba(${r},${g},${b},${opacity})`
}

const checkMidnight = (endTime: string) =>
  dayjs(endTime).hour() === 0 && dayjs(endTime).minute() === 0

export const getEndTime = ({ currentUnix, hour }: { currentUnix: number; hour: number }) => {
  const endTime = unixToUTC(currentUnix)
    .add(hour + 1, 'h')
    .format()

  const isMidnight = checkMidnight(endTime)

  // 자정을 00:00:00에서 전날 23:59:59로 보정한다.
  if (isMidnight) {
    return dayjs(endTime).subtract(1, 's').format()
  }

  return endTime
}
