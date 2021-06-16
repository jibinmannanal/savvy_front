import React, {useState} from 'react'

function Signupform(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPasswordConfirmation] = useState("")
  const handleUsernameChange = (evt) => {
    setName(evt.target.value)
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value)
  }
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value)
  }
  const handlePasswordConfirmationChange = (evt) => {
    setPasswordConfirmation(evt.target.value)
  }


  const handleSubmit = (evt) => {
    evt.preventDefault()
    fetch(`http://localhost:3000/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials':'true'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation
      })
    })
    .then(resp => resp.json())
    .then(data => {

      if(data["errors"])
      {
        alert(data["errors"])
      }else {
        localStorage.setItem("token", data.auth_token)
        props.handleLogin(data.user)
      }

    });
    setName("")
    setEmail("")
    setPassword("")
    setPasswordConfirmation("")
  }
  const formDivStyle = {
    margin: "auto",
    padding: "20px",
    width: "80%"
  }

  return(
    <div style={formDivStyle}>
    <h1>Sign Up</h1>
    <form className="ui form" onSubmit={handleSubmit}>
    <div className="field">
    <label>Name</label>
    <input value={name} onChange={handleUsernameChange} type="text" placeholder="name"/>
    </div>
    <div className="field">
    <label>Email</label>
    <input value={email} onChange={handleEmailChange} type="email" placeholder="email"/>
    </div>
    <div className="field">
    <label>Password</label>
    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
    </div>
    <div className="field">
    <label>Password Confirmation</label>
    <input value={password_confirmation} onChange={handlePasswordConfirmationChange} type="password" placeholder="password"/>
    </div>

    <button className="ui button" type="submit">Submit</button>
    </form>
    </div>
  )
}

export default Signupform
