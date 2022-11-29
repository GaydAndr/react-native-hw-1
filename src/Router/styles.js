import { StyleSheet } from 'react-native';
import variables from '../../assets/variables';

const { fontFamily, statusBarHeight } = variables;

export default StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 33,
    paddingHorizontal: 16,
    alignItems: 'baseline',
  },
  bottomButton: {
    backgroundColor: '#FF6C00',
    borderRadius: 20,
    padding: 7,
    width: 70,
    marginTop: 9,
    alignItems: 'center',
  },
  bottomButton2: {
    padding: 7,
    width: 70,
    marginTop: 9,
    alignItems: 'center',
  },
  tabBarStyle: [
    {
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: 'rgba(0, 0, 0, 0.2)',
      height: 83,
      paddingTop: 9,
      paddingBottom: 22,
    },
    null,
  ],
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    height: 44 + statusBarHeight,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  headerTitleStyle: {
    color: '#212121',
    textAlign: 'center',
    flex: 1,
    fontFamily: fontFamily.Medium,
    fontSize: 17,
  },
});
