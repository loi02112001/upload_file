
import React from "react";
import * as actions from '../actions/index'
import { connect } from "react-redux";
import Index from "../components";

class UploadFileContainer extends React.Component {
    componentDidMount() {
        this.props.getItem()
    }
    render() {
        return (

            <Index {...this.props} />

        )
    }
}
const mapStateToProps = (state) => {
   
    return {
        isLoading: state.item.isFetching,
        itemFile: state.item.listData,
        itemSearch: state.item.listSearch,
        itemSearch2: state.item.listItemSearch
    }
}
const mapDisPatchToProps = (dispatch) => {
    return {
        getItem: (data) => {
            dispatch(actions.getItem(data))
        },
        addItem: (data) => {
            dispatch(actions.addItem(data))
        },
        deleteItem: (data) => {
            dispatch(actions.delItem(data))
        },
        updateItem: (data) => {
            dispatch(actions.updateItem(data))
        },
        deleteOne: (data) => {
            dispatch(actions.deleteOne(data))
        },
        searchItem: (data) => {
            dispatch(actions.searchItem(data))
        }
        , dropDownSearch: (data) => {
            dispatch(actions.dropDownSearch(data))
        },
        searchItem2:(data)=>{
            dispatch(actions.searchItem2(data))
        }
    }
}
export default connect(mapStateToProps, mapDisPatchToProps)(UploadFileContainer)