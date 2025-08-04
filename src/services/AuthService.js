import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

/**
 * Authentication service using Expo LocalAuthentication
 * Handles biometric and device passcode authentication in bare React Native
 */
class AuthService {
  /**
   * Check if biometric hardware is available on device
   * @returns {Promise<boolean>} Hardware availability status
   */
  async hasHardware() {
    try {
      return await LocalAuthentication.hasHardwareAsync();
    } catch (error) {
      console.error('Hardware check failed:', error);
      return false;
    }
  }

  /**
   * Check if biometric records are enrolled
   * @returns {Promise<boolean>} Enrollment status
   */
  async isEnrolled() {
    try {
      return await LocalAuthentication.isEnrolledAsync();
    } catch (error) {
      console.error('Enrollment check failed:', error);
      return false;
    }
  }

  /**
   * Get supported authentication types
   * @returns {Promise<Array>} Array of supported authentication types
   */
  async getSupportedAuthTypes() {
    try {
      return await LocalAuthentication.supportedAuthenticationTypesAsync();
    } catch (error) {
      console.error('Support check failed:', error);
      return [];
    }
  }

  /**
   * Get security level of enrolled authentication
   * @returns {Promise<number>} Security level
   */
  async getSecurityLevel() {
    try {
      return await LocalAuthentication.getEnrolledLevelAsync();
    } catch (error) {
      console.error('Security level check failed:', error);
      return LocalAuthentication.SecurityLevel.NONE;
    }
  }

  /**
   * Authenticate user using available biometric or device credentials
   * @param {string} promptMessage - Message to display in authentication prompt
   * @returns {Promise<boolean>} Authentication result
   */
  async authenticate(promptMessage = 'Authenticate to modify your todos') {
    try {
      // Check hardware availability
      const hasHardware = await this.hasHardware();
      if (!hasHardware) {
        Alert.alert(
          'Authentication Unavailable',
          'Biometric authentication hardware is not available on this device.',
        );
        return false;
      }

      // Check enrollment status
      const isEnrolled = await this.isEnrolled();
      if (!isEnrolled) {
        Alert.alert(
          'Authentication Not Set Up',
          'Please set up biometric authentication (Face ID, Touch ID, or Fingerprint) in your device settings.',
        );
        return false;
      }

      // Perform authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        fallbackLabel: 'Use device passcode',
        disableDeviceFallback: false, // Allow device passcode as fallback
        cancelLabel: 'Cancel',
      });

      if (result.success) {
        return true;
      } else {
        // Handle different error types
        if (result.error === 'UserCancel') {
          // User cancelled, don't show error
          return false;
        } else if (result.error === 'SystemCancel') {
          Alert.alert(
            'Authentication Cancelled',
            'Authentication was cancelled by the system.',
          );
        } else if (result.error === 'BiometricUnavailable') {
          Alert.alert(
            'Biometric Unavailable',
            'Biometric authentication is currently unavailable.',
          );
        } else if (result.error === 'UserFallback') {
          // User chose to use device passcode
          return false;
        } else {
          Alert.alert(
            'Authentication Failed',
            'Authentication failed. Please try again.',
          );
        }
        return false;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert(
        'Authentication Error',
        'An error occurred during authentication. Please try again.',
      );
      return false;
    }
  }

  /**
   * Get user-friendly authentication type names
   * @returns {Promise<Array<string>>} Array of authentication type names
   */
  async getAuthTypeNames() {
    try {
      const types = await this.getSupportedAuthTypes();
      const typeNames = [];

      if (
        types.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
        )
      ) {
        typeNames.push('Face ID');
      }
      if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        typeNames.push('Touch ID/Fingerprint');
      }
      if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
        typeNames.push('Iris Recognition');
      }

      return typeNames.length > 0 ? typeNames : ['Device Authentication'];
    } catch (error) {
      console.error('Auth type names error:', error);
      return ['Device Authentication'];
    }
  }

  /**
   * Check comprehensive authentication capability
   * @returns {Promise<Object>} Complete authentication status
   */
  async checkAuthCapability() {
    try {
      const hasHardware = await this.hasHardware();
      const isEnrolled = await this.isEnrolled();
      const supportedTypes = await this.getSupportedAuthTypes();
      const typeNames = await this.getAuthTypeNames();
      const securityLevel = await this.getSecurityLevel();

      return {
        hasHardware,
        isEnrolled,
        supportedTypes,
        typeNames,
        securityLevel,
        isReady: hasHardware && isEnrolled,
      };
    } catch (error) {
      console.error('Capability check failed:', error);
      return {
        hasHardware: false,
        isEnrolled: false,
        supportedTypes: [],
        typeNames: ['Device Authentication'],
        securityLevel: LocalAuthentication.SecurityLevel.NONE,
        isReady: false,
      };
    }
  }
}

export default new AuthService();
