<template lang="pug">
  .u-uploader
    vue-clip(
      :id="id",
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
      :on-max-files="maxFilesReached"
    )
      template(slot="clip-uploader-action", scope='params')
        div
          .dz-message
            slot(name="dz-message")
              .alert.alert-warning(role="alert", :class="{'is-dragging': params.dragging}")
                h2 Click or Drag and Drop files here

      template(slot="clip-uploader-body", scope="props")
        div(:key="key", v-for="(file, key) in files")
          .card
            .card-block
              .file-avatar
                img(:src="file.dataUrl")
              .file-details
                .file-name
                  | File name: {{file.name}}
                .file-progress(v-if="file.status !== 'error' && file.status !== 'success'")
                  .progress
                    .progress-bar(role="progressbar", :style="{width: file.progress + '%'}", :aria-valuenow="file.progress", aria-valuemin="0", aria-valuemax="100")
                .file-meta
                  .file-size
                    | Size: {{convertBytes(file.size)}}
                  .file-status
                    | Status: {{file.status}}
                .file-remove
                  button.btn.btn-sm.btn-danger(type="button", v-if="file.status !== 'success'", @click="remove(key)") Delete
        button.btn.btn-success(type="button", v-if="files.length", :disabled="uploading || finish", @click="upload") Upload

</template>

<script>
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
        required: true,
        default: null
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
