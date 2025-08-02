
# Secure Todo App

A secured TODO list application built with **bare React Native** and **Expo local-authentication** module. The app requires biometric/device authentication before allowing users to add, update, or delete todo items.

## Security Features

- **Biometric Authentication**: Face ID, Touch ID, or Fingerprint required for all CRUD operations
- **Device Passcode Fallback**: Uses device passcode when biometrics unavailable
- **Authentication Gate**: All modifications require user authentication
- **Secure Data Storage**: Local data persistence with AsyncStorage

##  Architecture

- **Bare React Native CLI Project** (not Expo managed)
- **Clean State Management** with useReducer pattern
- **Service Layer Architecture** with separated concerns
- **Component-based UI** with reusable components
- **Robust Error Handling** and loading states

##  Features

✅ **Add new todos** (requires authentication)  
✅ **Edit existing todos** (requires authentication)  
✅ **Mark todos as complete/incomplete** (requires authentication)  
✅ **Delete individual todos** (requires authentication)  
✅ **Clear completed todos** (requires authentication)  
✅ **Data persistence** with AsyncStorage  
✅ **Statistics display** (total, pending, completed)  
✅ **Pull to refresh**  
✅ **Loading states and error handling**  

## 🛠️ Tech Stack

- **React Native CLI** (Bare project)
- **Expo Local Authentication** (Biometric authentication)
- **AsyncStorage** (Data persistence)
- **useReducer** (State management)
- **Jest + React Native Testing Library** (Unit testing)


## 🚀 Installation & Setup

### 1. Clone Repository
git clone <your-repo-url>
cd SecureTodoApp

### 2. Install Dependencies
npm install

Install Expo modules for bare React Native
npx install-expo-modules@latest

Install authentication module
npx expo install expo-local-authentication


### 3. iOS Setup
cd ios && pod install && cd ..

text

### 4. Platform Configuration

**iOS (ios/SecureTodoApp/Info.plist):**
<key>NSFaceIDUsageDescription</key>
<string>This app uses Face ID to authenticate and protect your todo list</string>


**Android (android/app/src/main/AndroidManifest.xml):**
<uses-permission android:name="android.permission.USE_FINGERPRINT" /> <uses-permission android:name="android.permission.USE_BIOMETRIC" /> ```
🏃‍♂️ Running the App
Development

# Start Metro bundler
npx react-native start

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
Clean Build

# Clean everything
npx react-native clean
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..

# Start fresh
npx react-native start --reset-cache
npx react-native run-ios
