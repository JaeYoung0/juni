import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

type TimePickerDialogProps = {
  time: Dayjs | null
  handleChange: (newValue: dayjs.Dayjs | null) => void
}
export default function TimePickerDialog({ time, handleChange }: TimePickerDialogProps) {
  const ref = React.useRef<HTMLDialogElement | null>(null)
  const open = () => ref.current?.showModal()

  React.useEffect(() => {
    !ref.current?.open ? open() : close()
  }, [])

  return (
    <dialog ref={ref} style={{ height: '500px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Basic example"
          value={time}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </dialog>
  )
}
