import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';

import Article from '../components/Article';
import { fetchNews } from '../api/news';
import { globalStyles } from '../styles';

const HomeScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);

      const data = await fetchNews();

      setArticles(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View
      style={[
        globalStyles.container,
        {
          flex: 1,
          width: '100%',
          paddingHorizontal: 24,
        },
      ]}
    >
      <FlatList
        data={articles}
        keyExtractor={(item, index) =>
          item.url || index.toString()
        }
        renderItem={({ item }) => (
          <Article article={item} />
        )}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={loadNews}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        ListHeaderComponent={
          <View
            style={{
              alignItems: 'center',
              marginTop: 30,
              marginBottom: 35,
            }}
          >
            <Text
              style={{
                fontSize: 42,
                fontWeight: '800',
                color: '#111',
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              Top Headlines
            </Text>

            <Text
              style={{
                fontSize: 17,
                color: '#666',
                textAlign: 'center',
                maxWidth: 750,
                lineHeight: 28,
              }}
            >
              Stay updated with breaking news, global events,
              technology, business, sports, entertainment,
              and trending stories from trusted sources —
              all in one modern news experience.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;