<template>
  <div class='login-container'>
    <Form ref='loginForm' :model='loginForm' :rules='loginRules' class="login-form">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <FormItem prop='username'>
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <Input
          ref="username"
          type='text'
          v-model='loginForm.username'
          placeholder='Usernam'
          name="username"
          autocomplete="on"
          class="my-input"
        />
      </FormItem>
      <Tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" class="tool-tip">
        <FormItem prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
          <Input
            :key="passwordType"
            ref="password"
            :type="passwordType"
            v-model='loginForm.password'
            placeholder='Password'
            name="password"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
        </FormItem>
      </Tooltip>
      <FormItem>
        <Button type='primary' :loading="loading" @click.native.prevent="handleLogin">
          <span v-if="!loading">Login</span>
          <span v-else>Loading...</span>
        </Button>
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
        password: '',
      },
      loginRules: {
        username: [
          {
            required: true,
            message: 'Please fill in the username',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password',
            trigger: 'blur',
          },
          {
            type: 'string',
            min: 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur',
          },
        ],
      },
      passwordType: 'password',
      capsTooltip: false,
      redirect: undefined,
      loading: false,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler(route) {
        const { query } = route;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus();
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if ((shiftKey && (key >= 'a' && key <= 'z')) || (!shiftKey && (key >= 'A' && key <= 'Z'))) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/', query: this.otherQuery,
              });
              this.loading = false;
            });
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
        return false;
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
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
  },
};
</script>
<style>
  .ivu-input {
    padding-left: 30px !important;
  }
</style>
<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    position: absolute;
    top: 1px;
    z-index: 2;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
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

  .tool-tip {
    width: 450px;
  }

</style>
