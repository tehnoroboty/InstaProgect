import { Ref, type SVGProps, forwardRef, memo } from 'react'

const SvgOutlinebell = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24.001}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <rect fill={'none'} height={23} rx={0} transform={'translate(.5 .5)'} width={23} />
    <path
      clipRule={'evenodd'}
      d={
        'm15.72 15.404 1.801 1.804a1.63 1.63 0 0 1 .352 1.783A1.63 1.63 0 0 1 16.363 20H13v.341C13 22.359 11.206 24 9 24s-4-1.641-4-3.659V20H1.637a1.63 1.63 0 0 1-1.512-1.01 1.63 1.63 0 0 1 .354-1.782l1.801-1.804.001-4.677c0-1.934.838-3.778 2.302-5.06A6.72 6.72 0 0 1 9.9 4.06c3.318.439 5.82 3.396 5.82 6.877zM3.695 16.818 2.515 18h12.971l-1.18-1.183a1.99 1.99 0 0 1-.585-1.413v-4.467c0-2.482-1.756-4.586-4.083-4.895a4.66 4.66 0 0 0-3.737 1.129 4.73 4.73 0 0 0-1.62 3.556v4.677c0 .534-.208 1.036-.586 1.414M11 20.341C11 21.24 10.085 22 9 22s-2-.76-2-1.659V20h4z'
      }
      fill={'#FFF'}
      fillRule={'evenodd'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgOutlinebell)
const Memo = memo(ForwardRef)

export default Memo
