export default function searchApi(data) {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3001/item/search?nameSearch=${data.payload.nameSearch}`
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