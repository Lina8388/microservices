import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { LoopProps } from '../../types'

import LoopItem from './LoopItem'
import s from './style.module.scss'

function Loop<T>({
  data,
  renderItem,
  width,
  height,
  gap,
  run = false
}: LoopProps<T>): ReactElement {
  const loopRef = useRef<number>(0)
  const boxBounding = useMemo(() => width + gap, [width, gap])
  const lastLeavedIndexRef = useRef<number>(0)
  const [state, setState] = useState(() => {
    const places = data.map((el, i) => {
      const left = boxBounding * i
      const leaveOn = left + boxBounding
      return { left, leaveOn }
    })

    return {
      places,
      offset: 0
    }
  })

  const loop = useCallback(() => {
    loopRef.current = requestAnimationFrame(loop)

    setState((prev) => {
      const { places, offset } = prev
      const { current: lastLeavedIndex } = lastLeavedIndexRef
      if (offset >= places[lastLeavedIndex].leaveOn) {
        const current = places[lastLeavedIndex]
        const max = Math.max(...places.map(({ left }) => left))
        const next = max + boxBounding
        current.left = next
        current.leaveOn = next + boxBounding
        lastLeavedIndexRef.current++
        if (lastLeavedIndexRef.current === places.length) {
          lastLeavedIndexRef.current = 0
        }
      }
      return { ...prev, offset: prev.offset + 0.5 }
    })
  }, [loopRef])

  useEffect(() => {
    if (run) {
      loop()
      return () => cancelAnimationFrame(loopRef.current)
    }
  }, [loopRef, run])

  return (
    <div className={s.profiles}>
      <div
        className={s.carousel}
        style={{ transform: `translateX(-${state.offset}px)`, height }}
      >
        {data.map((el, index) => {
          const { left } = state.places[index]
          return (
            <LoopItem key={left} left={left} width={width} height={height}>
              {renderItem(el)}
            </LoopItem>
          )
        })}
      </div>
    </div>
  )
}

export default Loop
