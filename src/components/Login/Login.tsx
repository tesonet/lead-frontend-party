import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import UsernameIcon from '../../../assets/icons/username.svg'
import LockIcon from '../../../assets/icons/lock.svg'
import logo from '../../../assets/logo/logo_testio.png'
import { connect, useDispatch, useSelector } from 'react-redux'
import { logIn } from '../../store/auth_actions'
import { useHistory } from 'react-router-dom'
import { requestServerList } from '../../service/auth_service'
import LoginButton from '../shared/LoginButton/LoginButton'
import Input from '../shared/Input/Input'
import LogoutButton from '../shared/LogoutButton/LogoutButton'
import { primaryButton } from '../../styles/bigButton'
import createLoginStyles from './Login.style'

function Login() {
  const style = { ...createLoginStyles(), ...primaryButton() }
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const error = useSelector(state => state.error)
  const loading = useSelector(state => state.loading)
  const loggedIn = useSelector(state => state.loggedIn)
  const valid = username && password
  const navigateToServers = async () => {
    history.push('/servers')
  }
  const handleLogin = async e => {
    e.preventDefault()
    const status: string = await logIn(username, password, dispatch)
    if (status === 'success') {
      navigateToServers()
    }
  }
  const errorMessage = (
    <div className={style.error}>Incorrect username or password</div>
  )

  return (
    <div className={style.wrapper}>
      <div className={style.background}></div>
      <div className={style.formContainer}>
        <div className="logo">
          <img src={logo} />
        </div>
        {error && errorMessage}
        {!loggedIn && (
          <form onSubmit={handleLogin} className={style.form}>
            <Input
              disabled={loading}
              className="mb"
              required={!username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              icon={<UsernameIcon />}
              type="text"
            />
            <Input
              disabled={loading}
              className="mb"
              required={!password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              icon={<LockIcon />}
              type="password"
            />
            <LoginButton disabled={loading || !valid} />
          </form>
        )}
        {loggedIn && (
          <div className={style.logoutWrapper}>
            <div className="loggedInText mb">You are already logged in :)</div>
            <div className={`${style.button} mb`}>
              <button onClick={() => navigateToServers()}>
                Browse servers!
              </button>
            </div>
            <div className="mb">or</div>
            <LogoutButton bigButton />
          </div>
        )}
      </div>
    </div>
  )
}

export default connect()(Login)
