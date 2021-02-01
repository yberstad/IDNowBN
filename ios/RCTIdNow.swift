//
//  RCTIdNow.swift
//  IDNowBN
//
//  Created by Oyvind Habberstad on 01/02/2021.
//

import IDNowSDKCore

@objc
class RCTIDNow : NSObject {
  @objc
  func start(token: string) -> void {
    IDNowSDK.shared.start(token: token, preferredLanguage:"en", fromViewController: self, listener:{ (result: IDNowSDK.IdentResult, message: String) in
               if result == IDNowSDK.IdentResult.ERROR {
                   self.showAlert(text: message)
               } else if result == IDNowSDK.IdentResult.FINISHED {
               
               }
           })
  }
}
