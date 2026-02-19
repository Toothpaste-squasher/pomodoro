import { useState } from "react"
import { useNavigate } from "react-router-dom";
import useUsersService from "../../hooks/services/usersService";

export const SignUpPage = () => {
  const [regCreds, setRegCreds] = useState({ username: "", password: "", email: "" })
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useUsersService();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegCreds(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (regCreds.password !== confirmPassword) {
      return setError('Passwords do not match')
    }
    register(regCreds)
      .then(
        (res) => {
          if (res.data.success) {
            navigate('/login')
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          required
          id='email'
          type="email"
          name="email"
          value={regCreds.email}
          onChange={handleChange}
        />
        <label htmlFor="username">Username: </label>
        <input
          required
          id='username'
          type="text"
          name="username"
          value={regCreds.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Create Password: </label>
        <input
          required
          id='password'
          type="password"
          name="password"
          value={regCreds.password}
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          required
          id='confirmPassword'
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
