import { StyleSheet } from 'react-native';
import variables from '../../../assets/variables';

const { fontFamily, fontSize, color } = variables;

export default StyleSheet.create({
  bgImage: {
    justifyContent: 'flex-end',
  },
  keyboarBox: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  scrollViewLandscape: {
    width: '50%',
    marginLeft: 'auto',
  },
  box: {
    // flex: 1,
    // justifyContent: 'flex-end',
  },

  scrollViewPortrait: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  wraper: {
    paddingTop: 32,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
  },
});
