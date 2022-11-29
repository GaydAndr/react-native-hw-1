import { StatusBar } from 'react-native';

export default {
  fontFamily: {
    Medium: 'Roboto-Medium',
    Regular: 'Roboto-Regular',
  },

  fontSize: {
    size_30: {
      fontSize: 30,
      lineHeight: 35,
    },

    size_16: {
      fontSize: 16,
      lineHeight: 19,
    },
  },

  color: {
    accentColor: '#FF6C00',
  },
  statusBarHeight: StatusBar.currentHeight,
};
