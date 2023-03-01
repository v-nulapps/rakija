import cn from 'clsx'
import { Link } from 'components/link'
import { Navigation } from 'components/navigation'
import { useStore } from 'lib/store'
import { forwardRef } from 'react'
import shallow from 'zustand/shallow'
import { Cart } from './cart'
import s from './header.module.scss'

export const Header = forwardRef((_, ref) => {
  const lenis = useStore((state) => state.lenis)
  const [navIsOpen, setNavIsOpen] = useStore(
    (state) => [state.navIsOpen, state.setNavIsOpen],
    shallow
  )

  const setToggleCart = useStore((state) => state.setToggleCart)

  return (
    <>
      <header className={s.header} ref={ref}>
        <Navigation />
        <div className={cn('layout-block', s.head)}>
          <button
            onClick={() => {
              setNavIsOpen(!navIsOpen)
            }}
          >
            menu
          </button>
          <div>
            <Link href="/">home</Link>/<Link href="/gsap">gsap</Link>/
            <Link href="/contact">contact</Link>/
            <button
              onClick={() => {
                setToggleCart(true)
                lenis.stop()
              }}
              className={cn('p s text-bold', s.hover, s.last)}
            >
              {`Bag`}
            </button>
          </div>
        </div>
      </header>
      <Cart />
    </>
  )
})

Header.displayName = 'Header'
