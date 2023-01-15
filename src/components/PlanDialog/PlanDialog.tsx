import { useCalendarAtom } from '@/domain/calendar'
import { PlanItem } from '@/domain/plan'
import { useUserAtom } from '@/domain/user'
import { useCreatePlanItem, useDeletePlanItem, useUpdatePlanItem } from '@/service/plan'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

import * as S from './style'

export type PlanDialogRefType = {
  showModal: (payload?: Partial<PlanItem>) => void
}

type Props = Record<string, unknown>
function PlanDialog({ ...props }: Props, ref: React.Ref<PlanDialogRefType>) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const colorPickerRef = useRef<HTMLDialogElement | null>(null)

  const [userAtom] = useUserAtom()
  const [mode, setMode] = useState<'create' | 'update'>('create')

  const [currentUnix] = useCalendarAtom()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [planId, setplanId] = useState('')
  const [color, setColor] = useState('#aaa')

  // range는 분 단위로 저장. ex) 10 ~ 140분은 00:10 ~ 02:20분을 의미함.
  const [timeRange, setTimeRange] = useState({
    start: { hour: 0, min: 0 },
    end: { hour: 0, min: 0 },
  })

  const createPlanItem = useCreatePlanItem()
  const updatePlanItem = useUpdatePlanItem()
  const deletePlanItem = useDeletePlanItem()

  useImperativeHandle(ref, () => ({
    // TODO. refactor
    showModal: (payload?: Partial<PlanItem>) => {
      const isNew = !payload?.title && !payload?.content
      if (!isNew) {
        setMode('update')
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
          setplanId(payload.id)
        }

        if (payload.color) {
          setColor(payload.color)
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

  const handleClose = () => {
    setTimeRange({ start: { hour: 0, min: 0 }, end: { hour: 0, min: 0 } })
    setTitle('')
    setContent('')
  }

  const handleSubmit = () => {
    if (mode === 'create') {
      createPlanItem.mutate({
        currentUnix,
        startTime: timeRange.start.hour * 60 + timeRange.start.min,
        endTime: timeRange.end.hour * 60 + timeRange.end.min,
        title,
        content,
        userId: userAtom.userId,
        color,
      })
    } else {
      updatePlanItem.mutate({
        currentUnix,
        startTime: timeRange.start.hour * 60 + timeRange.start.min,
        endTime: timeRange.end.hour * 60 + timeRange.end.min,
        title,
        content,
        userId: userAtom.userId,
        id: planId,
        color,
      })
    }

    setTimeRange({ start: { hour: 0, min: 0 }, end: { hour: 0, min: 0 } })
    setTitle('')
    setContent('')
  }

  const handleDelete = () => {
    void deletePlanItem.mutate({
      userId: userAtom.userId,
      currentUnix,
      id: planId,
    })
  }

  const handleCancel = () => {
    dialogRef.current?.close()
  }

  return (
    <>
      <S.Dialog ref={dialogRef} onClose={handleClose} onSubmit={handleSubmit}>
        <S.DialogTitle>
          {mode === 'create' ? '[스케줄 추가]' : '[스케줄 수정]'}
          <button
            style={{ background: color, color: '#000', padding: '1rem' }}
            onClick={() => {
              colorPickerRef.current?.showModal()
            }}
          >
            컬러픽
          </button>
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
              <S.Button style={{ color: 'black' }} onClick={handleDelete}>
                삭제
              </S.Button>

              <S.Button type="submit">수정</S.Button>
            </S.ButtonsWrapper>
          )}
        </S.Form>
      </S.Dialog>
      {/* dialog > dialog 중첩되어있는 상태로 자식 dialog의 button을 클릭해서 닫으면 이벤트 전파때문에 부모 dialog의 onClose가 동작해서 상태가 다 초기화된다. */}
      <dialog ref={colorPickerRef}>
        <HexColorPicker color={color} onChange={setColor} />
        <button
          type="reset"
          style={{ width: '100%', padding: '0.5rem', marginTop: '1rem' }}
          onClick={(e) => {
            e.stopPropagation()
            colorPickerRef.current?.close()
          }}
        >
          확인
        </button>
      </dialog>
    </>
  )
}

export default forwardRef<any, Props>(PlanDialog)
