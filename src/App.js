import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import SignInForm from './Signupform';
import LoginForm from './Loginform'
import Goalcreate from './Goalcreate'


function App() {
  const [user, setUser] = useState({})
  const [form, setForm] = useState("")

  useEffect(() => {

    const token = localStorage.getItem("token")
    if(token){
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
        // console.log(data)
      })
    }
  }, [])

  const handleLogin = (user) => {
    setUser(user)
  }

  const handleFormSwitch = (input) => {
    setForm(input)
  }
  const signUp = () => {
    setForm("signUp")
  }
  const login = () => {
    setForm("login")
  }
  const goalCreate = () => {
    setForm("goalCreate")
  }
  const goalEdit = () => {
    setForm("goalEdit")
  }
  const logOut = ()=>
  {
    localStorage.clear();
    handleLogin()
  }

  console.log(user)

  const renderForm = () => {
    switch(form){
      case "login":
      return <LoginForm handleLogin={handleLogin}/>
      break;
      case "goalCreate":
      return <Goalcreate handleLogin={handleLogin}/>
      break;
      case "goalEdit":
      return <Goalcreate handleLogin={handleLogin}/>
      break;
      default:
      return <SignInForm handleLogin={handleLogin}/>
    }
  }

  const renderLogForm = () => {
    switch(form){

      case "goalCreate":
      return <Goalcreate edit={false}/>
      break;

      default:
      return  <Goalcreate edit={true} />
    }
  }
  return (
    <div className="App">
    {!localStorage.getItem("token") && <div><button className="ui button" onClick={signUp}>Sign Up</button>
    <button className="ui button" onClick={login}>Log In</button>

    {
      renderForm()
    }
    </div>}
    {localStorage.getItem("token") &&<div><button className="ui button" onClick={goalCreate}>Goal Create</button>
    <button className="ui button" onClick={goalEdit}>Goal Edit</button>
    <button className="ui button" onClick={logOut}>logout</button>
    {
      renderLogForm()
    }

    </div>}
    </div>
  );
}

export default App;
