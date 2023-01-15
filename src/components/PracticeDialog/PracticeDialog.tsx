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
import { usePlanList } from '@/domain/plan'

export type PracticeDialogRefType = {
  showModal: (payload?: Partial<PracticeItem>) => void
}

type Props = Record<string, unknown>
function PracticeDialog({ ...props }: Props, ref: React.Ref<PracticeDialogRefType>) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useImperativeHandle(ref, () => ({
    showModal: (payload?: Partial<PracticeItem>) => {
      const isNew = !payload?.title && !payload?.content

      if (!isNew) {
        setMode('update')

        // setTimeRange, setTitle, setContent는 PlanDialog와 완전 동일. practiceId도 이름만 다름.
        //  setColor는 Practice Collection에 직접 넣지는 않을 생각이라 필요없음
        if (payload.startTime && payload.endTime) {
          setTimeRange({
            start: {
              hour: Math.floor(payload.startTime / 60),
              min: payload.startTime % 60,
            },
            end: { hour: Math.floor(payload.endTime / 60), min: payload.endTime % 60 },
          })
        }
        if (payload.title) {
          setTitle(payload.title)
        }

        if (payload.content) {
          setContent(payload.content)
        }

        if (payload.id) {
          setPracticeId(payload.id)
        }
      } else {
        setMode('create')
        if (payload?.startTime && payload?.endTime) {
          setTimeRange({
            start: {
              hour: Math.floor(payload.startTime / 60),
              min: payload.startTime % 60,
            },
            end: { hour: Math.floor(payload.endTime / 60), min: payload.endTime % 60 },
          })
        }
      }

      dialogRef.current?.showModal()
    },
  }))

  const [currentUnix] = useCalendarAtom()

  // state가 너무 많다!
  const [title, setTitle] = useState('')
  console.log('@@title', title)

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

  const { data: planList } = usePlanList()
  const planTitles = planList?.map((item) => item.title)

  return (
    <S.Dialog ref={dialogRef} onClose={handleClose} onSubmit={handleSubmit}>
      <S.DialogTitle>
        {mode === 'create' ? '[실행 아이템 추가]' : '[실행 아이템 수정]'}
      </S.DialogTitle>

      <S.Form method="dialog">
        <S.CloseButton type="reset" onClick={handleCancel}>
          X
        </S.CloseButton>
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
          <S.Select
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            style={{ width: '100%' }}
          >
            <option></option>
            {planTitles?.map((item, idx) => (
              <option key={idx}>{item}</option>
            ))}
            <option>계획에 없던 일</option>
          </S.Select>
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
