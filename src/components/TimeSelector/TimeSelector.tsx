import { ScheduleItem } from '@/domain/Schedule/schedule'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  onDialogClose: (payload: Omit<ScheduleItem, 'dateTime'>) => void
}

export type TimeSelectorRef = {
  showModal: (payload?: ScheduleItem) => void
}

function TimeSelector({ onDialogClose }: Props, ref: React.Ref<TimeSelectorRef>) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const [mode, setMode] = useState<'create' | 'update'>('create')

  // range는 분 단위로 저장. ex) 10 ~ 140분은 00:10 ~ 02:20분을 의미함.
  const [range, setRange] = useState({
    start: { hour: 0, min: 0 },
    end: { hour: 0, min: 0 },
  })

  const [content, setContent] = useState('')

  useImperativeHandle(ref, () => ({
    showModal: (payload?: ScheduleItem) => {
      if (payload) {
        setMode('update')
        setRange({
          start: { hour: Math.floor(payload.range.start / 60), min: payload.range.start % 60 },
          end: { hour: Math.floor(payload.range.end / 60), min: payload.range.end % 60 },
        })
        setContent(payload.content)
      } else {
        setMode('create')
      }

      dialogRef.current?.showModal()
    },
  }))

  const handleClose = () => {
    onDialogClose({
      id: uuidv4(),
      range: {
        start: range.start.hour * 60 + range.start.min,
        end: range.end.hour * 60 + range.end.min,
      },
      content,
    })
    setRange({ start: { hour: 0, min: 0 }, end: { hour: 0, min: 0 } })
    setContent('')
  }

  return (
    <dialog ref={dialogRef} style={{ width: '32rem', height: '20rem' }} onClose={handleClose}>
      <form method="dialog">
        <p>{mode === 'create' ? '스케줄 추가' : '스케줄 수정'}</p>
        <select
          value={range.start.hour}
          required
          onChange={(e) => {
            setRange({
              ...range,
              start: { ...range.start, hour: Number(e.target.value) },
            })
          }}
        >
          {Array.from({ length: 24 }, (_, i) => i).map((item, j) => (
            <option key={j}>{item}</option>
          ))}
        </select>
        <label>시</label>

        <select
          value={range.start.min}
          required
          onChange={(e) => {
            setRange({
              ...range,
              start: { ...range.start, min: Number(e.target.value) },
            })
          }}
        >
          {Array.from({ length: 60 }, (_, i) => i).map((item, j) => (
            <option key={j}>{item}</option>
          ))}
        </select>
        <label>분</label>
        <span>{` `}부터</span>

        <select
          value={range.end.hour}
          required
          onChange={(e) => {
            setRange({
              ...range,
              end: { ...range.end, hour: Number(e.target.value) },
            })
          }}
        >
          {Array.from({ length: 24 }, (_, i) => i).map((item, j) => (
            <option key={j}>{item}</option>
          ))}
        </select>
        <label>시</label>

        <select
          value={range.end.min}
          required
          onChange={(e) => {
            setRange({
              ...range,
              end: { ...range.end, min: Number(e.target.value) },
            })
          }}
        >
          {Array.from({ length: 60 }, (_, i) => i).map((item, j) => (
            <option key={j}>{item}</option>
          ))}
        </select>
        <label>분</label>
        <span>{` `}까지</span>

        <div>
          <textarea
            style={{ width: '100%', height: '10rem' }}
            value={content}
            required
            onChange={(e) => {
              setContent(e.target.value)
            }}
            placeholder="무슨일"
          />
        </div>

        {mode === 'create' && (
          <div>
            <button
              type="reset"
              onClick={() => {
                dialogRef.current?.close()
              }}
            >
              취소
            </button>
            <button type="submit">확인</button>
          </div>
        )}

        {mode === 'update' && (
          <div>
            <button
              type="reset"
              onClick={() => {
                // dialogRef.current?.close()
                // 삭제
              }}
            >
              삭제
            </button>
            <button type="submit">수정</button>
          </div>
        )}
      </form>
    </dialog>
  )
}

export default forwardRef<any, Props>(TimeSelector)
