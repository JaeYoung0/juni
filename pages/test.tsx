import styled from '@emotion/styled'
import { create, StateCreator } from 'zustand'
import { shallow } from 'zustand/shallow'

type ZooStore = BearSlice & DuckSlice

type BearSlice = {
  bears: number
  addBear: () => void
  removeBear: () => void
}

type DuckSlice = {
  ducks: number
  addDuck: () => void
  removeDuck: () => void
}

type CreateBearSliceType = StateCreator<BearSlice, [], [], BearSlice>
type CreateDuckSliceType = StateCreator<DuckSlice, [], [], DuckSlice>

const createBearSlice: CreateBearSliceType = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  removeBear: () => set((state) => ({ bears: state.bears - 1 })),
})

const createDuckSlice: CreateDuckSliceType = (set) => ({
  ducks: 0,
  addDuck: () => set((state) => ({ ducks: state.ducks + 1 })),
  removeDuck: () => set((state) => ({ ducks: state.ducks - 1 })),
})

const useZooStore = create<ZooStore>()((...a) => ({
  ...createBearSlice(...a),
  ...createDuckSlice(...a),
}))

function Test() {
  return (
    <Wrapper>
      <Bears />
      <Ducks />
    </Wrapper>
  )
}

function Bears() {
  console.log('@@Bears rendering!')

  const bearStore = useZooStore()

  return (
    <>
      <p>ducks:{bearStore.bears}</p>
      <button onClick={bearStore.addBear}>곰 추가</button>
      <button onClick={bearStore.removeBear}>곰 제거</button>
    </>
  )
}

function Ducks() {
  console.log('@@Ducks rendering!')

  const zoo = useZooStore()

  return (
    <>
      <p>ducks:{zoo.ducks}</p>
      <button onClick={zoo.addDuck}>오리 추가</button>
      <button onClick={zoo.removeDuck}>오리 제거</button>
    </>
  )
}

export default Test

const Wrapper = styled.div`
  p {
    font-size: 2rem;
  }
`
