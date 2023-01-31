import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import * as CS from '../common.style'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import TextField from '@mui/material/TextField'
import { css } from '@emotion/react'
import { PlanItem } from '@/domain/plan'
import { PracticeItem } from '@/domain/practice'
import { SetterOrUpdater } from 'recoil'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'

type Props<T extends PlanItem | PracticeItem> = {
  item: T
  setItem: SetterOrUpdater<T>
}
export default function PlanBody({ item, setItem }: Props<PlanItem | PracticeItem>) {
  return (
    <>
      <CS.Row>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div
            css={css`
              display: flex;
              width: 100%;
              justify-content: space-between;
            `}
          >
            <MobileDateTimePicker
              label="시작 시간"
              value={dayjs(item.startTime)}
              onChange={(newValue) =>
                setItem({
                  ...item,
                  startTime: dayjs(newValue).utc().format(),
                })
              }
              renderInput={(params) => <TextField {...params} />}
            />

            <MobileDateTimePicker
              label="종료 시간"
              value={dayjs(item.endTime)}
              onChange={(newValue) => setItem({ ...item, endTime: dayjs(newValue).utc().format() })}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </LocalizationProvider>
      </CS.Row>

      <CS.Row>
        <CS.ContentTextArea
          value={item.content}
          required
          onChange={(e) => setItem({ ...item, content: e.target.value })}
          placeholder="메모"
        />
      </CS.Row>
    </>
  )
}
