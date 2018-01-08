<template lang="pug">
  .u-uploader
    vue-clip.u-uploader-clip.mx-0(
      :id="id",
      ref="clip",
      :name="name",
      :options="options",
      :on-init="init",
      :on-added-file="addedFile",
      :on-sending="sending",
      :on-complete="complete",
      :on-drag-leave="stoppedDragging",
      :on-drop="drop",
      :on-total-progress="totalProgress",
      :on-queue-complete="queueCompleted",
      :on-max-files="maxFilesReached",
      :class="{ 'is-invalid': !!error }"
    )
      template(slot="clip-uploader-action", scope="params")
        slot(name="dz-message")
          .dz-message.u-uploader-action.btn.btn-info(role="alert", :class="{ dragging: params.dragging }", ref="action")
            .u-uploader-action-icon(@click="$refs.action.click()")
              img.cloud(src="../assets/img/upload-cloud.png")
              img.arrow(src="../assets/img/upload-arrow.png")
            p.text-center 上傳圖片
      template(slot="clip-uploader-body", scope="props")
        ul.list-unstyled.u-uploader-body.mb-0.mt-4.mb-mt-0.px-0(v-if="files.length")
          li.media.u-uploader-file(:key="key", v-for="(file, key) in files")
            img.u-uploader-file-avatar.d-flex.mr-3(:src="file.dataUrl || require('../assets/img/upload-document.png')")
            .media-body.mt-2
              p.mb-1.d-flex.align-items-center
                span.u-uploader-file-name.font-weight-bold.mr-3 {{ file.name }}
                span.u-uploader-file-size.mr-auto {{ convertBytes(file.size) }}
                i.u-uploader-file-remove.fa.fa-times.fa-lg(@click="remove(key)")
              .progress(v-if="file.status !== 'error' && file.status !== 'success'")
                .progress-bar.bg-primary(role="progressbar", :style="{ width: file.progress + '%' }", :aria-valuenow="file.progress", aria-valuemin="0", aria-valuemax="100")
              p.u-uploader-file-status.mb-0(:class="{ 'error-text': file.status === 'error' }") {{ file.status }}
    .invalid-feedback(v-if="error") {{ error }}
</template>

<script>
  import Vue from 'vue'
  import VueClip from 'vue-clip'

  Vue.use(VueClip)

  // Refference: http://vueclip.adonisjs.com/#-events
  // Refference: http://www.dropzonejs.com/#event-drop
  export default {
    model: {
      prop: 'files',
      event: 'change'
    },
    props: {
      id: {
        default: null
      },
      name: {
        default: null
      },
      options: {
        type: Object,
        default: () => ({
          url: 'http://mockbin.org/bin/323cf903-c2c8-4cb4-a257-10ee8597d3f0',
          method: 'post',
          paramName: 'files',
          uploadMultiple: true,
          autoProcessQueue: true,
          maxFiles: {
            limit: 5,
            message: 'You can only upload a max of 5 files'
          },
          maxFilesize: {
            // size in MB
            limit: 20,
            message: '{{ filesize }} is greater than the {{ maxFilesize }}'
          },
          // Number of files to be uploaded in parallel.
          parallelUploads: 5
        })
      },
      error: {
        type: String
      }
    },
    data () {
      return {
        files: [],
        uploader: null,
        uploading: false,
        finish: false
      }
    },
    methods: {
      init (clip) {
        this.uploader = clip.uploader._uploader
      },
      addedFile (file) {
        this.files.push(file)
        this.finish = false
        this.$emit('addedFile', file)
      },
      sending (file, xhr, formData) {
        // This event is emitted before making the upload HTTP request
        this.$emit('sending', file, xhr, formData)
      },
      complete (file, status, xhr) {
        // This event is called when a file has been processed.
        this.$emit('complete', file, status, xhr)
      },
      stoppedDragging () {
        // user stopped dragging the file.
        this.$emit('stoppedDragging')
      },
      drop () {
        // This event is invoked when the user drops a file on the vue-clip area.
        this.$emit('drop')
      },
      totalProgress (progress, totalBytes, bytesSent) {
        // This event returns the total upload progress for all the files. Think of it as the global progress indicator for multiple files uploaded together.
      },
      queueCompleted () {
        // The event is called when all files in the queue have been uploaded to the server.
        this.uploading = false
        this.finish = true
        this.$emit('finish')
      },
      maxFilesReached (file) {
        // The event is called when maxFiles upload limit has been reached.
        this.remove(this.files.length - 1)
        this.$emit('maxFilesReached', file)
      },
      upload () {
        this.uploader.processQueue()
        this.uploading = true
        this.$emit('upload')
      },
      remove (key) {
        // gets dropzone to decrement max files
        let file = this.files[key]
        this.$refs.clip.removeFile(file)
        // gets vue clip to remove the file from it's array
        let index = this.$refs.clip.files.indexOf(file)
        this.$refs.clip.files.splice(index, 1)

        this.$emit('removedFile', this.files[key])
        this.files.splice(key, 1)
      },
      reset () {
        this.files = []
        this.uploading = false
        this.finish = false
      },
      convertBytes (bytes) {
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) {
          return '0 Byte'
        }
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
      }
    },
    watch: {
      files () {
        this.$emit('change', this.files)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/transition";
  @import "node_modules/bootstrap/scss/mixins/border-radius";

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-.3rem);
    }

    100% {
      transform: translateY(0);
    }
  }

  .u-uploader {
    .is-invalid {
      .u-uploader-action {
        border: 1px solid $form-feedback-invalid-color !important;

        &:hover {
          box-shadow: $btn-invalid-box-shadow;
        }
      }
    }

    .invalid-feedback {
      display: block;
    }

    .error-text {
      color: $form-feedback-invalid-color;
    }

    .u-uploader-action {
      @include transition;
      @include border-radius($input-border-radius);

      width: 12rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .u-uploader-action-icon {
        width: 2.5rem;
        height: 2.5rem;
        opacity: .6;
        position: relative;

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }

      p {
        margin: 0;
        padding: 0 0 0 1rem;
        font-size: 1rem;
      }

      &:hover, &.dragging {
        .u-uploader-action-icon .arrow {
          animation: bounce 1s ease-in-out infinite;
        }
      }
    }

    .u-uploader-body {
      border-top: 1px solid $input-border-color;

      .u-uploader-file {
        border-bottom: 1px solid $input-border-color;
        padding: 1rem 0;

        .u-uploader-file-avatar {
          width: 4rem;
          height: 4rem;
        }

        .u-uploader-file-remove {
          cursor: pointer;
        }

        .progress {
          height: .25rem;
        }
      }
    }
  }
</style>
