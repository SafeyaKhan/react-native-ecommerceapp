import React, { useState } from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlrv6nogn/upload';
const UPLOAD_PRESET = 'frontend_upload';

const UploadImage = () => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
    });

    if (result.didCancel) return;
    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage);
      return;
    }

    const asset = result.assets[0];
    setImageUri(asset.uri);
    uploadImage(asset);
  };

  const uploadImage = async asset => {
    setLoading(true);
    const data = new FormData();
    data.append('file', {
      uri: asset.uri,
      type: asset.type,
      name: asset.fileName || `upload_${Date.now()}.jpg`,
    });
    data.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, data);
      setImageUri(res.data.secure_url);
      Alert.alert('Success', 'Image uploaded to Cloudinary!');
      console.log('Cloudinary URL:', res.data.secure_url);
    } catch (error) {
      console.log(error);
      Alert.alert('Upload Failed', 'Check console for error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick Image" onPress={pickImage} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});
