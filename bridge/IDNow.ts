import {NativeModules} from 'react-native';

const IDNowManager = (NativeModules as any).IDNowManager;

class IDNow {
  static start(identId: string) {
    return IDNowManager.start(identId) as Promise<string>;
  }
}

export default IDNow;
