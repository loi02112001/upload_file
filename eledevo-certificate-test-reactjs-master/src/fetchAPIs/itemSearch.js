export default function itemSearch(data) {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3001/item/search/${data.payload.id}`
        fetch(url, {
            method: 'GET'
        })
            .then((respone) => respone.json())
            .then((res) => {
                resolve(res)
                
            })
            .catch((err) => {
                reject(err)
            })
    })
}