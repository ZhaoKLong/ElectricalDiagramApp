### 安装及软件bug修复
1. 执行命令时报错：
   “node”不是内部或外部命令，也不是可运行的程序 或
   “yarn”不是内部或外部命令，也不是可运行的程序 或
   “react-native”不是内部或外部命令，也不是可运行的程序
解决：三者均有可能为node环境变量配置问题：
   在环境变量配置中的path下添加如下配置：
```
C:\Program Files\nodejs
C:\Program Files\nodejs\mde_modules\npm\bin
```
   如果仍存在后两个问题，执行如下命令即可：
```
npm install -g yarn react-native-cli
```

2. Android-SDK无法下载
解决：翻墙

3. 移动设备明明已经接入，但是在调试运行时显示没有已接入的设备
解决：按顺序执行以下命令：
杀死adb：
```
adb kill-server
```
启动adb：
```
adb start-server
```

4. apk安装显示安装包损坏
解决：修改build.gradle文件中版本相关信息（安装时版本不得低于被覆盖的版本）

5.

### 运行bug修改
1. react-native-divide的PropTypes报错:
```
进入 node_modules\react-native-divide\index.js
import React, {Component , PropTypes} from 'react';删掉PropTypes
添加：import PropTypes from 'prop-types';
```

2. 报错：找不到符号if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {符号:   变量 P
```
node_modules\react-native-device-info\android\src\main\java\com\learnium\RNDeviceInfo\RNDeviceModule.java
478-496行改为:
return false;
```

3. 报错：找不到符号String overflow = ((ReactViewGroup) view).getOverflow();符号:   方法 getOverflow()
(建议直接拷贝一份旧项目中的组件包)
```
node_modules\react-native-gesture-handler\android\src\main\java\com\swmansion\gesturehandler\react\RNViewConfigurationHelper.java
删除3行，删除49-60行；

node_modules\react-native-gesture-handler\android\src\main\java\com\swmansion\gesturehandler\react\RNGestureHandlerButtonViewManager.java
删除62-74行；
90-134行改为：
private void updateBackground() {
      if (!mNeedBackgroundUpdate) {
        return;
      }
      mNeedBackgroundUpdate = false;
      if (mBackgroundColor == Color.TRANSPARENT) {
        // reset background
        setBackground(null);
      }
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        // reset foreground
        setForeground(null);
      }
      if (mUseForeground && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        setForeground(createSelectableDrawable());
        if (mBackgroundColor != Color.TRANSPARENT) {
          setBackgroundColor(mBackgroundColor);
        }
      } else if (mBackgroundColor == Color.TRANSPARENT) {
        setBackground(createSelectableDrawable());
      } else {
        PaintDrawable colorDrawable = new PaintDrawable(mBackgroundColor);
        Drawable selectable = createSelectableDrawable();
        if (mBorderRadius != 0) {
          // Radius-connected lines below ought to be considered
          // as a temporary solution. It do not allow to set
          // different radius on each corner. However, I suppose it's fairly
          // fine for button-related use cases.
          // Therefore it might be used as long as:
          // 1. ReactViewManager is not a generic class with a possibility to handle another ViewGroup
          // 2. There's no way to force native behavior of ReactViewGroup's superclass's onTouchEvent
          colorDrawable.setCornerRadius(mBorderRadius);
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP
                && selectable instanceof RippleDrawable) {
            PaintDrawable mask = new PaintDrawable(Color.WHITE);
            mask.setCornerRadius(mBorderRadius);
            ((RippleDrawable) selectable).setDrawableByLayerId(android.R.id.mask, mask);
          }
        }
        if (mRippleColor != null
                && Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP
                && selectable instanceof RippleDrawable) {
          int[][] states = new int[][] { new int[] { android.R.attr.state_enabled} };
          int[] colors = new int[] { mRippleColor };
          ColorStateList colorStateList = new ColorStateList(states, colors);
          ((RippleDrawable) selectable).setColor(colorStateList);
        }
        LayerDrawable layerDrawable = new LayerDrawable(
                new Drawable[] { colorDrawable, selectable});
        setBackground(layerDrawable);
      }
    }

node_modules\react-native-gesture-handler\android\lib\src\main\java\com\swmansion\gesturehandler\ViewConfigurationHelper.java
删除9行；

node_modules\react-native-gesture-handler\android\lib\src\main\java\com\swmansion\gesturehandler\GestureHandlerOrchestrator.java
删除8行、14行；
69行添加：
public GestureHandlerOrchestrator(ViewGroup wrapperView) {
    this(wrapperView, new GestureHandlerRegistryImpl(), new ViewConfigurationHelperImpl());
  }
252行改为：
for (int i = 0; i < handlersCount; i++) {
      mPreparedHandlers[i] = mGestureHandlers[i];
    }
265添加：
public GestureHandler getLastActivatedHandler() {
    GestureHandler result = null;
    for (int i = 0; i < mGestureHandlersCount; i++) {
      GestureHandler handler = mGestureHandlers[i];
      if (handler.mIsActive && (result == null || result.mActivationIndex < handler.mActivationIndex)) {
        result = handler;
      }
    }
    return result;
  }
删除293-296行；
删除324-343行；
400-418行改为：
PointF childPoint = sTempPoint;
      if (canReceiveEvents(child)
              && isTransformedTouchPointInView(coords[0], coords[1], viewGroup, child, childPoint)) {
        float restoreX = coords[0];
        float restoreY = coords[1];
        coords[0] = childPoint.x;
        coords[1] = childPoint.y;
        boolean found = traverseWithPointerEvents(child, coords, pointerId);
        coords[0] = restoreX;
        coords[1] = restoreY;
        if (found) {
          return true;
        }
      }
425-426行改为：
return !(view instanceof ViewGroup) || view.getBackground() != null;
481行添加：
boolean isWithinBounds = false;
    ArrayList<GestureHandler> handlers = mHandlerRegistry.getHandlersForView(child);
    if (handlers != null) {
      for (int i = 0, size = handlers.size(); !isWithinBounds && i < size; i++) {
        isWithinBounds = handlers.get(i).isWithinBounds(child, localX, localY);
      }
    }
    if (!isWithinBounds) {
      isWithinBounds = localX >= 0 && localX <= child.getWidth() && localY >= 0
              && localY < child.getHeight();
    }
    return isWithinBounds;
删除494-503行；
```

4. 报错：程序包android.support.v4.util不存在
node_modules\react-native-gesture-handler\android\src\main\java\com\swmansion\gesturehandler\react\RNGestureHandlerEvent.java
node_modules\react-native-gesture-handler\android\src\main\java\com\swmansion\gesturehandler\react\RNGestureHandlerStateChangeEvent.java
3行改为：
```
import androidx.core.util.Pools;
```
将android\build.gradle及所有node_modules中的第三方组件包的build.gradle文件中的：
```
dependencies {
        classpath 'com.android.tools.build:gradle:3.2---'
    }
```
全部升级到3.2以上,
将主程序的android\app\build.gradle中的：
```
compileSdkVersion **
buildToolsVersion **
targetSdkVersion **
升级到28
minSdkVersion **
升级到17
```
然后在android studio中执行：
```
Refactor-->Migrate to  AndroidX
```
在res文件夹下创建xml文件夹，并在内部创建network_config.xml文件，内容为：
```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
```
在AndroidManifest.xml文件中添加：
```
android:networkSecurityConfig="@xml/network_config"
```

5. IWoyouService.java:441: 错误: 解析时已到达文件结尾 case TRANSACTION_getForce
报错原因：在升级IDE 到android studio 3.5以后就会出现这个错误；
解决：把android\app\src\main\aidl中的所有文件的中文注释删除，再次运行即可

6. 报错Process 'command 'cmd'' finished with non-zero exit value 1
解决：在app的build.gradle里面添加下面这句：
```
defaultConfig {
    ......
    multiDexEnabled true
}
```

7. react-native-lahk-marquee-label报错：
```
node_modules\react-native-lahk-marquee-label\index.js：
31改为：if (newText !== oldText && this.state.animation !== null) {
或者32注释：// this.state.animation.stop();
```

8. aapt2相关：
将所有第三方组件的build.gradle中的targetSdkVersion及相关配置升级到28以上

9. 打包成功，但是启动app时报错java.lang.IllegalStateException: Native module RNDeviceModule tried to override RNDeviceModule for module name RNDeviceInfo. If this was your intention, set canOverrideExistingModule：
MainApplication.java中导包重复（既link重复），删除重复包即可

### 自定义修改
1. 选择器react-native-picker详细配置：
```
node_modules\react-native-picker\index.js
```

2. 页面跳转react-navigation的backButton配置：
```
node_modules\react-navigation-stack\dist\views\Header\HeaderBackButton.js
go 50行 更换为
return null;
```

3. Echarts配置：
图表组件默认可拖动，设置不可拖动需要修改
```
native-echarts->src->components->Echarts->index.js->
将两个false改为true
```

打包后Echarts不显示：
```
native-echarts->src->components->Echarts->index.js->
修改下面两行：
import {WebView, View, StyleSheet, Platform} from 'react-native';
source={Platform.OS === 'ios' ? require('./tpl.html') : {uri: 'file:///android_asset/tpl.html'}}
```
并且复制文件tpl.html（路径： node_modules\native-echarts\src\components\Echarts）至android\app\src\main\assets目录下

Echarts刷新闪烁问题：
```
native-echarts->src->components->Echarts->index.js->
7行添加：shouldComponentUpdate(nextProps, nextState) {
        const thisProps = this.props || {}
        nextProps = nextProps || {}
        if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
            return true
        }
        for (const key in nextProps) {
            if (JSON.stringify(thisProps[key]) != JSON.stringify(nextProps[key])) {
                return true
            }
        }
        return false
    }
23行改为：
this.refs.chart.injectJavaScript(renderChart(nextProps, false));
33行改为：
injectedJavaScript={renderChart(this.props, true)}
native-echarts->src->components->Echarts->renderChart.js->
4行添加：
var myChart = null;
9行添加：
if (isFirst) {
29行添加：
} else {
        return `
    document.getElementById('main').style.height = "${height}";
    document.getElementById('main').style.width = "${width}";
    myChart.setOption(${toString(props.option)});
    myChart.on('click', function(params) {
      var seen = [];
      var paramsString = JSON.stringify(params, function(key, val) {
        if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      });
      window.postMessage(paramsString);
    });
  `
    }
```

4. react-native-bluetooth-serial蓝牙修改：
```
node_modules\react-native-bluetooth-serial\android\src\main\java\com\rusel\RCTBluetoothSerial：
RCTBluetoothSerialPackage.java：23注释
```
