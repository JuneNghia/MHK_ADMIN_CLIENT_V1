import axios from "axios"

export const data = []

export const getListUser = () => {
    axios.get('http://localhost:5000/mhk-api/v1/user/get-all-db')
    .then((res) => {
        data = res.data;
        return data;
    })
    .catch((err) => {
      console.log(err)
    })
}