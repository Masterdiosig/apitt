import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, Linking } from 'react-native';
import { Video } from 'expo-av';

export default function TikTokDownloader() {
  const [url, setUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchVideo = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch(`http://<YOUR_SERVER_IP>:3000/tiktok?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.success) {
        setVideoUrl(data.download_url);
      } else {
        alert('Tải video thất bại');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối đến server');
    }
    setLoading(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nhập link TikTok"
        value={url}
        onChangeText={setUrl}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Tải Video" onPress={fetchVideo} />
      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
      {videoUrl ? (
        <>
          <Video
            source={{ uri: videoUrl }}
            useNativeControls
            style={{ width: '100%', height: 300, marginTop: 20 }}
            resizeMode="contain"
          />
          <Text
            onPress={() => Linking.openURL(videoUrl)}
            style={{ marginTop: 10, color: 'blue' }}
          >
            👉 Tải về video không logo
          </Text>
        </>
      ) : null}
    </View>
  );
}
