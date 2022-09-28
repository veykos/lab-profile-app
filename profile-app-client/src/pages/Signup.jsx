import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


export default function Signup(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [campus, setCampus] = useState('');
  const [course, setCourse] = useState('');
  const [errorMessage,setErrorMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    const requestToServer = {username, password, campus, course}

    axios.post(process.env.REACT_APP_API_URL + '/auth/signup', requestToServer)
    .then(response => {
      navigate('/login')
    })
    .catch(err => {
      const errorDescription = err.response.data.message;
      setErrorMessage(errorDescription)
    })
  }

  return (
    <div className="signup-holder">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="campus">Campus</label>
        <select
          name="campus"
          id="campus"
          onChange={(e) => setCampus(e.target.value)}
        >
          <option value="Madrid">Madrid</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Miami">Miami</option>
          <option value="Paris">Paris</option>
          <option value="Berlin">Berlin</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="México">México</option>
          <option value="Sao Paulo">Sao Paulo</option>
          <option value="Lisbon">Lisbon</option>
          <option value="Remote">Remote</option>
        </select>
        <label htmlFor="course">Course</label>
        <select
          name="course"
          id="course"
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="Web Dev">Web Dev</option>
          <option value="UX/UI">UX/UI</option>
          <option value="Data Analytics">Data Analytics</option>
          <option value="Cyber Security">Cyber Security</option>
        </select>
        <button type='submit'>Sign up</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

    </div>
  );
}
