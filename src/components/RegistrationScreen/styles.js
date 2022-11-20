import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  keyboarBox: {
    width: '100%',
  },
  wraper: {
    paddingTop: 92,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: '#fff',
  },

  title: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 30,
    fontWeight: '500',
  },

  photoInput: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: 120,
    height: 120,
    transform: [{ translateX: -60 }, { translateY: -60 }],
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },
  addBtnPhoto: {
    position: 'absolute',
    right: 0,
    bottom: 14,
    width: 25,
    height: 25,
    transform: [{ translateX: 11 }],
  },

  inputContainer: {
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 16,
    borderColor: '#F6F6F6',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },

  form: {
    marginHorizontal: 40,
  },

  btn: {
    borderRadius: 100,
    marginTop: 43,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
  },

  btnTitle: {
    color: '#fff',
    fontSize: 16,
  },

  toSingUp: {
    textAlign: 'center',
    color: '#1B4371',
    fontSize: 16,
  },
});
