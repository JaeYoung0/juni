import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@/pages/home'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

// https://dev.to/peterlidee/how-to-mock-next-router-with-jest-3p6b
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {},
    push: () => {},
    replace: () => {},
    asPath: '/',
  }),
}))

// https://tanstack.com/query/v4/docs/react/guides/testing
const queryClient = new QueryClient()
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </RecoilRoot>
)

describe('Home', () => {
  test('renders a img', () => {
    render(
      <Wrapper>
        <Home />
      </Wrapper>
    )

    const heading = screen.getByRole('img', {
      name: /background-img-home/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
