package com.myapp;

import android.content.Context;
import android.location.LocationManager;
import android.os.Build;
import android.provider.Settings;
import android.text.TextUtils;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class LocationFetchModule extends ReactContextBaseJavaModule {
    private static final String TAG = "LocationFetch";
    private ReactApplicationContext reactContext;

    public LocationFetchModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return TAG;
    }

    /**
     * 判断定位服务是否开启
     *
     * @param callback 返回
     */
    @ReactMethod
    public void isLocationEnabled(Callback callback) {
        int locationMode = 0;
        String locationProviders;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            try {
                locationMode = Settings.Secure.getInt(reactContext.getContentResolver(), Settings.Secure.LOCATION_MODE);
//                locationMode = Settings.Secure.getInt(reactContext.getContentResolver(), Settings.ACTION_LOCATION_SOURCE_SETTINGS);
//                locationMode = Settings.Secure.getInt(reactContext.getContentResolver(), Settings.Secure.ALLOW_MOCK_LOCATION);
                callback.invoke(null, locationMode != Settings.Secure.LOCATION_MODE_OFF);
//                callback.invoke(locationMode);
            } catch (Settings.SettingNotFoundException e) {
                e.printStackTrace();
                callback.invoke(null, false);
            }
        } else {
            locationProviders = Settings.Secure.getString(reactContext.getContentResolver(), Settings.Secure.LOCATION_PROVIDERS_ALLOWED);
            callback.invoke(null, !TextUtils.isEmpty(locationProviders));
        }
    }

    /**
     * 判断GPS是否开启，GPS或者AGPS开启一个就认为是开启的
     *
     * @param callback 返回
     */
    @ReactMethod
    public void isOpen(Callback callback) {
        LocationManager locationManager = (LocationManager) getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);
        // 通过GPS卫星定位，定位级别可以精确到街（通过24颗卫星定位，在室外和空旷的地方定位准确、速度快）
        boolean gps = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
        // 通过WLAN或移动网络(3G/2G)确定的位置（也称作AGPS，辅助GPS定位。主要用于在室内或遮盖物（建筑群或茂密的深林等）密集的地方定位）
        boolean network = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
        callback.invoke(null, gps || network);
    }
}
