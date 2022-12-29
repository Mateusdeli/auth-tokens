import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect } from 'react'
import useAuthContext from '../../hooks/useAuthContext'

interface PrivatePageProps {
    children: JSX.Element
}

export default function PrivatePage({ children }: PrivatePageProps) {
  const context = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    context.checaUsuarioAutenticado()
      .catch(() => router.replace('/'))
  }, [context, router])

  return (
    <>{children}</>
  )
}
