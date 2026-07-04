export type NavigationItem = {
  label: string
  path: string
}

export type CardProps = {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}