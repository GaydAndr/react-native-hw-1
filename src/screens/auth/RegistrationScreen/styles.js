import { StyleSheet } from 'react-native';
import variables from '../../../../assets/variables';

const { fontFamily, fontSize, color } = variables;

export default StyleSheet.create({
  keyboarBox: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bgImage: {},

  scrollViewLandscape: {
    width: '50%',
    marginLeft: 'auto',
  },
  scrollViewPortrait: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  wraper: {
    paddingTop: 92,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: '#fff',
  },

  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    position: 'relative',
    marginTop: -60,
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  avatarImg: {
    position: 'absolute',
    top: 0,
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  avatarBtn: {
    position: 'absolute',
    bottom: 15,
    right: -12.5,
  },

  form: {
    marginHorizontal: 16,
  },

  title: {
    fontFamily: fontFamily.Medium,
    ...fontSize.size_30,
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 0.01,
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
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  input: {
    fontFamily: fontFamily.Regular,
    flex: 1,
    paddingVertical: 10,
    ...fontSize.size_16,
  },

  btn: {
    borderRadius: 100,
    marginTop: 43,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.accentColor,
  },

  btnTitle: {
    fontFamily: fontFamily.Regular,
    color: '#fff',
    ...fontSize.size_16,
  },

  toSingUp: {
    fontFamily: fontFamily.Regular,
    textAlign: 'center',
    color: '#1B4371',
    ...fontSize.size_16,
  },
  showPassBtn: {
    fontFamily: fontFamily.Regular,
    color: '#1B4371',
  },

  onfocus: {
    borderColor: color.accentColor,
  },
});
