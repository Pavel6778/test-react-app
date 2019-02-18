import { all } from 'redux-saga/effects';
import images from './modules/images/sagas';

export default function* rootSaga() {
  yield all([
      images,
  ]);
}
