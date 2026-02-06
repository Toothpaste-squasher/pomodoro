import { useState } from "react"


export const LoginPage = () => {
  const [creds, setCreds] = useState({ username: '', password: '' })


  const handleChange = (e) => {
    const { name, value } = e.target
    setCreds(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(creds)
  }

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input id='username' type="text" name="username" value={creds.username} onChange={handleChange} />
        <label htmlFor="password">Password: </label>
        <input id='password' type="password" name="password" value={creds.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}