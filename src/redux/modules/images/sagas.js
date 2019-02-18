import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as types from './reducer';
import * as actions from './reducer';
import  NASAService  from '../../../services/NASAService';

function* loadImages({ payload }) {
    try {
        const images = yield call(
            [NASAService, NASAService.loadImage],
            payload,
        );

        yield put(actions.loadImagesSuccess(images));
    } catch (error) {
        yield put(actions.loadImagesFailed(error));
    }
}

const userRootSaga = all([
    takeEvery(`${types.LOAD_IMAGES}_REQUEST`, loadImages),
]);

export default userRootSaga;
