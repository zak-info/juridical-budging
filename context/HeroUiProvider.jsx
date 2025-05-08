// app/providers.tsx
'use client'

import {HeroUIProvider} from '@heroui/react'

export function HeroUiProvider({children}) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  )
}