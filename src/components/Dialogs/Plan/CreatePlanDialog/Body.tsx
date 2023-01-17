import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import * as CS from '../common.style'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import TextField from '@mui/material/TextField'
import { css } from '@emotion/react'
import { usePlanItemAtom } from '@/domain/plan'

export default function Body() {
  const [plan, setPlan] = usePlanItemAtom()

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
            <TimePicker
              label="시작 시간"
              value={dayjs(plan.startTime)}
              onChange={(newValue) =>
                setPlan({
                  ...plan,
                  startTime: dayjs(newValue).utc().format(),
                })
              }
              renderInput={(params) => <TextField {...params} />}
            />

            <TimePicker
              label="종료 시간"
              value={dayjs(plan.endTime)}
              onChange={(newValue) => setPlan({ ...plan, endTime: dayjs(newValue).utc().format() })}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </LocalizationProvider>
      </CS.Row>

      <CS.Row>
        <CS.TitleInput
          type="text"
          required
          placeholder="제목"
          value={plan.title}
          onChange={(e) => setPlan({ ...plan, title: e.target.value })}
        />
      </CS.Row>

      <CS.Row>
        <CS.ContentTextArea
          value={plan.content}
          required
          onChange={(e) => setPlan({ ...plan, content: e.target.value })}
          placeholder="메모"
        />
      </CS.Row>
    </>
  )
}
