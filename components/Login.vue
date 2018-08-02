<template lang="pug">
  u-center(:powerBy="powerBy")
    form.card(@submit.prevent="onSubmit")
      h3.card-header.text-uppercase {{ title }}
      .card-body
        .form-group
          i.fa.fa-user
          input.form-control(
            :class="{ 'is-invalid': !!errors.username }",
            type="text",
            name="username",
            v-model="form.username",
            placeholder="帳號",
            aria-describedby="username",
            :disabled="loading",
            required,
            v-focus
          )
          .invalid-feedback(v-if="errors.username") {{ errors.username }}
        .form-group
          i.fa.fa-lock
          input.form-control(
            :class="{ 'is-invalid': !!errors.password }",
            type="password",
            name="password",
            v-model="form.password",
            placeholder="密碼",
            aria-describedby="password",
            :disabled="loading",
            required
          )
          .invalid-feedback(v-if="errors.username") {{ errors.password }}
        .card-actions.mt-0.pt-0
          button.btn.btn-primary.btn-block.btn-lg(
            :class="{ disabled: loading, 'btn-loading': loading }",
            type="submit"
          ) 登入
        //- .form-group.mb-0
        //-   nuxt-link.link-dark(to="/login") 忘記密碼
</template>

<script>
  import config from '~/config'
  import Menu from '../plugins/Menu'

  export default {
    props: {
      title: {
        type: String,
        default: () => config.index.title
      },
      errors: {
        type: Object,
        default: () => ({})
      },
      loading: {
        type: Boolean,
        default: false
      },
      powerBy: {
        type: Object,
        default () {
          return {
            isShow: true,
            href: 'http://www.unisharp.com',
            title: 'UniSharp'
          }
        }
      }
    },
    data () {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit () {
        this.$emit('submit', this.form)
      }
    },
    async created () {
      await Menu.clearMenu()
    }
  }
</script>

