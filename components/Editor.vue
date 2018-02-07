<template lang="pug">
  .editor
    quill-editor.form-control(
      :class="{ 'is-invalid': !!error }",
      :content="content",
      v-model="_content",
      :options="options",
      @ready="onReady",
      @blur="(quill) => { this.$emit('blur', quill) }",
      @focus="(quill) => { this.$emit('focus', quill) }",
      @input="(content) => { this.$emit('input', content) }",
      @change="(content) => { this.$emit('change', content) }",
      stacked
    )
    .invalid-feedback(v-if="error") {{ error }}
</template>

<script>
  import Vue from 'vue'
  import VueQuillEditor from 'vue-quill-editor'

  Vue.use(VueQuillEditor)
  export default {
    created () {
      if (this.value || this.content) {
        this._content = this.value || this.content
      }
    },
    methods: {
      onReady (quill) {
        quill.getModule('toolbar').addHandler('image', () => {
          this.selectLocalImage(quill)
        })

        this.$emit('ready', quill)
      },
      selectLocalImage (quill) {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.click()

        input.onchange = async () => {
          const file = input.files[0]
          let path = this.uploadMethod ? await this.uploadMethod(file) : await this.upload(file)
          const range = quill.getSelection()
          quill.insertEmbed(range.index, 'image', path)
        }
      },
      async upload (file) {
        let form = new FormData()
        form.append('image', file)
        let { path } = await this.$axios.$post('images', form)
        return path
      }
    },
    data () {
      return {
        _content: ''
      }
    },
    props: {
      error: String,
      content: String,
      value: String,
      disabled: Boolean,
      uploadMethod: null,
      options: {
        type: Object,
        required: false,
        default () {
          return {}
        }
      }
    }

  }
</script>

<style scoped>
  .form-control {
    padding: 0;
  }
</style>
