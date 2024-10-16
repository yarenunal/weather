import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'weather',
  webDir: 'www',
  plugins: {
    LocalNotifications: {
      // Varsayılan ayarlar burada belirtilebilir
    },
  },
};

export default config;
