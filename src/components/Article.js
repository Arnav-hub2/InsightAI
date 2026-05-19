import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  Animated,
  Pressable,
  Platform,
} from 'react-native';

import { formatDate } from '../utils';

const Article = ({ article }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={() => Linking.openURL(article.url)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {article.urlToImage ? (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.sourceTag}>
            {article.source?.name?.toUpperCase() || 'NEWS'}
          </Text>

          <Text style={styles.title} numberOfLines={2}>
            {article.title}
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            {article.description ||
              'Click to read more details about this story.'}
          </Text>

          <View style={styles.footer}>
            <Text style={styles.date}>
              {formatDate(article.publishedAt)}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',

    width: '100%',
    maxWidth: Platform.OS === 'web' ? 1400 : '100%',

    alignSelf: 'center',

    borderRadius: 12,
    marginVertical: 8,
    padding: 12,

    elevation: 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.1,
    shadowRadius: 5,

    alignItems: 'center',
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#eee',
  },

  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },

  content: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },

  sourceTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#007BFF',
    letterSpacing: 0.5,
    marginBottom: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
    lineHeight: 22,
  },

  description: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginBottom: 10,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  date: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
});

export default Article;