// Copyright 2015-present 650 Industries. All rights reserved.

#import <Foundation/Foundation.h>
#import <ExpoModulesCore/EXDefines.h>

@interface EXSessionTaskDelegate : NSObject

@property (nonatomic, strong, readonly) EXPromiseResolveBlock resolve;
@property (nonatomic, strong, readonly) EXPromiseRejectBlock reject;

- (instancetype)initWithResolve:(EXPromiseResolveBlock)resolve
                         reject:(EXPromiseRejectBlock)reject;

- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didFinishDownloadingToURL:(NSURL *)location;

- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error;

- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask
                                           didWriteData:(int64_t)bytesWritten
                                      totalBytesWritten:(int64_t)totalBytesWritten
                              totalBytesExpectedToWrite:(int64_t)totalBytesExpectedToWrite;

- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)dataTask didReceiveData:(NSData *)data;

- (NSDictionary *)parseServerResponse:(NSURLResponse *)response;

@end
