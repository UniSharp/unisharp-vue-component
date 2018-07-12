<template lang="pug">
  u-admin
    .section
      u-alert(type="danger") 失敗
    .card
      .card-header Form Components
      .card-body
        form
          //- Input
          .form-group.row
            label.col-md-2.col-form-label Input：
            .col-md-10
              u-input(v-model="form.email", type="email", placeholder="Enter email", :error="error")
          //- Textarea
          .form-group.row
            label.col-md-2.col-form-label Textarea：
            .col-md-10
              u-input(v-model="form.textarea", type="textarea", :rows="5", placeholder="Say something here ...", :error="error")
          //- Select
          .form-group.row
            label.col-md-2.col-form-label Select：
            .col-md-10
              u-select(v-model="form.selected", :options="foods", @change="showValue", :error="error")
          //- Checkbox
          .form-group.row
            label.col-md-2.col-form-label Checkbox：
            .col-md-10.form-inline
              u-checkbox(v-model="form.check", :value="true", @change="showValue", :error="error")
                | Enable
          //- Checkbox Group
          .form-group.row
            label.col-md-2.col-form-label Checkbox：
            .col-md-10.form-inline
              u-checkbox-group(v-model="form.checks", :options="foods", @change="showValue", :error="error")
          //- Radio
          .form-group.row
            label.col-md-2.col-form-label Radio Inline：
            .col-md-10
              u-radio(name="group1", :options="foods", v-model="form.radio", @change="showValue", :error="error")
          .form-group.row
            label.col-md-2.col-form-label Radio Stacked：
            .col-md-10
              u-radio(name="group2", :options="foods", :stacked="true", v-model="form.radio", @change="showValue", :error="error")
          //- Switch
          .form-group.row
            label.col-md-2.col-form-label Switch：
            .col-md-10
              u-switch(name="switch", v-model="form.sw", @change="showValue", :error="error")
          //- Date Time Picker
          .form-group.row
            label.col-md-2.col-form-label Date Time (dropdown)：
            .col-md-10
              u-datetime(v-model="form.dropdownTime", @change="showValue", :error="error")
          .form-group.row
            label.col-md-2.col-form-label Date Time (popup)：
            .col-md-10
              u-datetime(v-model="form.popupTime", display="modal", @change="showValue", :error="error")
          .form-group.row
            label.col-md-2.col-form-label Date Time (date only)：
            .col-md-10
              u-datetime(v-model="form.date", mode="date", @change="showValue", :error="error")
          .form-group.row
            label.col-md-2.col-form-label Date Time (time only)：
            .col-md-10
              u-datetime(v-model="form.time", mode="time", @change="showValue", :error="error")
          //- Editor
          .form-group.row
            label.col-md-2.col-form-label Editor：
            .col-md-10
              u-editor(v-model="form.editor", @change="showValue", :error="error")
          //- Input Tag
          .form-group.row
            label.col-md-2.col-form-label Tag Input (Selection)：
            .col-md-10
              u-input-tag(v-model="form.selectedTags", placeholder="AddTag", :tags="tags", :limit="2", @change="showValue", :error="error")
          .form-group.row
            label.col-md-2.col-form-label Tag Input (Can Scroll)：
            .col-md-10
              u-input-tag(v-model="form.selectedTags2", placeholder="AddTag", :tags="tags", :maxTagsShow="5", @change="showValue", :error="error")
          .form-group.row
            label.col-md-2.col-form-label Tag Input (Text Add)：
            .col-md-10
              u-input-tag(v-model="form.selectedTags3", placeholder="AddTag", :tags.sync="tags", :limit="2", insertable, @change="showValue", :error="error")
          //- File Uploader
          .form-group.row
            label.col-md-2.col-form-label Single File Uploader：
            .col-md-10
              u-single-uploader(type="image", :image-path="form.file", acceptType=".jpg, .jpeg, .png", @change="changeFile", :error="error")
          .form-group.row
            label.col-md-2.col-form-label File Uploader：
            .col-md-10
              u-uploader(name="uploader", :options="uploadOptions", v-model="form.files", @change="showValue", :error="error")
          //- Button
          input.btn.btn-primary.mr-2(type="button", value="Submit")
          input.btn.btn-default(type="button", value="Reset")
  </template>

<script>
  import debugModule from 'debug'
  let debug = debugModule('page.form')
  export default {
    data () {
      return {
        error: '欄位必填',
        form: {
          email: null,
          textarea: null,
          selected: null,
          check: true,
          checks: [],
          radio: 1,
          sw: false,
          dropdownTime: null,
          popupTime: null,
          date: null,
          time: null,
          editor: null,
          selectedTags: [],
          selectedTags2: [],
          selectedTags3: [],
          file: null,
          files: []
        },
        foods: [
          { text: 'Carrots', value: 1 },
          { text: 'Beans', value: 2 },
          { text: 'Corn', value: 3 }
        ],
        tags: ['Done', 'Doing', 'Doc', 'Reopen', 'Complete', 'Blocked', 'Teach', 'Depend', 'Error', 'Success'],
        // Refference: http://www.dropzonejs.com/#config-url
        uploadOptions: {
          url: 'http://mockbin.org/bin/323cf903-c2c8-4cb4-a257-10ee8597d3f0',
          method: 'post',
          paramName: 'files',
          uploadMultiple: true,
          acceptedFiles: {
            extensions: ['image/*'],
            message: 'You are uploading an invalid file'
          },
          autoProcessQueue: false,
          headers: {},
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
        }
      }
    },
    methods: {
      changeFile (file) {
        this.form.file = file

        this.showValue(file)
      },
      showValue (value) {
        debug(value)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
