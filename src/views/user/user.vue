<template>
<section>
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0">
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <el-select v-model="filters.status" placeholder="状态">
          <el-option v-for="(item, index) in statusOpts" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.q" placeholder="姓名/手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="getUsers">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
  </el-col>

  <!--列表-->
  <el-table :data="user_list" highlight-current-row :loading="listLoading">
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="chinese_name" label="姓名"></el-table-column>
    <el-table-column prop="mobile" label="手机号"></el-table-column>
    <el-table-column prop="created_at" label="注册时间" sortable></el-table-column>
    <el-table-column prop="status" label="状态" :formatter="formatState"></el-table-column>
    <el-table-column label="操作" width="160">
      <template slot-scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="text" @click="disableUser(scope.$index, scope.row)" v-show="scope.row.disable === 0 || scope.row.disable === 2 || scope.row.disable === 4">禁用</el-button>
        <el-button size="small" type="text" @click="disableUser(scope.$index, scope.row)" v-show="scope.row.disable === 1">取消禁用</el-button>
        <el-button size="small" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--工具条-->
  <el-col :span="24" class="toolbar">
    <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right"></el-pagination>
  </el-col>

  <!--编辑界面-->
  <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
    <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="editForm.mobile" ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="chinese_name">
        <el-input v-model="editForm.chinese_name" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click.native="editFormVisible = false">取消</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
    </div>
  </el-dialog>

  <!--新增界面-->
  <el-dialog title="编辑" :visible.sync="addFormVisible" :close-on-click-modal="false">
    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="addForm.mobile" ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="chinese_name">
        <el-input v-model="addForm.chinese_name" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="addFormVisible = false">取消</el-button>
      <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
    </div>
  </el-dialog>

</section>
</template>

<script>
import util from '~/util/util'
import { userModel } from '~/api'

let validateRules = {
  mobile: [{
    required: true,
    message: '请输入手机号',
    trigger: 'blur'
  }, {
    validator: util.validate.isMobile,
    trigger: 'blur'
  }],
}

export default {
  data() {
    return {
      filters: {
        q: '',
        status: '' // disable 0 正常 1 禁用   // user_type: 0 普通用户，1 vip用户
      },

      user_list: [{ chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09',
        status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09',
        status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09',
        status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09',
        status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09',
        status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09',
        status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09',
        status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, { chinese_name: '张莎', mobile: '13115019999', created_at: '2017-09-09', status: 0 }, ],

      statusOpts: [{
        value: '0',
        label: '正常'
      }, {
        value: '1',
        label: '禁用'
      }],

      total: 0,
      page: 1,
      pageSize: 10,

      listLoading: false,

      //编辑
      editFormVisible: false,
      editLoading: false,
      editFormRules: validateRules,
      editForm: {
        chinese_name: '',
        mobile: '',
      },

      //新增
      addFormVisible: false,
      addLoading: false,
      addFormRules: validateRules,
      addForm: {
        mobile: '',
        chinese_name: '',
        user_type: 0,
      },

    }
  },
  methods: {
    // 状态转换
    formatState(row, column) {
      return row.disable == 0 ? '正常' : '禁用'
    },

    // 翻页
    handleCurrentChange(val) {
      this.page = val
      this.getUsers()
    },

    // 禁用和取消禁用
    disableUser(index, row) {
      const action = row.disable === 0 ? '禁用' : '取消禁用'
      userModel.update({
        id: row.id,
        disable: row.disable === 0 ? 1 : 0
      }).then((res) => {
        if (res.data.code === 0) {
          row.disable = row.disable === 0 ? 1 : 0
          this.$message({
            message: action + '成功',
            type: 'success'
          })
        }
      })

    },

    //获取用户列表
    getUsers() {
      let para = {
        page: this.page,
        pagesize: this.pageSize,
        q: this.filters.q,
        disable: this.filters.status,
        user_type: 0
      }
      this.listLoading = true
      userModel.getList(para).then((res) => {
        let response = res.data
        this.total = response.pagination.records
        this.user_list = response.data
        this.listLoading = false
      })
    },
    //删除
    handleDel(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        userModel.delete(row.id).then((res) => {
          this.listLoading = false
          if (res.data.code === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getUsers()
          }
        })
      })
    },
    //显示编辑界面
    handleEdit(index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    //显示新增界面
    handleAdd() {
      this.addFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })

    },
    //编辑
    editSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            userModel.update(this.editForm).then((res) => {
              this.editLoading = false
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.$refs.editForm.resetFields()
              this.editFormVisible = false
              this.getUsers()
            })
          })
        }
      })
    },
    //新增
    addSubmit() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            userModel.add(this.addForm).then((res) => {
              this.addLoading = false
              if (res.data.code === 0) {
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                })
                this.$refs.addForm.resetFields()
                this.addFormVisible = false
                this.getUsers()
              }
            })

          })
        }
      })
    },

  },
  mounted() {
    //this.getUsers()
  }
}
</script>

<style scoped>

</style>
