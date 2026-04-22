import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import useUsersService from "../../hooks/services/usersService"
import { authContext } from "../../contexts/auth/authContext"


export const LoginPage = () => {
  const navigate = useNavigate()
  const [creds, setCreds] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { setToken } = useContext(authContext)
  const { login } = useUsersService()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCreds(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(creds)
      .then(
        (res) => {
          if (res.data.success) {
            setToken(res.data.accessToken)
            navigate('/')
          }
        }
      )
      .catch(err => {
        console.error(err)
        if (err.response) {
          setError(err.response.data.message)
        }
      })
  }

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" >Email: </label>
        <input required id='email' type="text" name="email" value={creds.username} onChange={handleChange} />
        <label htmlFor="password" >Password: </label>
        <input required id='password' type="password" name="password" value={creds.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/sign-up">Sign up</a></p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div >
  )
}