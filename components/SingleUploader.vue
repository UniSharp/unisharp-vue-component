<template lang="pug">
  .u-image-uploader
    .placeholder.img-thumbnail(v-if="uploading")
      .handle
        i.fa.fa-spinner.fa-spin.fa-5x
        h6.mb-0 上傳中...
    .img(v-else-if="preview")
      button.btn.btn-danger.btn-square(type="button", @click.prevent="handleRemove")
        i.fa.fa-times
      img.img-fluid.img-thumbnail(:src="preview")
    .d-flex.align-items-center(v-else-if="fileClass")
      i.fa.fa-2x(aria-hidden="true", :class="fileClass")
      a(:href="fileUrlPath", :download="fileName")
        span.file.mr-3.ml-3 {{ fileName }}
      button.btn.btn-danger.btn-square(type="button", @click.prevent="handleRemove")
        i.fa.fa-times
    .placeholder.img-thumbnail(v-else, :class="{ 'is-invalid': error }")
      .handle(@click="() => $refs.file.click()")
        i.fa.fa-cloud-upload.fa-4x
        h6.mb-0.pt-3 {{ uploadMessage }}
    input.sr-only(type="file", ref="file", :accept="acceptType", @change="handleChange")
    .invalid-feedback(v-if="error") {{ error }}
</template>

<script>
  export default {
    props: {
      file: {
        type: [Object, File],
        default: null
      },
      imagePath: {
        type: String,
        default: null
      },
      type: {
        type: String,
        default: null
      },
      uploading: {
        default: false,
        type: Boolean
      },
      error: {
        type: String
      },
      uploadMessage: {
        type: String,
        default: 'Click to Upload File'
      },
      acceptType: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        preview: this.imagePath,
        fileClass: null,
        fileName: this.file ? this.file.name : ''
      }
    },
    computed: {
      fileUrlPath () {
        if (this.file == null || this.file instanceof File) {
          return
        }

        return this.file.path
      }
    },
    created () {
      this.setPreview(this.file)
    },
    methods: {
      handleChange (e) {
        if (!e.target.files.length) {
          return
        }

        let file = e.target.files[0]

        this.setPreview(file)

        this.$emit('change', e.target.files[0])

        this.$refs.file.value = null
      },
      handleRemove () {
        this.$emit('change', null)

        this.preview = null
        this.fileName = null
        this.fileClass = null
      },
      setPreview (file) {
        if (file === null) {
          return
        }

        switch (this.parseFileType(file)) {
          case 'image':
            this.setPreviewImage(file)
            break
          case 'video':
            this.setPreviewVideo(file)
            break
          default:
            this.setPreviewDefault(file)
            break
        }
      },
      parseFileType (file) {
        if (file === null) {
          return
        }

        if (file instanceof File) {
          return file.type.split('/').shift()
        }

        return this.type
      },
      setPreviewImage (file) {
        if (file instanceof File) {
          let reader = new FileReader()

          reader.onload = e => { this.preview = e.target.result }

          reader.readAsDataURL(file)
        }
      },
      setPreviewVideo (file) {
        this.fileName = file.name
        this.fileClass = { 'fa-file-video-o': true }
      },
      setPreviewDefault (file) {
        this.fileName = file.name
        this.fileClass = { 'fa-file': true }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/hover";
  @import "node_modules/bootstrap/scss/mixins/transition";
  @import "node_modules/bootstrap/scss/mixins/box-shadow";

  .u-image-uploader {
    > * {
      margin: $input-padding-y 0;
    }

    h6 {
      font-weight: 300;
    }

    .invalid-feedback {
      display: block;
    }

    .img-thumbnail {
      background-color: $input-bg;
      color: $input-placeholder-color;
      border: 2px dashed $input-border-color;

      &.is-invalid {
        border: 1px solid $red !important;
      }
    }

    .placeholder {
      display: inline-block;
      width: 20rem;
      height: 15rem;

      .handle {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 100%;
        height: 100%;
      }

      @include hover {
        @include box-shadow($btn-focus-box-shadow);

        border-color: $input-focus-border-color;
      }
    }

    .img {
      display: inline-block;
      position: relative;
      width: 50%;

      button {
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    a > .file {
      color: black;
    }
  }
</style>
