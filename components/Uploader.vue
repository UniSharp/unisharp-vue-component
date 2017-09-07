<template lang="pug">
  .u-uploader
    vue-clip(:id="id", :name="name",:options="options", :on-init="init", :on-added-file="addedFile", :on-removed-file="removedFile", :on-sending="sending", :on-complete="complete", :on-drag-leave="stoppedDragging", :on-drop="drop", :on-total-progress="totalProgress", :on-queue-complete="queueCompleted", :on-max-files="maxFilesReached")
      template(slot="clip-uploader-action", scope='params')
        div
          .dz-message
            .alert.alert-warning(role="alert", :class="{'is-dragging': params.dragging}")
              h2 Click or Drag and Drop files here

      template(slot="clip-uploader-body", scope="props")
        div(v-for="file in props.files")
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
                    | Size: {{file.size}} Bytes
                  .file-status
                    | Status: {{file.status}}

</template>

<script>
  // Refference: http://vueclip.adonisjs.com
  export default {
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
        uploader: null
      }
    },
    methods: {
      init (clip) {
        this.uploader = clip.uploader._uploader
      },
      addedFile (file) {
        this.files.push(file)
      },
      removedFile (file) {
        delete this.files[file]
      },
      sending (file, xhr, formData) {
        // This event is emitted before making the upload HTTP request
      },
      complete (file, status, xhr) {
        //
      },
      stoppedDragging () {
        // user stopped dragging the file.
      },
      drop () {
        // This event is invoked when the user drops a file on the vue-clip area.
      },
      totalProgress (progress, totalBytes, bytesSent) {
        // This event returns the total upload progress for all the files. Think of it as the global progress indicator for multiple files uploaded together.
      },
      queueCompleted () {
        // The event is called when all files in the queue have been uploaded to the server.
      },
      maxFilesReached (file) {
        // The event is called when maxFiles upload limit has been reached.
      },
      upload () {
        this.uploader.processQueue()
      }
    },
    watch: {
      files () {
        // console.log(this.files)
      }
    }
  }
</script>
