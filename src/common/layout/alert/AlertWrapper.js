import React from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import {Alert} from '../../services/Alert';

function AlertWrapper({children}) {
  return (
    <>
      {children}
      <DropdownAlert ref={ref => Alert.setDropDown(ref)} closeInterval={4000} />
    </>
  );
}

export default AlertWrapper;
