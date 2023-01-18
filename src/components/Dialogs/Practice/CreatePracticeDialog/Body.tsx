import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import * as CS from '@/components/Dialogs/Plan/common.style'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import TextField from '@mui/material/TextField'
import { css } from '@emotion/react'
import { PlanItem, usePlanList } from '@/domain/plan'
import { PracticeItem } from '@/domain/practice'
import { SetterOrUpdater } from 'recoil'
import Autocomplete from '@mui/material/Autocomplete'

type Props<T extends PlanItem | PracticeItem> = {
  item: T
  setItem: SetterOrUpdater<T>
  type: 'create' | 'update'
}
export default function Body({ item, setItem, type }: Props<PlanItem | PracticeItem>) {
  const { data: planList } = usePlanList()
  const planTitles = planList?.map((item) => item.title)

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
              value={dayjs(item.startTime)}
              onChange={(newValue) =>
                setItem({
                  ...item,
                  startTime: dayjs(newValue).utc().format(),
                })
              }
              renderInput={(params) => <TextField {...params} />}
            />

            <TimePicker
              label="종료 시간"
              value={dayjs(item.endTime)}
              onChange={(newValue) => setItem({ ...item, endTime: dayjs(newValue).utc().format() })}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </LocalizationProvider>
      </CS.Row>

      <CS.Row>
        {/* form 상태를 사용했다면 required를 쉽게 사용했을텐데 ... */}
        <Autocomplete
          value={item.title}
          disabled={type === 'update'}
          onChange={(event: any, newValue: string | null) => {
            setItem({ ...item, title: newValue ?? '' })
          }}
          options={planTitles ?? []}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="계획했던 일" />}
        />
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
