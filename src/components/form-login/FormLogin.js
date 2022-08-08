import React, {useState} from 'react';

import {Alert} from '../../common/services/Alert';
import {COLORS} from '../../Config';
import ButtonLogin from '../button-login/ButtonLogin';
import InputLogin from '../input-login/InputLogin';
import TitleLogin from '../title-login/TitleLogin';

function FormLogin({onAuthenticate}) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    let email = enteredEmail.trim();
    let password = enteredPassword.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 1;

    if (!emailIsValid || !passwordIsValid) {
      Alert.warn(
        'Dados inválidos',
        'Por favor, introduza um email válido e uma palavra-passe.',
      );
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    onAuthenticate({email, password});
  }

  return (
    <>
      <TitleLogin>Entrar</TitleLogin>

      <InputLogin
        iconName="ios-person"
        iconColor={COLORS.gray}
        textInputStyles={{color: COLORS.gray}}
        textInputConfig={{
          placeholder: 'Utilizador',
          autoCorrect: true,
          autoCapitalize: 'none',
          onChangeText: updateInputValueHandler.bind(this, 'email'),
          value: enteredEmail,
        }}
        textInputValid={credentialsInvalid.email}
      />

      <InputLogin
        iconName="ios-key"
        iconColor={COLORS.gray}
        textInputStyles={{color: COLORS.gray}}
        textInputConfig={{
          placeholder: 'Palavra-passe',
          autoCorrect: true,
          autoCapitalize: 'none',
          secureTextEntry: true,
          onChangeText: updateInputValueHandler.bind(this, 'password'),
          value: enteredPassword,
        }}
        textInputValid={credentialsInvalid.password}
      />

      <ButtonLogin onPress={submitHandler}>ENTRAR</ButtonLogin>
    </>
  );
}

export default FormLogin;
