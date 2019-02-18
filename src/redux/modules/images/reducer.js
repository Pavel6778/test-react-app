import {combineReducers} from 'redux';

export const LOAD_IMAGES = 'LOAD_IMAGES';
export const CLEAR_IMAGES = 'CLEAR_IMAGES';
export const DELETE_IMAGE = 'DELETE_IMAGE';

export const loadImagesRequest = (params) => ({
    type: `${LOAD_IMAGES}_REQUEST`,
    payload: params
});

export const loadImagesSuccess = (images) => ({
    type: `${LOAD_IMAGES}_SUCCESS`,
    payload: images
});

export const loadImagesFailed = (error) => ({
    type: `${LOAD_IMAGES}_FAILED`,
    payload: error
});

export const clearImages = () => ({
    type: CLEAR_IMAGES,
});

export const deleteImage = (date) => ({
    type: DELETE_IMAGE,
    payload: date,
});




const error = (state = null, action) => {
    switch (action.type) {
        case `${LOAD_IMAGES}_REQUEST`: {
            return null;
        }

        case  `${LOAD_IMAGES}_FAILED`: {
            return action.payload;
        }

        default:
            return state;
    }
};

const entities = (state = [], action) => {
    switch (action.type) {
        case `${LOAD_IMAGES}_SUCCESS`: {
            return [...state, action.payload];
        }
        case CLEAR_IMAGES: {
            return  state = [];
        }

        case DELETE_IMAGE: {
            return  state.filter((elem) => {
                return (elem.date !== action.payload);
            });
        }
        default:
            return state;
    }
};

export default combineReducers({
    error,
    entities,
});
