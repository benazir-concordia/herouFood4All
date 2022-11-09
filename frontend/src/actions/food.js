import axios from "axios";
import {AllPostedFood} from "./types";
import { createMessage } from "./alerts";
import { tokenConfig, tokenConfigUpload } from "./auth";

export const get_posted_food = (type) => (dispatch, getState) => {
    axios
        .get(`/api/get_posted_food/?type=${type}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: AllPostedFood,
                payload: res.data,
            });
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
};
export const add_food = (body) => (dispatch, getState) => {
    axios
        .post(`/api/food/`, body, tokenConfigUpload(getState))
        .then((res) => {
            dispatch(createMessage("Post Created Successfully", "success"));
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
};
export const edit_food = (body, id) => (dispatch, getState) => {
    axios
        .put(`/api/food/${id}`, body, tokenConfig(getState))
        .then((res) => {
            dispatch(get_posted_food(null));
            dispatch(
                createMessage("Food Details Updated Successfully", "success")
            );
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}
export const delete_food = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/food/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch(get_posted_food(null));
            dispatch(
                createMessage("Food Deleted Successfully", "success")
            );
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}
