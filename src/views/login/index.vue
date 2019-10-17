<template>
  <div class='login_container'>
    <Form ref='loginForm' :model='loginForm' :rules='loginRules' class="login-form">
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <FormItem prop='username'>
        <Input
          ref="username"
          prefix="ios-contact"
          type='text'
          v-model='loginForm.username'
          placeholder='Usernam'
          name="username"
          autocomplete="on"
          class="my-input"
        />
      </FormItem>
      <FormItem prop="password">
        <div class="pwd_container">
          <Poptip v-model="capsTooltip" :disabled="!capsTooltip" placement="right" trigger="focus">
            <Input
              ref="password"
              prefix="ios-lock"
              :type="passwordType"
              v-model='loginForm.password'
              placeholder='Password'
              name="password"
              @keyup.native="checkCapslock"
              @keyup.enter.native="handleLogin"
            />
            <div slot="content">Caps lock is On</div>
          </Poptip>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
        </div>
      </FormItem>
      <FormItem>
        <div class="btn_container">
          <Button type='primary' :loading="loading" @click.native.prevent="handleLogin">
            <span v-if="!loading">Login</span>
            <span v-else>Loading...</span>
          </Button>
        </div>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            message: 'Please fill in the username',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      redirect: undefined,
      loading: false,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler(route) {
        const { query } = route
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (key >= 'A' && key <= 'Z') {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
        return false
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>
<style lang='scss'>
  .pwd_container {
    .ivu-poptip, .ivu-poptip-rel {
      display: block;
    }
  }
  .btn_container {
    .ivu-btn {
      width: 100%;
    }
  }
</style>
<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login_container {
    height: 100%;
    text-align: center;
    background-color: $bg;
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }

</style>
