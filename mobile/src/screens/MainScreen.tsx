import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSession } from '../hooks/useSession';

export const MainScreen: React.FC = () => {
  const { session, isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Radius App</Text>
      
      {isAuthenticated ? (
        <View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.userInfo}>User ID: {session?.userId}</Text>
        </View>
      ) : (
        <Text style={styles.authText}>Please log in to continue</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 14,
    color: '#666',
  },
  authText: {
    fontSize: 16,
    color: '#999',
  },
});
