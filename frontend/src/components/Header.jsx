import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ isHome }) => {
  const navigation = useNavigation();

  const handleLeftPress = () => {
    if (!isHome) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLeftPress}>
        {isHome ? (
          <Image
            source={require('../assets/headerimage1.png')}
            style={{ width: 28, height: 28 }}
          />
        ) : (
          <Ionicons name="chevron-back" size={24} color={'#e96e6e'} />
        )}
      </TouchableOpacity>

      <Image
        source={require('../assets/headerimage2.png')}
        style={{ width: 28, height: 28 }}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
  },
});
