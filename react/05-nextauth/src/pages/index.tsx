import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import styles from '../styles/Home.module.css'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = {
      email,
      password,
    }

    await signIn(data)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label htmlFor="email">
        <span>E-mail</span>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>

      <label htmlFor="password">
        <span>Password</span>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      <button type="submit">Login</button>
    </form>
  )
}
