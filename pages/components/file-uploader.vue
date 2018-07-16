<template lang="pug">
  u-admin
    .card.w-100: .card-body
      h2 Single File Uploader

      .my-2 Basic use. Provide change to handle file changed
      u-single-uploader(@change="changeFile")
      md.form-control.my-3.
        ```
        template.
          u-single-uploader(@change="changeFile")

        script.
          export default {
            data () {
              return {
                form: {
                  file: null
                }
              }
            },
            methods: {
              changeFile (file) {
                // here, do upload to server and response file ...
                this.file = file
              }
            }
          }
        ```

      .my-2 Custom upload message (default message is "Click to Upload File")
      u-single-uploader(upload-message="上傳檔案")
      md.form-control.my-3.
        ```
        u-single-uploader(upload-message="上傳檔案")
        ```

      .my-2 Allow specific types of upload, for example ".jpg, .jpeg, .png"
      u-single-uploader(accept-type=".jpg, .jpeg, .png")
      md.form-control.my-3.
        ```
        u-single-uploader(accept-type=".jpg, .jpeg, .png")
        ```

      .my-2 Uploading effect
      u-single-uploader(:uploading="true")
      md.form-control.my-3.
        ```
        u-single-uploader(:uploading="true")
        ```

      .my-2 Set existing file. Allow image, video and other types, and only image will preview.
      u-single-uploader(type="image", image-path="https://picsum.photos/308/228/")
      md.form-control.my-3.
        ```
        u-single-uploader(type="image", image-path="https://picsum.photos/308/228/")
        ```

      h4 Property
      u-table(:fields="propertyFields", :items="singleUploaderProperties", :hidePagination="true")
      h4 Event
      u-table(:fields="eventFields", :items="singleUploaderEvents", :hidePagination="true")

      h2 File Uploader

      .my-2
        | Allow multiple files at same time, but they will clear when you reload page.
        | There is no way to show existing files when component init
      u-uploader(v-model="form.files", @change="changeFiles")

      md.form-control.my-3.
        ```
        template.
          u-uploader(v-model="form.files", @change="changeFiles")

        script.
          export default {
            data () {
              return {
                form: {
                  files: []
                }
              }
            },
            methods: {
              changeFiles (files) {
                // here, do upload to server and response files ...
                this.files = files
              }
            }
          }
        ```

      h4 Property
      u-table(:fields="propertyFields", :items="uploaderProperties", :hidePagination="true")
      h4 Event
      u-table(:fields="eventFields", :items="uploaderEvents", :hidePagination="true")

</template>
<script>
  export default {
    data () {
      return {
        form: {
          file: null,
          files: []
        },
        propertyFields: {
          property: {
            label: 'Property'
          },
          type: {
            label: 'Type'
          },
          default_value: {
            label: 'Default Value'
          },
          required: {
            label: 'Required'
          },
          description: {
            label: 'Description'
          }
        },
        eventFields: {
          event: {
            label: 'Event'
          },
          arguments: {
            label: 'Arguments'
          },
          description: {
            label: 'Description'
          }
        },
        singleUploaderProperties: [
          { property: 'file', type: 'Object, File', default_value: 'null', required: '', description: 'Existing file' },
          { property: 'imagePath', type: 'String', default_value: 'null', required: '', description: 'Existing image path' },
          { property: 'type', type: 'String', default_value: 'null', required: '', description: 'Existing file file type' },
          { property: 'uploading', type: 'Boolean', default_value: 'false', required: '', description: 'Show / Hide loading animation' },
          { property: 'uploadMessage', type: 'String', default_value: 'Click to Upload File', required: '', description: 'The hint text below the upload icon' },
          { property: 'acceptType', type: 'String', default_value: 'null', required: '', description: 'Acceptable upload type' },
          { property: 'error', type: 'String', default_value: '', required: '', description: 'Error text value' }
        ],
        singleUploaderEvents: [
          { event: 'change', arguments: 'File. A File value', description: 'File changed' }
        ],
        uploaderProperties: [
          { property: 'options', type: 'Object', default_value: 'See Dropzone document (http://www.dropzonejs.com/#config-url)', required: '', description: 'Follow vue-clip (https://github.com/thetutlage/vue-clip) configuration options.' },
          { property: 'error', type: 'String', default_value: '', required: '', description: 'Error text value' }
        ],
        uploaderEvents: [
          { event: 'change', arguments: 'Array. An array of File values', description: 'Files changed' },
          { event: 'addedFile', arguments: 'File', description: 'This event is invoked every time a new file gets uploaded. You can listen for this event, you want to have access to each file object within your own parent component.' },
          { event: 'sending', arguments: 'file, xhr, formData', description: 'This event is emitted before making the upload HTTP request. So this is the time to modify the HTTP request and send some custom attributes.' },
          { event: 'complete', arguments: 'file, status, xhr', description: 'This event is called when a file has been processed. It includes error, success both. 3rd argument will be the xhr response, if the error is returned from the server when uploading the file.' },
          { event: 'stoppedDragging', arguments: '', description: 'This event is invoked when the user stops dragging the file.' },
          { event: 'drop', arguments: '', description: 'This event is invoked when the user drops a file on the vue-clip area.' },
          { event: 'finish', arguments: '', description: 'The event is called when all files in the queue have been uploaded to the server.' },
          { event: 'maxFilesReached', arguments: 'file', description: 'The event is called when maxFiles upload limit has been reached. This event will be fired n timesfor each file exceeding the limit.' },
          { event: 'upload', arguments: '', description: 'The event is called when upload action is triggered' },
          { event: 'removedFile', arguments: 'file', description: 'This event is invoked every time the file has been removed. This is the nice place to make a request to your server for deleting the file.' }
        ]
      }
    },
    methods: {
      changeFile (file) {
        // here, do upload to server and response file ...
        this.file = file
      },
      changeFiles (files) {
        // here, do upload to server and response files ...
        this.files = files
      }
    }
  }
</script>
