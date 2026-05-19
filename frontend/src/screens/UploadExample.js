import React, { useState } from 'react';
import { View, Button, Image, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function UploadExample() {
  const [image, setImage] = useState(null);

  const pickAndUpload = async () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets[0];
        const localUri = asset.uri;
        const filename = asset.fileName || 'photo.jpg';
        const type = asset.type || 'image/jpeg';

        const formData = new FormData();
        formData.append('image', {
          uri:
            Platform.OS === 'android'
              ? localUri
              : localUri.replace('file://', ''),
          name: filename,
          type: type,
        });

        // Upload to backend
        try {
          const res = await fetch('http://192.168.1.5:5000/api/upload', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const data = await res.json();
          console.log('Cloudinary URL:', data.imageUrl);
          setImage(data.imageUrl);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick & Upload Image" onPress={pickAndUpload} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}
    </View>
  );
}
