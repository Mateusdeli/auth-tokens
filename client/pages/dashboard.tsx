import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import PrivatePage from '../components/PrivatePage'
import useAuthContext from '../hooks/useAuthContext'
import http from '../utils/http'

export default function Dashboard() {
  const { efetuarLogout } = useAuthContext()
  const router = useRouter()
  useEffect(() => {
    http.get('/')
      .catch(() => {
        sessionStorage.clear()
        router.replace('/')
      })
  }, [router])

  const manipuladorLogout = async () => {
    try {
      await efetuarLogout()
      await router.replace('/')
    } catch (erro) {
      alert(erro);
    }
  }

  return (
    <PrivatePage>
      <div>
          <h1>Private page</h1>
          <button onClick={manipuladorLogout}>Sair</button>
      </div>
    </PrivatePage>
  )
}