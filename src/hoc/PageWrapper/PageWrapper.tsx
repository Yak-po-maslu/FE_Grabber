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
    <div className="flex min-h-[100dvh] w-full flex-col justify-between">
      <Header />
      <section className="mt-[80px] flex-grow bg-secondary-brown-50">
        <Outlet />
      </section>
      <Footer />
    </div>
  )
}

export default PageWrapper
