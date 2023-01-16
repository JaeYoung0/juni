import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker'

export default function TimePickerDialog() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'))

  const ref = React.useRef<HTMLDialogElement | null>(null)
  const open = () => ref.current?.showModal()

  React.useEffect(() => {
    !ref.current?.open ? open() : close()
  }, [])

  console.log('@@value', dayjs(value).unix())

  return (
    <dialog ref={ref} style={{ height: '500px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticTimePicker
          displayStaticWrapperAs="mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </dialog>
  )
}
