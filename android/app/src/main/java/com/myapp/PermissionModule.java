package com.myapp;

import android.content.pm.PackageManager;

import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class PermissionModule extends ReactContextBaseJavaModule {
    private static final String TAG = "Permission";
    private ReactApplicationContext reactContext;

    public PermissionModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return TAG;
    }

//    /**
//     * 判断权限是否开启
//     *
//     * @param permission 权限字段
//     */
//    @ReactMethod
//    public boolean isPermissionEnabled(String permission) {
//            if (lacksPermission(permission)) {
//                return true;
//            }
//        return false;
//    }

    /**
     * 判断是否缺少权限
     */
    @ReactMethod
    private boolean lacksPermission(String permission) {
        return ContextCompat.checkSelfPermission(reactContext, permission) ==
                PackageManager.PERMISSION_DENIED;
    }
}
