import { put, takeEvery } from "redux-saga/effects";
import * as types from '../constants'
import addApi from '../fetchAPIs/addFetch';
import getApi from "../fetchAPIs/getAPI";
import * as actions from '../actions/index'
import delApi from '../fetchAPIs/deleteApi'
import updateApi from "../fetchAPIs/updateFetch";
import delOneApi from "../fetchAPIs/deleteOneApi";
import searchApi from "../fetchAPIs/searchAPI";
import itemSearch from "../fetchAPIs/itemSearch";

function* getItem() {
    try {
        const res = yield getApi()
        yield put(actions.getItemSuccess({ res: res.data }))
    } catch (error) {
        yield put(actions.getItemFailure())
    }
}
function* addItem(data) {
    try {
        let form = new FormData()
        form.append('name', data.payload.name)
        for (let i = 0; i < data.payload.img.length; i++) {
            form.append('img', data.payload.img[i])
        }
         yield addApi(form)
        yield put(actions.addItemSuccess({}))
        yield put(actions.getItem())
    } catch (error) {
        yield put(actions.addItemFailure())
    }
}
function* deleteItem(data) {
    try {
        yield delApi(data)
        yield put(actions.delItemSuccess())
        yield put(actions.getItem())
    } catch (error) {
        yield put(actions.delItemFailure())
    }
}
function* updateItem(data) {
    try {

        let form = new FormData()
        for (let i = 0; i < data.payload.img.length; i++) {
            form.append('img', data.payload.img[i])
        }
        form.append('name', data.payload.name)
        yield updateApi(data, form)
        yield put(actions.updateItemSuccess())
        yield put(actions.getItem())
    } catch (error) {
        yield put(actions.updateItemFailure())
    }
}
function* deleteOne(data) {
    try {
        yield delOneApi(data)
        yield put(actions.deleteOneSuccess())
        yield put(actions.getItem())
    } catch (error) {
        yield put(actions.delItemFailure())
    }
}

function* searchItem(data) {
    try {
        const res = yield searchApi(data)
        yield put(actions.searchItemSuccess({
            res: res.search
        }))
    } catch (error) {
        yield put(actions.searchItemFailure())
    }
}

function* dropDownSearch(data) {
    try {
        const res = yield searchApi(data)
        yield put(actions.dropDownSearchSuccess({
            res: res.search
        }))
    } catch (error) {
        yield put(actions.dropDownSearchFailure())
    }
}

function* searchItem2(data){
    try {
        const res = yield itemSearch(data)
        yield put(actions.searchItem2Success({
            res: [res.search2]
        }))
    } catch (error) {
        yield put(actions.searchItem2Failure())
    }
}
export const ItemSaga = [takeEvery(types.ADD_ITEM_REQUEST, addItem),
takeEvery(types.GET_ITEM_REQUEST, getItem),
takeEvery(types.DELETE_ITEM_REQUEST, deleteItem),
takeEvery(types.UPDATE_ITEM_REQUEST, updateItem),
takeEvery(types.DELETE_ONE_REQUEST, deleteOne),
takeEvery(types.SEARCH_ITEM_REQUEST, searchItem),
takeEvery(types.DROPDOWN_SEARCH_REQUEST, dropDownSearch),
takeEvery(types.SEARCH_ITEM2_REQUEST,searchItem2)]