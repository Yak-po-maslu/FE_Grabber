import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import { useEffect } from 'react'

const PageWrapper = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <>
      <Header />
      <section className="content mt-[90px] h-auto min-h-full w-full flex-grow items-center">
        <Outlet />
      </section>
      <Footer />
    </>
  )
}

export default PageWrapper
