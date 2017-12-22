import axios from '~/util/request'

let base = '/api/v1'

const auth = {
  requestLogin  :params  => axios.post(`${base}/login`, params),
  requestLogout : params => axios.get(`${base}/logout`, {params: params}),
  register      : params => axios.post(`${base}/register`, params),
}
export default auth
