import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  containerPost: {
    marginBottom: 10,
    marginHorizontal: 16,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 3,
    color: '#212121',
  },
  comentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
