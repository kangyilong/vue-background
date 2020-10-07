<template>
  <div class="login">
    <div class="form_box">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.loginName" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            v-model="formInline.loginPwd"
            placeholder="Password"
            @keyup.enter.native="handleSubmit('formInline')"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { toLogin } from 'common/api/user'
import { saveUser } from 'common/js/util'

export default {
  data () {
    return {
      formInline: {
        loginName: '',
        loginPwd: ''
      },
      ruleInline: {
        loginName: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        loginPwd: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          toLogin(this.formInline).then(data => {
            saveUser(data)
            this.$router.replace('/')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    .form_box {
      width: 400px;
      margin-top: 160px;
    }
  }
</style>
