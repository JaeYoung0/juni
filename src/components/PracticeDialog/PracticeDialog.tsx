import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import * as S from '@/components/PlanDialog/style'
import { useCalendarAtom } from '@/domain/calendar'
import { PracticeItem } from '@/domain/practice'
import {
  useCreatePracticeItem,
  useDeletePracticeItem,
  useUpdatePracticeItem,
} from '@/service/practice'
import { useUserAtom } from '@/domain/user'

export type PracticeDialogRefType = {
  showModal: (payload?: PracticeItem) => void
}

type Props = Record<string, unknown>
function PracticeDialog({ ...props }: Props, ref: React.Ref<PracticeDialogRefType>) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useImperativeHandle(ref, () => ({
    showModal: (payload?: PracticeItem) => {
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
        setPracticeId(payload.id)
      } else {
        setMode('create')
      }

      dialogRef.current?.showModal()
    },
  }))

  const [currentUnix] = useCalendarAtom()

  // state가 너무 많다!
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [practiceId, setPracticeId] = useState('')
  const [timeRange, setTimeRange] = useState({
    start: { hour: 0, min: 0 },
    end: { hour: 0, min: 0 },
  })

  const [mode, setMode] = useState<'create' | 'update'>('create')

  const handleClose = () => {
    // 초기화
    setTimeRange({ start: { hour: 0, min: 0 }, end: { hour: 0, min: 0 } })
    setTitle('')
    setContent('')
  }

  const [userAtom] = useUserAtom()
  const createPracticeItem = useCreatePracticeItem()
  const updatePracticeItem = useUpdatePracticeItem()
  const deletePracticeItem = useDeletePracticeItem()

  const handleSubmit = () => {
    if (mode === 'create') {
      createPracticeItem.mutate({
        currentUnix,
        startTime: timeRange.start.hour * 60 + timeRange.start.min,
        endTime: timeRange.end.hour * 60 + timeRange.end.min,
        title,
        content,
        userId: userAtom.userId,
      })
    } else {
      updatePracticeItem.mutate({
        currentUnix,
        startTime: timeRange.start.hour * 60 + timeRange.start.min,
        endTime: timeRange.end.hour * 60 + timeRange.end.min,
        title,
        content,
        userId: userAtom.userId,
        id: practiceId,
      })
    }
  }

  const handleDelete = () => {
    void deletePracticeItem.mutate({
      userId: userAtom.userId,
      currentUnix,
      id: practiceId,
    })
  }

  const handleCancel = () => {
    dialogRef.current?.close()
  }

  return (
    <S.Dialog ref={dialogRef} onClose={handleClose} onSubmit={handleSubmit}>
      <S.DialogTitle>
        {mode === 'create' ? '[실행 아이템 추가]' : '[실행 아이템 수정]'}
      </S.DialogTitle>

      <S.Form method="dialog">
        <S.CloseButton onClick={handleCancel}>X</S.CloseButton>
        <S.Row>
          <S.Select
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
          </S.Select>
          <S.Label>{` 시 `}</S.Label>

          <S.Select
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
          </S.Select>
          <S.Label>{` 분  ~ `}</S.Label>

          <S.Select
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
          </S.Select>
          <S.Label>{` 시 `}</S.Label>

          <S.Select
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
          </S.Select>
          <S.Label>{` 분 `}</S.Label>
        </S.Row>

        <S.Row>
          <S.TitleInput
            type="text"
            required
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.Row>

        <S.ContentTextArea
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          placeholder="메모"
        />

        {mode === 'create' && (
          <S.ButtonsWrapper>
            <S.Button type="submit">추가</S.Button>
          </S.ButtonsWrapper>
        )}

        {mode === 'update' && (
          <S.ButtonsWrapper>
            <S.Button style={{ color: '#000' }} onClick={handleDelete}>
              삭제
            </S.Button>
            <S.Button type="submit">수정</S.Button>
          </S.ButtonsWrapper>
        )}
      </S.Form>
    </S.Dialog>
  )
}

export default forwardRef<any, Props>(PracticeDialog)
