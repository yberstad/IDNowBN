import {NativeModules} from 'react-native';

const IDNowManager = (NativeModules as any).IDNowManager;

class IDNow {
  static start(identId: string, preferredLanguage: string) {
    return IDNowManager.start(identId, preferredLanguage) as Promise<string>;
  }
}

export default IDNow;
