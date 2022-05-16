import { call, select, put, takeLatest, all } from "redux-saga/effects";
import { setCookies } from 'cookies-next';
import { getProviders, signIn, useSession } from "next-auth/react";
import api from "../../Environment";
var localStorage = require("localStorage");

import {
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
  userNameValidationSuccess,
  userNameValidationFailure,
  referralValidationSuccess,
  referralValidationFailure,
  getLoginDetails,
  loginSuccess,
  loginFailure,
  fetchUserLoginSuccess,
  registerSuccess,
  registerFailure,
} from "../slices/userSlice";
import { notify } from "reapop";

function* getUserDetailsAPI(action) {
  if (action.payload) {
    var accessToken = action.payload.accessToken;
    var userId = action.payload.userId;
  }else{
    var accessToken = null;
    var userId = null;
  }

  try {
    const response = yield api.postMethod({
      action: "profile",
      accessToken: accessToken,
      userId: userId,
    });

    if (response.data.success) {
      yield put(fetchUserDetailsSuccess(response.data.data));
      if (typeof window !== "undefined") {
        localStorage.setItem("user_picture", response.data.data.picture);
        localStorage.setItem(
          "user_unique_id",
          response.data.data.user_unique_id
        );
        localStorage.setItem("user_cover", response.data.data.cover);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem(
          "total_followers",
          response.data.data.total_followers
        );
        localStorage.setItem(
          "total_followings",
          response.data.data.total_followings
        );
        localStorage.setItem(
          "is_subscription_enabled",
          response.data.data.is_subscription_enabled
        );
        localStorage.setItem(
          "is_document_verified",
          response.data.data.is_document_verified
        );
        localStorage.setItem(
          "is_verified_badge",
          response.data.data.is_verified_badge
            ? response.data.data.is_verified_badge
            : 0
        );
        localStorage.setItem(
          "is_content_creator",
          response.data.data.is_content_creator
        );
        localStorage.setItem(
          "default_payment_method",
          response.data.data.default_payment_method
        );
        localStorage.setItem(
          "is_two_step_auth_enabled",
          response.data.data.is_two_step_auth_enabled
        );
      }
    } else {
      yield put(fetchUserDetailsFailure(response.data.error.error));
      // yield put(checkLogoutStatus(response.data));
      yield put(
        notify({ message: response.data.error.error, status: "error" })
      );
    }
  } catch (error) {
    yield put(fetchUserDetailsFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* updateUserDetailsAPI() {
  try {
    const userData = yield select((state) => state.users.profileInputData.data);
    const response = yield api.postMethod("update_profile", userData);
    if (response.data.success) {
      yield put(updateUserDetailsSuccess(response.data));
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("user_cover", response.data.data.cover);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem(
        "is_document_verified",
        response.data.data.is_document_verified
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      localStorage.setItem(
        "is_content_creator",
        response.data.data.is_content_creator
      );
      localStorage.setItem(
        "default_payment_method",
        response.data.data.default_payment_method
      );
      yield put(notify({ message: response.data.message, status: "success" }));
      window.location.assign("/profile");
    } else {
      yield put(
        notify({ message: response.data.error.error, status: "error" })
      );
      // yield put(updateUserDetailsFailure( response.data.error.error));
    }
  } catch (error) {
    // yield put(updateUserDetailsFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* userLoginAPI() {
  try {
    const userData = yield select((state) => state.user.loginInputData.data);
    const response = yield api.postMethod({action: "login",object: userData});
    yield put(loginSuccess(response.data));
    yield put(fetchUserLoginSuccess(response.data));
    if (response.data.success) {
      if (response.data.code == 1001)
        window.location.assign("/register/verify");
      else {
        if (response.data.code == 240) {
         
          yield put(notify({message: response.data.message, status:"success"}));
          window.location.assign("/verification");
          localStorage.setItem("emailId", response.data.data.email);
        } else {
          
          localStorage.setItem("userLoginStatus", true);
          localStorage.setItem("user_picture", response.data.data.picture);
          localStorage.setItem("user_cover", response.data.data.cover);
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("username", response.data.data.username);
          localStorage.setItem("socket", true);
          localStorage.setItem(
            "user_unique_id",
            response.data.data.user_unique_id
          );
          localStorage.setItem(
            "is_document_verified",
            response.data.data.is_document_verified
          );
          localStorage.setItem(
            "is_verified_badge",
            response.data.data.is_verified_badge
              ? response.data.data.is_verified_badge
              : 0
          );
          localStorage.setItem(
            "is_content_creator",
            response.data.data.is_content_creator
          );
          localStorage.setItem(
            "default_payment_method",
            response.data.data.default_payment_method
          );
          localStorage.setItem(
            "is_two_step_auth_enabled",
            response.data.data.is_two_step_auth_enabled
          );
          localStorage.setItem("emailId", response.data.data.email);
          yield put(notify({ message: response.data.message , status: "success"}));
          localStorage.setItem("userId", response.data.data.user_id);
          localStorage.setItem("accessToken", response.data.data.token);
          setCookies('userId', response.data.data.user_id);
          setCookies('accessToken',  response.data.data.token);
          setCookies('user_picture', response.data.data.picture);
          
          window.location.assign("/");
         
        }
      }
    } else {
      yield put(
        notify({ message: response.data.error, status: "error" })
      );
    }
  } catch (error) {
    yield put(loginFailure(error.message));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* userRegisterAPI() {
  try {
    const userData = yield select(
      (state) => state.user.registerInputData.data
    );
    const response = yield api.postMethod({action : "register", object :  userData});
    yield put(registerSuccess(response.data));

    if (response.data.success) {
      if (response.data.code == 1001)
        window.location.assign("/register/verify");
      else {
        localStorage.setItem("userId", response.data.data.user_id);
        localStorage.setItem("accessToken", response.data.data.token);
        localStorage.setItem("userLoginStatus", true);
        localStorage.setItem("user_picture", response.data.data.picture);
        localStorage.setItem("user_cover", response.data.data.cover);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("socket", true);
        localStorage.setItem(
          "user_unique_id",
          response.data.data.user_unique_id
        );
        localStorage.setItem(
          "is_document_verified",
          response.data.data.is_document_verified
        );
        localStorage.setItem(
          "is_verified_badge",
          response.data.data.is_verified_badge
            ? response.data.data.is_verified_badge
            : 0
        );
        localStorage.setItem(
          "is_two_step_auth_enabled",
          response.data.data.is_two_step_auth_enabled
        );
        yield put(notify({ message: response.data.message }));
        if (response.data.data.is_welcome_steps == 1) {
          window.location.assign("/upload-profile-picture");
        } else {
          signIn("credentials", {
            callbackUrl: "/",
            // redirect: false,
            email: userData.email,
            password: userData.password,
          })
        }
      }
    } else {
      yield put(
        notify({ message: response.data.error, status: "error" })
      );
    }
  } catch (error) {
    yield put(registerFailure(error));
    yield put(notify({ message: error.message, status: "error" }));
  }
}

function* forgotPasswordAPI() {
  try {
    const userData = yield select(
      (state) => state.users.forgotPasswordInputData.data
    );

    if (
      !userData.email ||
      userData.email == undefined ||
      userData.email == null
    ) {
      const notificationMessage = getErrorNotificationMessage(
        "Please enter the email address"
      );
      yield put(notify(notificationMessage));
      yield put(forgotPasswordFailure());
    } else {
      const response = yield api.postMethod("forgot_password", userData);
      yield put(forgotPasswordSuccess(response.data));
      if (response.data.success) {
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        yield put(notify(notificationMessage));
        window.location.assign("/");
      } else {
        const notificationMessage = getErrorNotificationMessage(
          response.data.error.error
        );
        yield put(notify(notificationMessage));
      }
    }
  } catch (error) {
    yield put(forgotPasswordFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error.error
    );
    yield put(notify(notificationMessage));
  }
}

function* deleteAccountAPI() {
  try {
    const userData = yield select(
      (state) => state.users.deleteAccount.inputData
    );
    const response = yield api.postMethod("delete_account", userData);
    yield put(deleteAccountSuccess(response.data));
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(notify(notificationMessage));
      window.location.assign("/");
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
    }
  } catch (error) {
    yield put(deleteAccountFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error.error
    );
    yield put(notify(notificationMessage));
  }
}

function* registerVerify() {
  try {
    const inputData = yield select(
      (state) => state.users.registerVerify.inputData
    );

    const response = yield api.postMethod("verify_email", inputData);

    if (response.data.success) {
      yield put(registerVerifySuccess(response.data));
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("accessToken", response.data.data.token);
      localStorage.setItem("userLoginStatus", true);
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("username", response.data.data.first_name);
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      localStorage.setItem("socket", true);
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(notify(notificationMessage));
      window.location.assign("/welcome");
    } else {
      yield put(registerVerifyFailure(response.data.error.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
    }
  } catch (error) {
    yield put(registerVerifyFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(notify(notificationMessage));
  }
}

function* registerVerifyResend() {
  try {
    const response = yield api.postMethod("regenerate_email_verification_code");

    if (response.data.success) {
      yield put(registerVerifyResendSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(notify(notificationMessage));
    } else {
      yield put(registerVerifyResendFailure(response.data.error.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
    }
  } catch (error) {
    yield put(registerVerifyResendFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error.error
    );
    yield put(notify(notificationMessage));
  }
}

function* notificationStatusUpdateAPI() {
  try {
    const userData = yield select(
      (state) => state.users.notificationUpdate.inputData
    );
    const response = yield api.postMethod(
      "notifications_status_update",
      userData
    );
    if (response.data.success) {
      yield put(notificationStatusUpdateSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(notify(notificationMessage));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
      yield put(notificationStatusUpdateFailure(response.data.error.error));
    }
  } catch (error) {
    yield put(notificationStatusUpdateFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error.error
    );
    yield put(notify(notificationMessage));
  }
}

function* verificationBadgeStatusUpdateAPI() {
  try {
    const userData = yield select(
      (state) => state.users.verifyBadgeUpdate.inputData
    );
    const response = yield api.postMethod("verified_badge_status", userData);
    if (response.data.success) {
      yield put(notificationStatusUpdateSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      yield put(notify(notificationMessage));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
      yield put(notificationStatusUpdateFailure(response.data.error.error));
    }
  } catch (error) {
    yield put(notificationStatusUpdateFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error.error
    );
    yield put(notify(notificationMessage));
  }
}

function* getPaymentsAPI() {
  try {
    const response = yield api.postMethod("payments_index");

    if (response.data.success) {
      yield put(fetchPaymentsSuccess(response.data));
    } else {
      yield put(fetchPaymentsFailure(response.data.error.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPaymentsFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error.error
    );
    yield put(notify(notificationMessage));
  }
}

function* fetchBlockUsersAPI() {
  try {
    const response = yield api.postMethod("block_users");
    if (response.data.success) {
      yield put(fetchBlockUsersSuccess(response.data.data));
    } else {
      yield put(fetchBlockUsersFailure(response.data.error.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
    }
  } catch (error) {
    yield put(fetchBlockUsersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(notify(notificationMessage));
  }
}

function* saveBlockUserAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.saveBlockUser.inputData
    );
    const response = yield api.postMethod("block_users_save", inputData);
    if (response.data.success) {
      yield put(saveBlockUserSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(notify(notificationMessage));

      localStorage.setItem(
        "total_followers",
        response.data.data.total_followers
      );
      localStorage.setItem(
        "total_followings",
        response.data.data.total_followings
      );

      if (inputData.is_other_profile == 1) {
        window.location.reload();
      }
    } else {
      yield put(saveBlockUserFailure(response.data.error.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
    }
  } catch (error) {
    yield put(saveBlockUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(notify(notificationMessage));
  }
}

function* resetPasswordAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.resetPasswordInputData.inputData
    );
    const response = yield api.postMethod("reset_password", inputData);
    yield put(resetPasswordSuccess(response.data));
    if (response.data.success) {
      localStorage.setItem("userLoginStatus", true);
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("user_cover", response.data.data.cover);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("socket", true);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem(
        "is_document_verified",
        response.data.data.is_document_verified
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("accessToken", response.data.data.token);
      yield put(notify(notificationMessage));
      window.location.assign("/home");
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
    }
  } catch (error) {
    yield put(resetPasswordFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(notify(notificationMessage));
  }
}

function* usernameValidationAPI() {
  try {
    const inputData = yield select(
      (state) => state.user.validationInputData.data
    );
    const response = yield api.postMethod({action: "username_validation",object : inputData});
    yield put(userNameValidationSuccess(response.data));
    if (response.data.success) {
    } else {
      yield put(userNameValidationFailure(response.data.error));

      yield put(notify({ message: response.data.error , status : "error" }));
    }
  } catch (error) {
    yield put(userNameValidationFailure(error));
    yield put(notify({ message: error.message , status : "error"}));
  }
}

function* referralValidationAPI() {
  try {
    const inputData = yield select(
      (state) => state.user.referralInputData.data
    );
    const response = yield api.postMethod({action : "referral_code_validate",object :  inputData});
    yield put(referralValidationSuccess(response.data));
    if (response.data.success) {
      yield put(notify({message : response.data.message, status: "success"}));
    } else {
      yield put(referralValidationFailure(response));
      yield put(notify({message : response.data.error, status: "error"}));
    }
  } catch (error) {
    yield put(referralValidationFailure(error.message));
   
    yield put(notify({message : error.message, status: "error"}));
  }
}

function* getContentCreatorDashboardAPI() {
  try {
    const response = yield api.postMethod("content_creators_dashboard");

    if (response.data.success) {
      yield put(fetchContentCreatorDashboardSuccess(response.data));
    } else {
      yield put(fetchContentCreatorDashboardFailure(response.data.error.error));
      yield put(checkLogoutStatus(response.data));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
    }
  } catch (error) {
    yield put(fetchContentCreatorDashboardFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error.error
    );
    yield put(notify(notificationMessage));
  }
}

function* updateUserSubscriptionDetailsAPI() {
  try {
    const userData = yield select(
      (state) => state.users.profileSubscriptionInputData.data
    );
    const response = yield api.postMethod("update_profile", userData);
    if (response.data.success) {
      yield put(updateUserDetailsSuccess(response.data));
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("user_cover", response.data.data.cover);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem(
        "is_document_verified",
        response.data.data.is_document_verified
      );
      localStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      localStorage.setItem(
        "is_content_creator",
        response.data.data.is_content_creator
      );
      localStorage.setItem(
        "default_payment_method",
        response.data.data.default_payment_method
      );
      const notificationMessage = getSuccessNotificationMessage(
        "User Subscription Details Updated"
      );
      yield put(notify(notificationMessage));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
      yield put(updateUserDetailsFailure(response.data.error.error));
    }
  } catch (error) {
    yield put(updateUserDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error.error
    );
    yield put(notify(notificationMessage));
  }
}

function* twoStepAuthenticationUpdateAPI(action) {
  try {
    const response = yield api.postMethod("two_step_auth_update", action.data);

    if (response.data.success) {
      yield put(twoStepAuthUpdateSuccess(response.data));
      localStorage.setItem(
        "is_two_step_auth_enabled",
        response.data.data.is_two_step_auth_enabled
      );
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(notify(notificationMessage));
    } else {
      yield put(twoStepAuthUpdateFAilure(response.data.error.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
    }
  } catch (error) {
    yield put(twoStepAuthUpdateFAilure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error.error
    );
    yield put(notify(notificationMessage));
  }
}

function* twoStepAuthenticationLoginAPI(action) {
  try {
    const response = yield api.postMethod("two_step_auth_login", action.data);
    yield put(twoStepAuthenticationLoginSuccess(response.data));
    if (response.data.success) {
      if (response.data.code == 1001)
        window.location.assign("/register/verify");
      else {
        localStorage.setItem("userLoginStatus", true);
        localStorage.setItem("user_picture", response.data.data.picture);
        localStorage.setItem("user_cover", response.data.data.cover);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("socket", true);
        localStorage.setItem(
          "user_unique_id",
          response.data.data.user_unique_id
        );
        localStorage.setItem(
          "is_document_verified",
          response.data.data.is_document_verified
        );
        localStorage.setItem(
          "is_verified_badge",
          response.data.data.is_verified_badge
            ? response.data.data.is_verified_badge
            : 0
        );
        localStorage.setItem(
          "is_content_creator",
          response.data.data.is_content_creator
        );
        localStorage.setItem(
          "default_payment_method",
          response.data.data.default_payment_method
        );
        localStorage.setItem(
          "is_two_step_auth_enabled",
          response.data.data.is_two_step_auth_enabled
        );
        const notificationMessage = getSuccessNotificationMessage(
          response.data.message
        );
        localStorage.setItem("emailId", response.data.data.email);
        yield put(notify(notificationMessage));
        window.location.assign("/home");
        localStorage.setItem("userId", response.data.data.user_id);
        localStorage.setItem("accessToken", response.data.data.token);
      }
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
      yield put(twoStepAuthenticationLoginFailure(response.data.error.error));
    }
  } catch (error) {
    yield put(twoStepAuthenticationLoginFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(notify(notificationMessage));
  }
}

function* twoStepAuthenticationCodeResendAPI(action) {
  try {
    const response = yield api.postMethod(
      "two_step_auth_resend_code",
      action.data
    );

    if (response.data.success) {
      yield put(twoStepAuthenticationCodeResendSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(notify(notificationMessage));
    } else {
      yield put(
        twoStepAuthenticationCodeResendFailure(response.data.error.error)
      );
      const notificationMessage = getErrorNotificationMessage(
        response.data.error.error
      );
      yield put(notify(notificationMessage));
    }
  } catch (error) {
    yield put(twoStepAuthenticationCodeResendFailure(error));
    const notificationMessage = getErrorNotificationMessage(
      error.response.data.error.error
    );
    yield put(notify(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest("user/fetchUserDetailsStart", getUserDetailsAPI),
    //   yield takeLatest(UPDATE_USER_DETAILS_START, updateUserDetailsAPI),
    //   yield takeLatest(UPDATE_USER_SUBSCRIPTION_DETAILS_START, updateUserSubscriptionDetailsAPI),
      yield takeLatest("user/loginStart", userLoginAPI),
      yield takeLatest("user/registerStart", userRegisterAPI),
    //   yield takeLatest(FORGOT_PASSWORD_START, forgotPasswordAPI),
    //   yield takeLatest(DELETE_ACCOUNT_START, deleteAccountAPI),
    //   yield takeLatest(REGISTER_VERIFY_START, registerVerify),
    //   yield takeLatest(REGISTER_VERIFY_RESEND_START, registerVerifyResend),
    //   yield takeLatest(
    //     NOTIFICATION_STATUS_UPDATE_START,
    //     notificationStatusUpdateAPI
    //   ),
    //   yield takeLatest(FETCH_PAYMENTS_START, getPaymentsAPI),
    //   yield takeLatest(FETCH_BLOCK_USERS_START, fetchBlockUsersAPI),
    //   yield takeLatest(SAVE_BLOCK_USER_START, saveBlockUserAPI),
    //   yield takeLatest(
    //     USER_VERIFY_BADGE_STATUS_START,
    //     verificationBadgeStatusUpdateAPI
    //   ),
    //   yield takeLatest(RESET_PASSWORD_START, resetPasswordAPI),
      yield takeLatest('user/userNameValidationStart', usernameValidationAPI),
      yield takeLatest('user/referralValidationStart', referralValidationAPI),
    //   yield takeLatest(FETCH_CONTENT_CREATOR_DASHBOARD_START, getContentCreatorDashboardAPI),
    //   yield takeLatest(TWO_STEP_AUTH_UPDATE_START, twoStepAuthenticationUpdateAPI),
    //   yield takeLatest(TWO_STEP_AUTHENTICATION_LOGIN_START, twoStepAuthenticationLoginAPI),
    //   yield takeLatest(TWO_STEP_AUTHENTICATION_CODE_RESEND_START, twoStepAuthenticationCodeResendAPI)
  ]);
}
