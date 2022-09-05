export default function getApi() {
 
 
     return new Promise((resolve, reject) => {
         const url = `http://localhost:3001/item`
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

