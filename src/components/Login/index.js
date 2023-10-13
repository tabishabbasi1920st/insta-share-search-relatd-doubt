import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    errorMsg: '',
    apiStatus: false,
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()

    const {usernameInput, passwordInput} = this.state

    const credentials = {username: usernameInput, password: passwordInput}

    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const jwtToken = fetchedData.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 7})
      this.setState({apiStatus: true})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = fetchedData.error_msg
      this.setState({apiStatus: false, errorMsg})
    }
  }

  renderUsername = () => {
    const {usernameInput} = this.state
    return (
      <div className="label-and-input-field-container">
        <label className="input-labels" htmlFor="usernameInput">
          USERNAME
        </label>
        <input
          type="text"
          id="usernameInput"
          className="input-field"
          value={usernameInput}
          onChange={event => {
            this.setState({usernameInput: event.target.value})
          }}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {passwordInput} = this.state
    return (
      <div className="label-and-input-field-container">
        <label className="input-labels" htmlFor="passwordInput">
          PASSWORD
        </label>
        <input
          type="password"
          id="passwordInput"
          className="input-field"
          value={passwordInput}
          onChange={event => {
            this.setState({passwordInput: event.target.value})
          }}
        />
      </div>
    )
  }

  renderErrorMsg = () => {
    const {errorMsg} = this.state
    return <p className="error-msg">{errorMsg}</p>
  }

  renderLoginButton = () => (
    <button className="login-btn" type="submit">
      Login
    </button>
  )

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    const {apiStatus} = this.state
    return (
      <div className="login-container">
        <img
          className="login-lg-landing-img"
          src="https://res.cloudinary.com/dctfbwk0m/image/upload/v1696676628/OBJECTS_wb7uyc.png"
          alt="website login"
        />
        <form className="form" onSubmit={this.onSubmitLoginForm}>
          <div className="website-logo-container">
            <img
              src="https://res.cloudinary.com/dctfbwk0m/image/upload/v1696670758/Standard_Collection_8_qji98b.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <h1 className="insta-share-heading">Insta Share</h1>
          {this.renderUsername()}
          {this.renderPassword()}
          {!apiStatus && this.renderErrorMsg()}
          {this.renderLoginButton()}
        </form>
      </div>
    )
  }
}

export default Login
