import { call, select, put, takeLatest, all } from "redux-saga/effects";

import { fetchConfigurationSuccess, fetchConfigurationFailure } from "../slices/configurationSlice";
import {apiConstants} from '../../components/Constant/constants';
import axios from 'axios';

function* fetchConfigAPI() {
    try {
      const response = yield axios.get(apiConstants.settingsUrl);
      if (response.data) {
        yield put(fetchConfigurationSuccess(response.data.data));
      } else {
        yield put(fetchConfigurationFailure(response));
      }
    } catch (error) {
      yield put(fetchConfigurationFailure(error.message));
     }
  }

  export default function* pageSaga() {

    yield all([yield takeLatest("config/fetchConfigurationStart", fetchConfigAPI)]);
  
  }