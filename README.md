# Software Verification and Validation - Project 2

Group Members: Osama Tanveer, Mannan Abdul

## Project Structure

> * assets
> * components
> * config
> * node_modules
> * pages
> * app.json
> * App.tsx
> * babel.config.js
> * package.json
> * package-lock.json
> * tsconfig.json
> * tests
>   * apk.test.js
>   * testConfig.js
>   * testHelpers.js

All files related to testing with `Jest` and `Appium` using `webdriverio` are in the tests folder. Details on each file will be given in the report. All other files are
related to building the `React Native` application.

## Project Setup

The project was made using `React Native` and was optimised for Android only, it has not been tested for IOS. The steps provided are for running and testing the project
on Android. The project can be run both on an emulator or an Android device. The steps for setting up the project are below:

1. [Setup environment](https://reactnative.dev/docs/environment-setup) from the `React Native` Docs to suit your needs.
2. (Emulator) If you want to test or run the device on an emulator, download `Android Studio` and while setting up a device, choose a `Pixel 3a` with `API 32` system image.
3. (Android Phone) Make sure that your phone has developer options turned on and verify apps over usb turned off, then connect your phone via USB to your laptop
4. Make sure that your `ANDROID_HOME` environment variable points to your android SDK, the path can be found in Android Studio > SDK Manager
5. (For Mac) set the `ANDROID_HOME` variable in .zprofile if you use .zshrc or in .bash_profile if you use bash.

**Please make sure that either your phone is connected to your laptop or the emulator is running, do not run the emulator and connect your phone to the laptop at the same time**

### Running the App
The following steps are the same regardless of whether you are running/testing on an Android device or an emulator. Just setup one of these options before running/testing.
The project can be run either using Expo or the APK we will link in the email.

1. Clone the following project to your laptop
2. Open a terminal in project root and run `npm i` to install all the dependencies. You may have to install appium seperately using `npm install -g appium`
3. (Expo) Run `expo start` and expo will open up in your browser, choose the android option to run it on your device/emulator
4. (APK) Run `adb devices` to make sure only one device is connected. Then, run `adb install path/to/apk`. `path/to/apk` is the full path from root where you have downloaded the APK. The app is now installed on your device/emulator and can be run.

### Testing the App
Making Appium work nice with Expo proved to be very difficult and more importantly, unreliable. That is why the tests we have written will only run on the APK, We provide running options for both Expo and the APK so it can be verified that the APK is indeed the same app as in our project. Testing can also be done on either an Android device or an emulator

1. Clone the Project
2. Run `npm install` in project root to install dependencies.
3. Run `adb devices` to make sure only one device is connected. Then, run `adb install path/to/apk`. `path/to/apk` is the full path from root where you have downloaded the APK. The app is now installed on your device/emulator and can be run.
4. Once your emulator/device has the APK installed, keep it opened/connected and run `appium` in project root.
5. `cd` into tests folder in the project and run `npm test apk.test.js` and the tests should start running.

## Important Notes About the Project
The emulator may sometimes cause problems and can cause the first test to fail, that is why we have included a dummy test to make sure the emulator is running properly
and then we move on to the cases we actually want to test. You may have to restart the testing suite.

In case of any issues, feel free to contact us.
