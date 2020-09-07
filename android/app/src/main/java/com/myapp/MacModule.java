package com.myapp;

import android.annotation.SuppressLint;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.Reader;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Enumeration;

public class MacModule extends ReactContextBaseJavaModule {
    private static final String TAG = "Mac";
    private ReactApplicationContext reactContext;

    public MacModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

    }

    @Override
    public String getName() {
        return TAG;
    }

    /**
     * 获取设备MAC地址
     *
     * @param callback
     */
    @ReactMethod
    public void getMac(Callback callback) {

        // Toast.makeText(getReactApplicationContext(),   getPhoneMacAddress(getReactApplicationContext()), Toast.LENGTH_LONG).show();
//给rn发送信息
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("nativeCallRn", getPhoneMacAddress(getReactApplicationContext()));
        callback.invoke(null, getPhoneMacAddress(getReactApplicationContext()));
    }

    /**
     * 获取设备SN编码
     *
     * @param callback
     */
    @ReactMethod
    public void getDeviceSN(Callback callback) {
        @SuppressLint("HardwareIds") String serialNumber = android.os.Build.SERIAL;
//        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                .emit("nativeCallRn", serialNumber);
        callback.invoke(null, serialNumber);
    }

    private static final String marshmallowMacAddress = "02:00:00:00:00:00";

    public static String getPhoneMacAddress(Context context) {
        WifiManager wifiMan = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
        WifiInfo wifiInf = wifiMan.getConnectionInfo();
        if (wifiInf != null && marshmallowMacAddress.equals(wifiInf.getMacAddress())) {
            return getAndroid6MacAddress();
        } else {
            if (wifiInf != null && wifiInf.getMacAddress() != null) {
                return wifiInf.getMacAddress();
            } else {
                return "";
            }
        }
    }

    public static String getAndroid6MacAddress() {
        String str = "";
        String macSerial = "";
        try {
            Process pp = Runtime.getRuntime().exec("cat /sys/class/net/wlan0/address ");
            InputStreamReader ir = new InputStreamReader(pp.getInputStream());
            LineNumberReader input = new LineNumberReader(ir);

            for (; null != str; ) {
                str = input.readLine();
                if (str != null) {
                    macSerial = str.trim();// 去空格
                    break;
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        if (macSerial == null || "".equals(macSerial)) {
            try {
                return loadFileAsString("/sys/class/net/eth0/address").toUpperCase().substring(0, 17);
            } catch (Exception e) {
                e.printStackTrace();
            }
            //N
            //针对android7.0获取mac
            if (TextUtils.isEmpty(macSerial)) {
                Log.e("到7.0这里了", "====");
                try {
                    Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
                    while (interfaces.hasMoreElements()) {
                        NetworkInterface iF = interfaces.nextElement();
                        byte[] addr = iF.getHardwareAddress();
                        if (addr == null || addr.length == 0) {
                            continue;
                        }
                        StringBuilder buf = new StringBuilder();
                        for (byte b : addr) {
                            buf.append(String.format("%02X:", b));
                        }
                        if (buf.length() > 0) {
                            buf.deleteCharAt(buf.length() - 1);
                        }
                        String mac = buf.toString();
                        //  Trace.d(LOG_TAG, "interfaceName=" + iF.getName() + ", mac=" + mac);
                        if (iF.getName().equalsIgnoreCase("wlan0")) {
                            macSerial = mac;
                            break;
                        }
                    }
                } catch (Exception e) {
                    // Log.d(LOG_TAG, "SocketException e=" + e.getMessage());
                    e.printStackTrace();
                }
            }
            //stop
        }
        return macSerial;
    }

    private static String loadFileAsString(String fileName) throws Exception {
        FileReader reader = new FileReader(fileName);
        String text = loadReaderAsString(reader);
        reader.close();
        return text;
    }

    private static String loadReaderAsString(Reader reader) throws Exception {
        StringBuilder builder = new StringBuilder();
        char[] buffer = new char[4096];
        int readLength = reader.read(buffer);
        while (readLength >= 0) {
            builder.append(buffer, 0, readLength);
            readLength = reader.read(buffer);
        }
        return builder.toString();
    }
}
