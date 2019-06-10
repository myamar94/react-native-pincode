/// <reference path='./src/types.d.ts'/>
import ApplicationLocked from "./src/ApplicationLocked";
import { PinStatus } from "./src/PinCode";
import PinCodeChoose from "./src/PinCodeChoose";
import PinCodeEnter from "./src/PinCodeEnter";
import { hasPinCode, deletePinCode, resetInternalStates, PinResultStatus } from "./src/utils";

import AsyncStorage from '@react-native-community/async-storage'
import * as React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";

export type IProps = {
  bottomLeftComponent?: any
  buttonComponentLockedPage?: any
  buttonDeleteComponent?: any
  buttonDeleteText?: string
  buttonNumberComponent?: any
  callbackErrorTouchId?: (error: Error) => void
  colorCircleButtons?: string
  colorPassword?: string
  colorPasswordEmpty?: string
  colorPasswordError?: string
  disableLockScreen?: boolean
  endProcessFunction?: (pinCode: string) => void
  finishProcess?: (pinCode?: string) => void
  getCurrentPinLength?: (length: number) => void
  handleResultEnterPin?: any
  iconComponentLockedPage?: any
  iconButtonDeleteDisabled?: boolean
  lockedPage?: any
  maxAttempts?: number
  numbersButtonOverlayColor?: string
  onClickButtonLockedPage?: any
  onFail?: any
  passwordComponent?: any
  passwordLength?: number
  pinAttemptsAsyncStorageName?: string
  pinCodeKeychainName?: string
  pinCodeVisible?: boolean
  pinStatus?: PinResultStatus
  status: "choose" | "enter" | "locked"
  storedPin?: string
  storePin?: any
  styleMainContainer?: StyleProp<ViewStyle>
  stylePinCodeChooseContainer?: StyleProp<ViewStyle>
  stylePinCodeEnterContainer?: StyleProp<ViewStyle>
  styleLockScreenButton?: StyleProp<ViewStyle>
  styleLockScreenColorIcon?: string
  styleLockScreenMainContainer?: StyleProp<ViewStyle>
  styleLockScreenNameIcon?: string
  styleLockScreenSizeIcon?: number
  styleLockScreenText?: StyleProp<TextStyle>
  styleLockScreenTextButton?: StyleProp<TextStyle>
  styleLockScreenTextTimer?: StyleProp<TextStyle>
  styleLockScreenTitle?: StyleProp<TextStyle>
  styleLockScreenViewCloseButton?: StyleProp<ViewStyle>
  styleLockScreenViewIcon?: StyleProp<ViewStyle>
  styleLockScreenViewTextLock?: StyleProp<ViewStyle>
  styleLockScreenViewTimer?: StyleProp<ViewStyle>
  stylePinCodeButtonCircle?: StyleProp<ViewStyle>
  stylePinCodeButtonNumber?: string
  stylePinCodeButtonNumberPressed?: string
  stylePinCodeCircle?: StyleProp<ViewStyle>
  stylePinCodeColorSubtitle?: string
  stylePinCodeColorSubtitleError?: string
  stylePinCodeColorTitle?: string
  stylePinCodeColorTitleError?: string
  stylePinCodeColumnButtons?: StyleProp<ViewStyle>
  stylePinCodeColumnDeleteButton?: StyleProp<ViewStyle>
  stylePinCodeDeleteButtonColorHideUnderlay?: string
  stylePinCodeDeleteButtonColorShowUnderlay?: string
  stylePinCodeDeleteButtonIcon?: string
  stylePinCodeDeleteButtonSize?: number
  stylePinCodeDeleteButtonText?: StyleProp<TextStyle>
  stylePinCodeEmptyColumn?: StyleProp<ViewStyle>
  stylePinCodeHiddenPasswordCircle?: StyleProp<ViewStyle>
  stylePinCodeHiddenPasswordSizeEmpty?: number
  stylePinCodeHiddenPasswordSizeFull?: number
  stylePinCodeMainContainer?: StyleProp<ViewStyle>
  stylePinCodeRowButtons?: StyleProp<ViewStyle>
  stylePinCodeTextButtonCircle?: StyleProp<TextStyle>
  stylePinCodeTextSubtitle?: StyleProp<TextStyle>
  stylePinCodeTextTitle?: StyleProp<TextStyle>
  stylePinCodeViewTitle?: StyleProp<TextStyle>
  subtitleChoose?: string
  subtitleComponent?: any
  subtitleConfirm?: string
  subtitleEnter?: string
  subtitleError?: string
  textButtonLockedPage?: string
  textCancelButtonTouchID?: string
  textDescriptionLockedPage?: string
  textSubDescriptionLockedPage?: string
  textPasswordVisibleFamily?: string
  textPasswordVisibleSize?: number
  textTitleLockedPage?: string
  timeLocked?: number
  timePinLockedAsyncStorageName?: string
  timerComponentLockedPage?: any
  titleAttemptFailed?: string
  titleChoose?: string
  titleComponent?: any
  titleComponentLockedPage?: any
  titleConfirm?: string
  titleConfirmFailed?: string
  titleEnter?: string
  titleValidationFailed?: string
  touchIDDisabled?: boolean
  touchIDSentence?: string
  touchIDTitle?: string
  validationRegex?: RegExp
}

