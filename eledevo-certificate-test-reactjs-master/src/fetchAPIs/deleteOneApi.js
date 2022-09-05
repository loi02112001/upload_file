export default function delApi(data) {
       return new Promise((resolve, reject) => {
           const url = `http://localhost:3001/item?index=${data.payload.index}&id=${data.payload.id}`
           fetch(url, {
               method: 'DELETE',
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