import React, { useState } from 'react';
import {app} from '../config/FireBaseConfig';
import { useHistory } from "react-router-dom";

const auth = app.auth();
const db = app.firestore();

const SignUp = () => {

  const [userDet, setUserDet] = useState({});
  let history = useHistory();

  const handleChange= (e) =>{
    setUserDet({
      ...userDet,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDet);
    auth.createUserWithEmailAndPassword(userDet.email, userDet.password)
      .then(cred => {
        db.collection('users').doc(cred.user.uid).set({
          name: userDet.first_name
        });
        setUserDet('');
        history.push('/');
      }).catch(err => console.log(err.message))
  }

  return ( 
    <form className="container login-form" onSubmit={handleSubmit}>
      <div className="center-align">
      <i className="material-icons large">assignment</i>
      <h4>Регистрация нового пользователя</h4>
      <p className="grey-text">Заполните пожалуйста все поля*</p>
    </div>

      <div className="input-field">
        <i className="material-icons prefix">account_circle</i>
        <input id="first_name" type="text" className="validate" onChange={handleChange} />
        <label  htmlFor="first_name">Имя</label>
      </div>
      <div className="input-field">
        <i className="material-icons prefix">email</i>
        <input id="email" type="email" className="validate" onChange={handleChange} />
        <label  htmlFor="email">Email</label>
      </div>
      <div className="input-field">
        <i className="material-icons prefix">https</i>
        <input id="password" type="password" className="validate" onChange={handleChange} />
        <label  htmlFor="password">Пароль</label>
      </div>
      <div className="input-field center">
        <button type="submit" className="btn waves-effect waves-light blue"><i className="material-icons right">done</i>Зарегистрироваться</button>
      </div>
    </form>
   );
}
 
export default SignUp;