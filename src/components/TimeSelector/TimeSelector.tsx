import { ScheduleItem } from '@/domain/schedule/schedule'
import dayjs from 'dayjs'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as S from './style'
type Props = {
  onDialogClose: (payload: Omit<ScheduleItem, 'date'>) => void
}

export type TimeSelectorRef = {
  showModal: (payload?: ScheduleItem) => void
}

function TimeSelector({ onDialogClose }: Props, ref: React.Ref<TimeSelectorRef>) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const [title, setTitle] = useState('')
  const [mode, setMode] = useState<'create' | 'update'>('create')

  // range는 분 단위로 저장. ex) 10 ~ 140분은 00:10 ~ 02:20분을 의미함.
  const [timeRange, setTimeRange] = useState({
    start: { hour: 0, min: 0 },
    end: { hour: 0, min: 0 },
  })

  const [content, setContent] = useState('')

  useImperativeHandle(ref, () => ({
    showModal: (payload?: ScheduleItem) => {
      if (payload) {
        setMode('update')
        setTimeRange({
          start: {
            hour: Math.floor(payload.timeRange.start / 60),
            min: payload.timeRange.start % 60,
          },
          end: { hour: Math.floor(payload.timeRange.end / 60), min: payload.timeRange.end % 60 },
        })
        setTitle(payload.title)
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
      timeRange: {
        start: timeRange.start.hour * 60 + timeRange.start.min,
        end: timeRange.end.hour * 60 + timeRange.end.min,
      },
      title,
      content,
    })
    setTimeRange({ start: { hour: 0, min: 0 }, end: { hour: 0, min: 0 } })
    setContent('')
  }

  const [time, setTime] = useState('')
  console.log('@@time', time, dayjs(time).unix())

  return (
    <dialog ref={dialogRef} style={{ width: '32rem', height: '20rem' }} onClose={handleClose}>
      <form method="dialog">
        <p>{mode === 'create' ? '스케줄 추가' : '스케줄 수정'}</p>

        <select
          value={timeRange.start.hour}
          required
          onChange={(e) => {
            setTimeRange({
              ...timeRange,
              start: { ...timeRange.start, hour: Number(e.target.value) },
            })
          }}
        >
          {Array.from({ length: 24 }, (_, i) => i).map((item, j) => (
            <option key={j}>{item}</option>
          ))}
        </select>
        <label>시</label>

        <select
          value={timeRange.start.min}
          required
          onChange={(e) => {
            setTimeRange({
              ...timeRange,
              start: { ...timeRange.start, min: Number(e.target.value) },
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
          value={timeRange.end.hour}
          required
          onChange={(e) => {
            setTimeRange({
              ...timeRange,
              end: { ...timeRange.end, hour: Number(e.target.value) },
            })
          }}
        >
          {Array.from({ length: 24 }, (_, i) => i).map((item, j) => (
            <option key={j}>{item}</option>
          ))}
        </select>
        <label>시</label>

        <select
          value={timeRange.end.min}
          required
          onChange={(e) => {
            setTimeRange({
              ...timeRange,
              end: { ...timeRange.end, min: Number(e.target.value) },
            })
          }}
        >
          {Array.from({ length: 60 }, (_, i) => i).map((item, j) => (
            <option key={j}>{item}</option>
          ))}
        </select>
        <label>분</label>
        <span>{` `}까지</span>

        <S.Row>
          <S.TitleInput
            type="text"
            required
            placeholder="제목"
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.Row>

        <div>
          <textarea
            style={{ width: '100%', height: '10rem' }}
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
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
                dialogRef.current?.close()
                // 삭제
              }}
            >
              취소
            </button>
            <button type="submit">수정</button>
          </div>
        )}
      </form>
    </dialog>
  )
}

export default forwardRef<any, Props>(TimeSelector)
