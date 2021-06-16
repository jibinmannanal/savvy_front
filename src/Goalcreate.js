import React, {useState} from 'react'

function Goalcreate(props){

  const [name, setName] = useState("")
  const [id, setId] = useState("")

  const handleNameChange = (evt) => {
    setName(evt.target.value)
  }
  const handleIdChange = (evt) => {
    setId(evt.target.value)
  }


  const handleSubmit = (evt) => {
    evt.preventDefault()
    const token = localStorage.getItem("token")
    if(props.edit && id)
    {
      fetch(`http://localhost:3000/api/v1/goal/`+id, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({

          name,

        })
      })
      .then(resp => resp.json())
      .then(data => {

        if(data["errors"])
        {
          alert(data["errors"])
        }else {
          alert(data["message"])
        }

      })
    }
    else {
      fetch(`http://localhost:3000/api/v1/goal/`+id, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({

          name,

        })
      })
      .then(resp => resp.json())
      .then(data => {

        if(data["errors"])
        {
          alert(data["errors"])
        }else {
          alert(data["message"])
        }

      })
    }
    setName("")

  }
  const formDivStyle = {
    margin: "auto",
    padding: "20px",
    width: "80%"
  }
  return(
    <div>
    <div style={formDivStyle}>
    <h1>Goal</h1>
    <form class="ui form" onSubmit={handleSubmit}>
    {props.edit &&<div class="field">
    <label>Id</label>
    <input value={id} onChange={handleIdChange} type="number" placeholder="id"/>
    </div>}
    <div class="field">
    <label>Name</label>
    <input value={name} onChange={handleNameChange} type="text" placeholder="name"/>
    </div>


    <button class="ui button" type="submit">Submit</button>
    </form>
    </div>
    </div>
  )
}

export default Goalcreate
