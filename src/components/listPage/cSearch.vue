<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="display: flex;">
    <FormItem prop="user" label="用户名" style="display: flex;">
      <Input type="text" v-model="formInline.user" placeholder="Username" />
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password" />
    </FormItem>
    <FormItem>
      <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
