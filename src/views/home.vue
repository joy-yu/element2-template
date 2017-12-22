<template>
  <el-container class="container">

    <!--左侧导航菜单-->
    <el-menu :default-active="$route.path" router :collapse="collapsed" class="menu-box" :class="collapsed?`menu-collapse`:`menu-expand`">

      <!--头部 logo和名称-->
      <h2 class="logo-area" >
        {{collapsed?'':sysName}}
      </h2>

      <template v-for="(item,index) in asideRouter">

        <!--多个子菜单-->
        <el-submenu v-if="item.children.length>1" :index="index+''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" v-if="!child.ignore" :key="child.path" >
            <span slot="title">{{child.name}}</span>
          </el-menu-item>
        </el-submenu>

        <!--单个菜单-->
        <el-menu-item v-if="item.children.length===1" :index="item.children[0].path">
          <i :class="item.icon"></i>
          <span slot="title">{{item.children[0].name}}</span>
        </el-menu-item>

      </template>
    </el-menu>


    <!--右侧-->
    <el-container>

      <!--右侧头部-->
      <el-header class="header">

        <!--头部 展开折叠图标-->
        <el-col :span="1">
          <div class="collapse-tool" @click="collapsed = !collapsed">
            <i :class="collapsed?`el-icon-arrow-right`:`el-icon-arrow-left`"></i>
          </div>
        </el-col>

        <!--头部 个人信息-->
        <el-col :span="16" class="userinfo">
          <el-dropdown>
            <div class="userinfo-inner">
              {{userName}}
              <img :src="this.userAvatar" class="userinfo-avatar"/>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-header>

      <!--右侧主体-->
      <el-main>
        <!--主体头部-->
        <el-col style="line-height:1;">
          <strong style="float:left;">{{$route.name}}</strong>
          <el-breadcrumb separator="/" style="float:right;">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

        <!--主体内容-->
        <el-col>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </el-main>

    </el-container>

  </el-container>
</template>

<script>
import { auth } from '~/api'
import avatar from '~/assets/avatar.png'

export default {
  data() {
    return {
      collapsed: false,
      sysName: 'element管理系统',
      userName: '',
      userAvatar: '',
    }
  },
  methods: {
    //退出登录
    logout() {
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning'
      }).then(() => {
        auth.requestLogout()
        sessionStorage.removeItem('user')
        this.$router.push('/login')
      })
    },
  },
  mounted() {

    var user = sessionStorage.getItem('user')
    if (user === null) {
      this.$router.replace({ name: 'login', query: { redirect: this.$router.currentRoute.fullPath } })
      return
    }
    user = JSON.parse(user)
    this.userName = user.chinese_name || '我是谁'
    this.userAvatar = user.avatar || avatar
  },

  computed: {
    asideRouter() {
      return this.$router.options.routes.filter(v => v.aside)
    }
  }
}
</script>

<style scoped lang="less">
  @import '../style/vars.less';

  .container {


    .menu-box {
      will-change: width;
      transition: width 0.2s;

      .logo-area {
        font-size: 21px;
        background: @color-primary;
        color: #fff;
        text-align: center;
        overflow: hidden;
        height: 60px;
  			line-height: 60px;
      }
    }
    .menu-expand {
      width: 200px;
    }
    .menu-collapse {
      width: 64px;
    }

    .header {
      height: 60px;
      line-height: 60px;
      background: @color-primary;
      padding-left: 0;
      color: #fff;

      .collapse-tool{
        padding: 0px 23px;
        width:14px;
        cursor: pointer;
      }

      .userinfo {
        text-align: right;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          .userinfo-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
            display: inline-block;
            margin-left: 10px;
          }
        }
      }
    }


  }
</style>