export type IState = {
  internalPinStatus: PinResultStatus
  pinLocked: boolean
}

const disableLockScreenDefault = false;
const timePinLockedAsyncStorageNameDefault = "timePinLockedRNPin";
const pinAttemptsAsyncStorageNameDefault = "pinAttemptsRNPin";
const pinCodeKeychainNameDefault = "reactNativePinCode";
const touchIDDisabledDefault = false;
const touchIDTitleDefault = 'Authentication Required';

class PINCode extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { internalPinStatus: PinResultStatus.initial, pinLocked: false };
    this.changeInternalStatus = this.changeInternalStatus.bind(this);
    this.renderLockedPage = this.renderLockedPage.bind(this);
  }

  async componentWillMount() {
    await AsyncStorage.getItem(this.props.timePinLockedAsyncStorageName || timePinLockedAsyncStorageNameDefault).then((val) => {
      this.setState({ pinLocked: !!val });
    });
  }

  changeInternalStatus = (status: PinResultStatus) => {
    if (status === PinResultStatus.initial) this.setState({ pinLocked: false });
    this.setState({ internalPinStatus: status });
  };

  renderLockedPage = () => {
    return (
      <ApplicationLocked
        buttonComponent={this.props.buttonComponentLockedPage || null}
        changeStatus={this.changeInternalStatus}
        colorIcon={this.props.styleLockScreenColorIcon}
        iconComponent={this.props.iconComponentLockedPage || null}
        nameIcon={this.props.styleLockScreenNameIcon}
        onClickButton={this.props.onClickButtonLockedPage || (() => {
          throw ("Quit application");
        })}
        pinAttemptsAsyncStorageName={this.props.pinAttemptsAsyncStorageName || pinAttemptsAsyncStorageNameDefault}
        sizeIcon={this.props.styleLockScreenSizeIcon}
        styleButton={this.props.styleLockScreenButton}
        styleMainContainer={this.props.styleLockScreenMainContainer}
        styleText={this.props.styleLockScreenText}
        styleTextButton={this.props.styleLockScreenTextButton}
        styleTextTimer={this.props.styleLockScreenTextTimer}
        styleTitle={this.props.styleLockScreenTitle}
        styleViewButton={this.props.styleLockScreenViewCloseButton}
        styleViewIcon={this.props.styleLockScreenViewIcon}
        styleViewTextLock={this.props.styleLockScreenViewTextLock}
        styleViewTimer={this.props.styleLockScreenViewTimer}
        textButton={this.props.textButtonLockedPage || "Quit"}
        textDescription={this.props.textDescriptionLockedPage || undefined}
        textSubDescription={this.props.textSubDescriptionLockedPage || undefined}
        textTitle={this.props.textTitleLockedPage || undefined}
        timePinLockedAsyncStorageName={this.props.timePinLockedAsyncStorageName || timePinLockedAsyncStorageNameDefault}
        timerComponent={this.props.timerComponentLockedPage || null}
        timeToLock={this.props.timeLocked || 300000}
        titleComponent={this.props.titleComponentLockedPage || undefined}/>
    );
  };

  render() {
    const { status, pinStatus, styleMainContainer } = this.props;
    return (
      <View style={styleMainContainer ? styleMainContainer : styles.container}>
        
      </View>
    );
  }
}

export function hasUserSetPinCode(serviceName?: string) {
  return hasPinCode(serviceName || pinCodeKeychainNameDefault);
}

export function deleteUserPinCode(serviceName?: string) {
  return deletePinCode(serviceName || pinCodeKeychainNameDefault);
}

export function resetPinCodeInternalStates(pinAttempsStorageName?: string,
                                           timePinLockedStorageName?: string) {
  return resetInternalStates([
    pinAttempsStorageName || pinAttemptsAsyncStorageNameDefault,
    timePinLockedStorageName || timePinLockedAsyncStorageNameDefault
  ]);
}

export default PINCode;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
