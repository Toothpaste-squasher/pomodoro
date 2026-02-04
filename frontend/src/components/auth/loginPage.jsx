import { useState } from "react"


export const LoginPage = () => {
  const [creds, setCreds] = useState({ username: '', password: '' })

  const handleChange = (target) => {
    const { name, value } = target
    setCreds(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="login-page">
      <form>
        <input type="text" name="username" value={creds.username} onChange={handleChange} />
        <input type="password" name="password" value={creds.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}