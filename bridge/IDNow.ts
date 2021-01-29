import { NativeModules } from "react-native";

const IDNowBridge = (NativeModules as any).IDNowBridge;

class IDNow {
  static start(identId: string) {
    return IDNowBridge.start(identId) as Promise<string>;
  }
}

export default IDNow;
