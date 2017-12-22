import axios from '~/util/request'

const common = {
  areaList: params => axios.get(`/api/v1/citys`, {params:params})
}

export default common
