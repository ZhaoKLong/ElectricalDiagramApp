# 项目使用技术
### 语言
React-Native：
https://reactnative.cn/
(常见bug见[FAQ](./FAQ.md))

### 硬件
商米打印机开发者文档：
http://ota.cdn.sunmi.com/DOC/resource/re_cn/Sunmiprinter%E5%BC%80%E5%8F%91%E8%80%85%E6%96%87%E6%A1%A31.1.180912.pdf

### 目录结构
```
react-native-app
├── android                                         // android资源
│   ├── app                
│   │   ├── src   
│   │   │   └── main   
│   │   │       ├── aidl                            // 调用打印时需要
│   │   │       ├── java    
│   │   │       │   └── com.myapp                   // android原生交互(MacModule.java为demo)
│   │   │       │       └── MainApplication.java    // android主入口
│   │   │       ├── res                             // android静态资源
│   │   │       │   ├── mipmap-***                  // 对应屏幕分辩率的app图标
│   │   │       │   └── xml                         
│   │   │       │       └── network_config.xml      // android9之后需要的配置
│   │   │       └── AndroidManifest.xml             // android原生权限配置(网络、存储、相机、定位...)
│   │   ├── build.gradle                            // app版本，打包相关、秘钥相关及第三方组件引用
│   │   └── my-release-key.keystore                 // app编译密钥(生成方法：https://reactnative.cn/docs/signed-apk-android/)
│   ├── gradle                                      // gradle相关
│   │   └── wrapper 
│   │           ├── gradle-wrapper.jar              // gradle匹配jar包
│   │           └── gradle-wrapper.properties       // gradle相关配置
│   ├── build.gradle                                // 第三方组件库及全局打包配置
│   ├── gradle.properties                            // 秘钥相关配置
│   └── settings.gradle                             // 第三方组件link
├── ios                                             // ios资源
├── node_modules                                    // 项目依赖(第三方组件)
├── src                                             // 应用主体
│   ├── components                                  // 公共组件
│   │   └── images                                  // 图片资源(组件用)
│   ├── images                                      // 图片资源(项目用)
│   ├── screens                                     // 页面
│   ├── utils                                       // 工具函数
│   │   ├── Api.js                                  // Api配置
│   │   ├── commonStyle.js                          // 通用样式
│   │   ├── Location.js                             // 获取定位方法
│   │   ├── config.js                               // 服务等系统配置
│   │   ├── dateUtils.js                            // 日期类工具
│   │   ├── Mac.js                                  // 获取Mac地址方法
│   │   ├── Permission.js                           // 权限检查工具
│   │   ├── Print.js                                // 商米打印方法
│   │   ├── request.js                              // 请求封装
│   │   ├── storage.js                              // 本地缓存
│   │   ├── utils.js                                // 通用工具
│   │   └── AppNavigator.js                         // 页面跳转配置
│   └── Root.js                                     // 界面入口及全局配置
├── .babelrc                                        // Babel的配置文件
├── .buckconfig                                     // buck的配置文件
├── .flowconfig                                     // JavaScript静态类型检测工具
├── .gitattributes                                  // 设定项目特殊的属性
├── .gitignore                                      // git 忽略目录配置
├── .watchmanconfig                                 // 监控bug文件
├── app.json                                        // 应用名称
├── FAQ.md                                          // FAQ文件
├── index.js                                        // 应用入口
├── package.json                                    // package.json
├── README.md                                       // 项目说明
└── yarn.lock                                       // JavaScript 包管理器
```

# 第三方组件
### 使用组件
获取设备相关信息：
```
npm install react-native-device-info
```

本地缓存：
```
npm install realm
```

签名组件：
```
npm install react-native-signature-capture
```

横屏组件：
```
npm install react-native-orientation
```

渐变色：
```
npm install react-native-linear-gradient
```

图片、视频上传：
```
npm install react-native-image-picker
```

文件下载:
```
npm install rn-fetch-blob
```

pdf浏览：
```
npm install react-native-pdf
```

滚动选择器：
```
npm install react-native-picker
```

图标：
```
npm install react-native-vector-icons
```
图标库：
https://oblador.github.io/react-native-vector-icons/

视频播放：
```
npm install react-native-video
```

FAQ地址: [FAQ](./FAQ.md)# ElectricalDiagramApp
