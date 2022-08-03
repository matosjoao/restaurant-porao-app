import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../../Config';
import ButtonLogin from '../button-login/ButtonLogin';
import InputLogin from '../input-login/InputLogin';
import TitleLogin from '../title-login/TitleLogin';

function FormLogin() {
  const navigation = useNavigation();

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
          onChangeText: () => {},
          /* value: inputs.description.value, */
        }}
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
          onChangeText: () => {},
          /* value: inputs.description.value, */
        }}
      />

      <ButtonLogin
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Rooms'}],
          });
        }}>
        ENTRAR
      </ButtonLogin>
    </>
  );
}

export default FormLogin;
