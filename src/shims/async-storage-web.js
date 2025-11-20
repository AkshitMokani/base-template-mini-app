// Minimal web shim for @react-native-async-storage/async-storage
// Uses localStorage synchronously but exposes the async API expected by consumers.
const AsyncStorage = {
  async getItem(key) {
    try {
      const v = localStorage.getItem(key);
      return v === null ? null : v;
    } catch (e) {
      return null;
    }
  },
  async setItem(key, value) {
    try {
      localStorage.setItem(key, value);
      return null;
    } catch (e) {
      throw e;
    }
  },
  async removeItem(key) {
    try {
      localStorage.removeItem(key);
      return null;
    } catch (e) {
      throw e;
    }
  },
  async clear() {
    try {
      localStorage.clear();
      return null;
    } catch (e) {
      throw e;
    }
  },
  // multiGet/multiSet minimal implementations
  async multiGet(keys) {
    return keys.map((k) => [k, localStorage.getItem(k)]);
  },
  async multiSet(entries) {
    entries.forEach(([k, v]) => localStorage.setItem(k, v));
    return null;
  }
};

export default AsyncStorage;
