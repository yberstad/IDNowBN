package com.idnowbn;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import de.idnow.core.IDnowConfig;
import de.idnow.core.IDnowResult;
import de.idnow.core.IDnowSDK;

public class RCTIDNowModule extends ReactContextBaseJavaModule implements IDnowSDK.IDnowResultListener{

    @Override
    public String getName() {
        return "IDNowBridge";
    }


    private final ReactApplicationContext reactContext;
    private Promise idnowPromise;
    private IDnowSDK idnowSdk;
    private static String TAG = com.idnowbn.RCTIDNowModule.class.getSimpleName();

    public RCTIDNowModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        // Add the listener for `onActivityResult`
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            Log.d("ReactNative", "RCTIDNowModule.onActivityResult -> requestCode:" + requestCode+ " resultCode:" + resultCode);
        }
    };


    @ReactMethod
    public void start(final String identId, final Promise promise) {
        try {
            idnowPromise = promise;
            IDnowConfig iDnowConfig = IDnowConfig.Builder.getInstance().build();
            idnowSdk = IDnowSDK.getInstance();
            AppCompatActivity activity = getActivity();
            idnowSdk.initialize(activity, iDnowConfig);
            idnowSdk.startIdent(identId, this);
        } catch (Exception e) {
            logError(e);
            promise.reject("ERROR", e.getMessage());
        }
    }

    private AppCompatActivity getActivity() {
        return (AppCompatActivity)getReactApplicationContext().getCurrentActivity();
    }

    private void logError(Exception e) {
        Log.d("ReactNative", e.getMessage());
        for (StackTraceElement element : e.getStackTrace())
            Log.d("ReactNative", element.toString());
    }


    @Override
    public void onIdentResult(IDnowResult iDnowResult) {
        Log.d("ReactNative", "RCTIDNowModule.onIdentResult -> getIDnowStatusCode:" +iDnowResult.getIDnowStatusCode());
        if (iDnowResult.getIDnowStatusCode() == IDnowResult.IDnowStatusCode.FINISHED) {
            Log.d(TAG, "Finished");
        } else if (iDnowResult.getIDnowStatusCode() == IDnowResult.IDnowStatusCode.CANCELLED) {
            Log.d(TAG, "Cancelled");
        } else if (iDnowResult.getIDnowStatusCode() == IDnowResult.IDnowStatusCode.ERROR) {
            Log.d(TAG, "Error: " + iDnowResult.getMessage());
            idnowPromise.reject("ERROR", iDnowResult.getMessage());
        }
    }
}
