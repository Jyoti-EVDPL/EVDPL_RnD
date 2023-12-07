import './App.css';
import { jwtDecode } from "jwt-decode"
import { useState, useEffect } from "react"

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "312861415918-cg5j5hqpf35u2vop85s33ik9dittn0kf.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);
  // If we have no user: sign in button
  // if we have a user: show the log out button

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 &&
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      user && <div>
        <img src={user.picture} alt='null'></img>
        <h3>{user.name}</h3>
      </div>
    </div>
  );
  // return (
  //   <>
  //     <h1>Hello there:User Pleasse Signin</h1>
  //     <button>Click to register</button>


  //   </>
  // );
}

export default App;
