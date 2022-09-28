import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth.context';
import {useContext} from 'react'

export default function Homepage(props) {
  const {user, logOutUser } = useContext(AuthContext)
  
  if (!user) {
    return (
      <div className="button-holder">
      <Link to={"/signup"}>{<button>Sign up</button>}</Link>
      <Link to={"/login"}>{<button>Log in</button>}</Link>
    </div>
    )
  }

  return (
    <div className="button-holder">
      <button onClick={event => logOutUser()}>Log Out</button>
    </div>
  )
}