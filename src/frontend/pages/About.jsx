import React from 'react'
import { useAuthStore } from '../stores/auth.js'

const About = () => {
    const logout = useAuthStore((state)=>state.logout)
  return (
    <div>About
        <button onClick={()=>{
            alert('you logged out')
            logout()
        }}>
            Çıkış Yap
        </button>

    </div>
  )
}

export default About