import BasicLayout from '@/components/layouts/BasicLayout'
import withAuth from '@/hoc/withAuth'
import { useAphorismStore } from '@/service/aphorismAdapter'
import useDialog from '@/service/dialogAdapter'
import * as S from './style'

function HomePage() {
  const { openDialog } = useDialog()
  const { aphorismList } = useAphorismStore()
  const currentAphorism = aphorismList?.find((item) => item.current)

  return (
    <BasicLayout>
      <S.MyAphorism onClick={() => openDialog({ variant: 'AphorismListDialog', props: {} })}>
        <img src="https://images.unsplash.com/photo-1639678349533-5758a710ca0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
        {/* <S.AphorismText>{isLoading ? 'loading ...' : currentAphorism?.text}</S.AphorismText> */}
        <S.AphorismText>{currentAphorism?.text}</S.AphorismText>
      </S.MyAphorism>
    </BasicLayout>
  )
}

export default withAuth(HomePage)
