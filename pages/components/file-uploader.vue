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
          { property: 'file', type: 'Object, File', default_value: 'null', required: '', description: '' },
          { property: 'imagePath', type: 'String', default_value: 'null', required: '', description: '' },
          { property: 'type', type: 'String', default_value: 'null', required: '', description: '' },
          { property: 'uploading', type: 'Boolean', default_value: 'false', required: '', description: '' },
          { property: 'uploadMessage', type: 'String', default_value: 'Click to Upload File', required: '', description: '' },
          { property: 'acceptType', type: 'String', default_value: 'null', required: '', description: '' },
          { property: 'error', type: 'String', default_value: '', required: '', description: '' }
        ],
        singleUploaderEvents: [
          { event: 'change', arguments: '', description: '' }
        ],
        uploaderProperties: [
          { property: 'options', type: 'Object', default_value: '', required: '', description: 'Follow vue-clip (https://github.com/thetutlage/vue-clip) configuration options' },
          { property: 'error', type: 'String', default_value: '', required: '', description: '' }
        ],
        uploaderEvents: [
          { event: 'change', arguments: '', description: '' }
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
