//
//  RNIdNowView.swift
//  IDNowBN
//
//  Created by Oyvind Habberstad on 02/02/2021.
//

import Foundation
import IDNowSDKCore

@objc(IDNowManager)
class IDNowManager : NSObject {
  private var _resolve: RCTPromiseResolveBlock? = nil;
  private var _reject: RCTPromiseRejectBlock? = nil;
  
  @objc
  func start(_ token: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
    self._resolve = resolve;
    self._reject = reject;
    let rootViewController = UIApplication.shared.delegate?.window??.rootViewController
    
    IDNowSDK.shared.start(token: token, preferredLanguage:"en", fromViewController: rootViewController!, listener:{ (result: IDNowSDK.IdentResult, message: String) in
               if result == IDNowSDK.IdentResult.ERROR {
                self._reject!("ERROR", message, nil);
               } else if result == IDNowSDK.IdentResult.FINISHED {
                self._resolve!(IDNowSDK.IdentResult.FINISHED);
               }
           })
  }
}
