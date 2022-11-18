import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const rawToken = await AsyncStorage.getItem(
      `${this.namespace}:token`,
    );

    return rawToken;
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    AsyncStorage.setItem(
      `${this.namespace}:token`, accessToken,
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;