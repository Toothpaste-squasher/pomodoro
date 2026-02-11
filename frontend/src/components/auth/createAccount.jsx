import { useState } from "react"
import useUsersService from "../../hooks/services/usersService";

export const CreateAccount = () => {
  const [regCreds, setRegCreds] = useState({})
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useUsersService;

  const handleChange = (e) => {
    setRegCreds(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (regCreds.password !== confirmPassword) {
      return alert('Passwords do not match')
    }
    register(regCreds);
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input id='username' type="text" name="username" value={regCreds.username} onChange={handleChange} />
        <label htmlFor="password">Create Password: </label>
        <input id='password' type="password" name="password" value={regCreds.password} onChange={handleChange} />
        <label htmlFor="password">Confirm Password: </label>
        <input id='password' type="password" name="confirmPassword" value={confirmPassword} onChange={setConfirmPassword} />
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}
