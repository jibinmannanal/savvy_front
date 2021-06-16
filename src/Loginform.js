import React, {useState} from 'react'

function Loginform(props){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    fetch(`http://localhost:3000/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(resp => resp.json())
    .then(data => {
      
      if(data["error"])
      {
        alert(data["error"])
      }else {
        localStorage.setItem("token", data.auth_token)
        props.handleLogin(data.user )
      }

    })
    setEmail("")
    setPassword("")
  }
  const formDivStyle = {
    margin: "auto",
    padding: "20px",
    width: "80%"
  }
  return(
    <div>
    <div style={formDivStyle}>
    <h1>Log In</h1>
    <form class="ui form" onSubmit={handleSubmit}>
    <div class="field">
    <label>Username</label>
    <input value={email} onChange={handleEmailChange} type="email" placeholder="email"/>
    </div>
    <div class="field">
    <label>Password</label>
    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
    </div>

    <button class="ui button" type="submit">Submit</button>
    </form>
    </div>
    </div>
  )
}

export default Loginform
