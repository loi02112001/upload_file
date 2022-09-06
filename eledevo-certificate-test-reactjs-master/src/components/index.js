import React from "react";
export default class Index extends React.Component {
    state = {
        name: '',
        fileImg: [],
        linkImg: [],
        id: '',
        nameUpdate: '',
        nameSearch: '',
        checkSearch:''
    }
    handleReview(file) {
        this.setState({ fileImg: file })
        let arrImg = []
        for (let i = 0; i < file.length; i++) {
            arrImg.push(URL.createObjectURL(file[i]))
        }
        this.setState({ linkImg: arrImg })
    }
    render() {

        let listData = []
        let searchDropDown = []
        let arr = []

        if (this.props.itemSearch) {
            searchDropDown = this.props.itemSearch.map((item, key) => {
                return (
                    <tr key={item._id} onClick={() => { this.props.searchItem2({ id: item._id })
                    this.setState({checkSearch:true}) }}>
                        <td style={{ width: '350px' }}>{item.name}</td>
                        <td>{item.img.map((value, key) => {
                            return (
                                <div key={key} >
                                    <img alt="error" src={value} width={50} height={50}></img>
                                </div>
                            )
                        })}
                        </td>
                    </tr>
                )
            })
        }

        if (this.props.itemFile) {
            listData = this.props.itemFile.map((item, key) => {
                return (
                    <tr key={item._id} >
                        <th>{key + 1}</th>
                        <th>{item.name}</th>
                        <th>{item.img.map((value, key) => {
                            return (
                                <div key={key}>
                                    <img alt="error images" src={value} width={90} height={90}></img>
                                    <button onClick={() => item.img.length > 1 ?
                                        this.props.deleteOne({ index: key, id: item._id }) :
                                        this.props.deleteItem({ id: item._id })
                                    }>x</button>
                                </div>
                            )
                        })}</th>
                        <th><button onClick={() => this.props.deleteItem({ id: item._id })}>DELETE</button></th>
                        <th><button onClick={() => { this.setState({ id: item._id, linkImg: item.img, nameUpdate: item.name }) }}>Choose</button></th>
                    </tr>
                )
            })

        }
        if (this.props.itemSearch2) {
            arr = this.props.itemSearch2.map((item, key) => {
                return (
                    <tr key={key}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.img.map((value, key) => {
                            return (
                                <div key={key}>
                                    <img alt="error" src={value} width={90} heigth={90}></img>
                                </div>
                            )
                        })}</td>
                    </tr>
                )
            })
        }

        return (
            <div>
                <div>{this.state.linkImg.map((link, index) => {
                    return (
                        <div key={index}>
                            <span>
                                <img src={link} alt='error images' width={90} heigth={90}></img>
                            </span>
                        </div>
                    )
                })}</div>
                <input multiple type='file' onChange={(e) => { this.handleReview(e.target.files) }}></input>
                <br></br>
                <input type='text' onChange={(e) => this.setState({ name: e.target.value })}></input>
                <button

                    onClick={() => {
                        this.state.name === '' || this.state.fileImg.length === 0 ?
                            alert('Yeu cau nhap du lieu va ten') :
                            this.props.addItem({
                                name: this.state.name,
                                img: this.state.fileImg
                            })
                    }}>submit</button>


                <br></br>
                <input value={this.state.nameUpdate} onChange={(e) => { this.setState({ nameUpdate: e.target.value }) }}></input>
                <button onClick={() => {
                    this.state.nameUpdate === '' ?
                        alert('Yeu cau nhap ten')
                        : this.props.updateItem({
                            id: this.state.id,
                            img: this.state.fileImg,
                            name: this.state.nameUpdate
                        })
                }}>Update</button>
                <br></br>

                <input style={{ position: 'relative', width: '400px' }} type='text' onChange={(e) => {
                    this.setState({ nameSearch: e.target.value })
                    this.props.dropDownSearch({ nameSearch: e.target.value })
                }}></input>

                <div style={{ visibility: this.state.nameSearch ? 'visible' : 'hidden', position: 'absolute', backgroundColor: 'blue', width: '400px' }}>
                    <table >
                        <tbody>
                            {searchDropDown}
                        </tbody>
                    </table>
                </div>
                <button onClick={() => { this.props.searchItem({ nameSearch: this.state.nameSearch }) }}>Search</button>
                <table>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Ten</th>
                            <th>Anh</th>
                        </tr>
                        {this.state.checkSearch === true ? arr : listData}
                        <button onClick={()=>{this.setState({checkSearch:''})}} style={{visibility:this.state.checkSearch === true ? 'visible':'hidden'}}>Back</button>
                    </tbody>
                </table>
            </div>
        )
    }
}
