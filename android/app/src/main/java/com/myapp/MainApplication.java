package com.myapp;

import android.app.Application;

import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.beefe.picker.PickerViewPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import io.realm.react.RealmReactPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rssignaturecapture.RSSignatureCapturePackage;
import com.beefe.picker.PickerViewPackage;
import org.wonday.pdf.RCTPdfView;
import com.github.yamill.orientation.OrientationPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.yamill.orientation.OrientationPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rssignaturecapture.RSSignatureCapturePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import org.wonday.pdf.RCTPdfView;

import java.util.Arrays;
import java.util.List;

import io.realm.react.RealmReactPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNDeviceInfo(),
                    new RNFetchBlobPackage(),
                    new RealmReactPackage(),
                    new RSSignatureCapturePackage(),
                    new PickerViewPackage(),
                    new OrientationPackage(),
                    new LinearGradientPackage(),
                    new ImagePickerPackage(),
                    new RNGestureHandlerPackage(),
                    new VectorIconsPackage(),
                    new ReactVideoPackage(),
                    new RCTPdfView(),
                    new PrintPackage(),
                    new LocationFetchPackage(),
                    new PermissionPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
