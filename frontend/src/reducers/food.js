import {
    AllPostedFood
} from "../actions/types";

const initialState = {
    all_posted_food: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AllPostedFood:
            return {
                ...state,
                all_posted_food: action.payload,
            };
                default:
            return state;
    }
}
