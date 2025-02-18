import {StyleSheet, Dimensions} from 'react-native';

import {COLORS} from '../../Config';

const height = Dimensions.get('window').height - 70;

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
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Roboto-Light',
    fontSize: 20,
    color: COLORS.gray,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
  },
  buttonContainer: {
    height: 60,
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
  },
  productsContainer: {
    flex: 1,
    marginBottom: 10,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    paddingVertical: 10,
  },
});
