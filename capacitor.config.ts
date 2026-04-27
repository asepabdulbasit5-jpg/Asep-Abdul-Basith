import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zivpn.custom',
  appName: 'ZiVPN PRO',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
