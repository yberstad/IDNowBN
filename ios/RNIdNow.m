//
//  RNIdNow.m
//  IDNowBN
//
//  Created by Oyvind Habberstad on 02/02/2021.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(IDNowManager, NSObject)
RCT_EXTERN_METHOD(
                  start: (NSString *)token
                  resolve: (RCTPromiseResolveBlock)resolve
                  reject: (RCTPromiseRejectBlock)reject
                  )
@end
