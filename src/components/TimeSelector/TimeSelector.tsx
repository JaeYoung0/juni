import { useCalendarAtom } from '@/domain/calendar/calendar'
import { ScheduleItem } from '@/domain/schedule/schedule'
import { useUserAtom } from '@/domain/user'
import {
  deleteScheduleItem,
  useCreateScheduleItem,
  useDeleteScheduleItem,
  useUpdateScheduleItem,
} from '@/service/schedule'

import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as S from './style'
type Props = Record<string, unknown>

export type TimeSelectorRef = {
  showModal: (payload?: ScheduleItem) => void
}

function TimeSelector({ ...props }: Props, ref: React.Ref<TimeSelectorRef>) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const [title, setTitle] = useState('')
  const [mode, setMode] = useState<'create' | 'update'>('create')

  // range는 분 단위로 저장. ex) 10 ~ 140분은 00:10 ~ 02:20분을 의미함.
  const [timeRange, setTimeRange] = useState({
    start: { hour: 0, min: 0 },
    end: { hour: 0, min: 0 },
  })

  const [currentUnix] = useCalendarAtom()

  const [content, setContent] = useState('')
  const [scheduleId, setScheduleId] = useState('')

  const [userAtom] = useUserAtom()

  const createScheduleItem = useCreateScheduleItem()
  const updateScheduleItem = useUpdateScheduleItem()
  const deleteScheduleItem = useDeleteScheduleItem()

  useImperativeHandle(ref, () => ({
    showModal: (payload?: ScheduleItem) => {
      if (payload) {
        setMode('update')
        setTimeRange({
          start: {
            hour: Math.floor(payload.startTime / 60),
            min: payload.startTime % 60,
          },
          end: { hour: Math.floor(payload.endTime / 60), min: payload.endTime % 60 },
        })
        setTitle(payload.title)
        setContent(payload.content)
        setScheduleId(payload.id)
      } else {
        setMode('create')
      }

      dialogRef.current?.showModal()
    },
  }))

  const handleClose = () => {
    // void createScheduleItem()
    setTimeRange({ start: { hour: 0, min: 0 }, end: { hour: 0, min: 0 } })
    setTitle('')
    setContent('')

    console.log('@@closed 2')
  }

  const handleSubmit = () => {
    if (mode === 'create') {
      createScheduleItem.mutate({
        currentUnix,
        startTime: timeRange.start.hour * 60 + timeRange.start.min,
        endTime: timeRange.end.hour * 60 + timeRange.end.min,
        title,
        content,
        userId: userAtom.userId,
      })
    } else {
      updateScheduleItem.mutate({
        currentUnix,
        startTime: timeRange.start.hour * 60 + timeRange.start.min,
        endTime: timeRange.end.hour * 60 + timeRange.end.min,
        title,
        content,
        userId: userAtom.userId,
        id: scheduleId,
      })
    }

    setTimeRange({ start: { hour: 0, min: 0 }, end: { hour: 0, min: 0 } })
    setTitle('')
    setContent('')
  }

  return (
    <dialog
      ref={dialogRef}
      style={{ width: '32rem', height: '20rem' }}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
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
            value={title}
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

            <button
              style={{ marginLeft: '3rem', color: 'red' }}
              onClick={() => {
                void deleteScheduleItem.mutate({
                  userId: userAtom.userId,
                  currentUnix,
                  id: scheduleId,
                })
              }}
            >
              삭제
            </button>
          </div>
        )}
      </form>
    </dialog>
  )
}

export default forwardRef<any, Props>(TimeSelector)
