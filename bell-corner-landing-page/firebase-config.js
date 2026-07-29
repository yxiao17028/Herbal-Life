// Firebase Configuration for Bell Corner
const firebaseConfig = {
  apiKey: "AIzaSyBboryUUc0OhdjjrkGC1M1XR_eyOc8ZqAw",
  authDomain: "bell-corner.firebaseapp.com",
  projectId: "bell-corner",
  storageBucket: "bell-corner.firebasestorage.app",
  messagingSenderId: "311225415980",
  appId: "1:311225415980:web:42bf5cfb0632b4e4f75489"
};

// Export configuration if using ES modules or global variable for scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = firebaseConfig;
}
