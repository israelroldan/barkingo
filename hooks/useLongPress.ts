"use client"

import { useCallback, useRef, useState } from "react"

export const useLongPress = (
  onLongPress: (index: number) => void,
  onClick: (index: number) => void,
  {
    shouldPreventDefault = true,
    delay = 500,
  }: {
    shouldPreventDefault?: boolean
    delay?: number
  } = {},
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false)
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const target = useRef<EventTarget | null>(null)

  const start = useCallback(
    (index: number) => (event: React.MouseEvent | React.TouchEvent) => {
      if (shouldPreventDefault && event.target) {
        event.preventDefault()
      }
      target.current = event.target
      timeout.current = setTimeout(() => {
        onLongPress(index)
        setLongPressTriggered(true)
      }, delay)
    },
    [onLongPress, delay, shouldPreventDefault],
  )

  const clear = useCallback(
    (index: number, shouldTriggerClick = true) =>
      (event: React.MouseEvent | React.TouchEvent) => {
        timeout.current && clearTimeout(timeout.current)
        if (shouldTriggerClick && !longPressTriggered) {
          onClick(index)
        }
        setLongPressTriggered(false)
        target.current = null
      },
    [onClick, longPressTriggered],
  )

  return useCallback(
    (index: number) => ({
      onMouseDown: start(index),
      onTouchStart: start(index),
      onMouseUp: clear(index),
      onMouseLeave: clear(index, false),
      onTouchEnd: clear(index),
    }),
    [start, clear],
  )
}

