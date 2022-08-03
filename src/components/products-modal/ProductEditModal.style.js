import {StyleSheet, Dimensions} from 'react-native';

import {COLORS} from '../../Config';

const height = Dimensions.get('window').height * (1 / 3);

const borderRadiusModal = 40;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 19, 19, 0.7)',
  },
  modalContainer: {
    width: '100%',
    height: height,
    borderTopLeftRadius: borderRadiusModal,
    borderTopRightRadius: borderRadiusModal,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: borderRadiusModal,
    marginTop: -25,
    paddingLeft: 8, //Ajust Padding Left
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Roboto-Light',
    fontSize: 20,
    color: COLORS.gray,
    marginBottom: 10,
  },
  buttonContainer: {
    height: 80,
    justifyContent: 'center',
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 6,
  },
  quantity: {
    minWidth: 32,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 26,
    paddingBottom: 10,
    paddingHorizontal: 4,
  },
});
