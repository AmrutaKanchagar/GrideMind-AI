import { useState } from 'react'

export function useSidebar(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((current) => !current)

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  }
}