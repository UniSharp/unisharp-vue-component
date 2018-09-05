<template lang="pug">
  u-admin
    .section
      u-alert(type="success") 成功
    .card
      .card-header Form Components
      .card-body
        form(@submit="onSubmit")
          //- Input
          .form-group.row
            label.col-md-2.col-form-label Input：
            .col-md-10
              u-input(v-model="form.email", type="email", placeholder="Enter email")
          //- Textarea
          .form-group.row
            label.col-md-2.col-form-label Textarea：
            .col-md-10
              u-input(v-model="form.textarea", type="textarea", :rows="5", placeholder="Say something here ...")
          //- Select
          .form-group.row
            label.col-md-2.col-form-label Select：
            .col-md-10
              u-select(v-model="form.selected", :options="foods", @change="showValue")
          //- Checkbox
          .form-group.row
            label.col-md-2.col-form-label Checkbox：
            .col-md-10.form-inline
              u-checkbox(v-model="form.check", :value="true", @change="showValue")
                | Enable
          //- Checkbox Group
          .form-group.row
            label.col-md-2.col-form-label Checkbox Group：
            .col-md-10.form-inline
              u-checkbox-group(v-model="form.checks", :options="foods", @change="showValue")
          //- Radio
          .form-group.row
            label.col-md-2.col-form-label Radio Inline：
            .col-md-10
              u-radio(name="group1", :options="foods", v-model="form.radio", @change="showValue")
          .form-group.row
            label.col-md-2.col-form-label Radio Stacked：
            .col-md-10
              u-radio(name="group2", :options="foods", :stacked="true", v-model="form.radio", @change="showValue")
          //- Switch
          .form-group.row
            label.col-md-2.col-form-label Switch：
            .col-md-10
              u-switch(name="switch", v-model="form.sw", @change="showValue")
          //- Date Time Picker
          .form-group.row
            label.col-md-2.col-form-label Date Time (dropdown)：
            .col-md-10
              u-datetime(v-model="form.dropdownTime", @change="showValue")
          .form-group.row
            label.col-md-2.col-form-label Date Time (popup)：
            .col-md-10
              u-datetime(v-model="form.popupTime", display="modal", @change="showValue")
          .form-group.row
            label.col-md-2.col-form-label Date Time (date only)：
            .col-md-10
              u-datetime(v-model="form.date", mode="date", @change="showValue")
          .form-group.row
            label.col-md-2.col-form-label Date Time (time only)：
            .col-md-10
              u-datetime(v-model="form.time", mode="time", @change="showValue")
          //- Editor
          .form-group.row
            label.col-md-2.col-form-label Editor：
            .col-md-10
              u-editor(v-model="form.editor", @change="showValue")
          //- Input Tag
          .form-group.row
            label.col-md-2.col-form-label Tag Input：
            .col-md-10
              u-input-tag(v-model="form.selectedTags", placeholder="AddTag", :tags="tags", @change="showValue")
          .form-group.row
            label.col-md-2.col-form-label Tag Input (Has Limit)：
            .col-md-10
              u-input-tag(v-model="form.selectedTags2", placeholder="AddTag", :tags="tags", :limit="2",  @change="showValue")
          .form-group.row
            label.col-md-2.col-form-label Tag Input (Text Add)：
            .col-md-10
              u-input-tag(v-model="form.selectedTags3", placeholder="AddTag", :tags.sync="tags", :insertable="true", @change="showValue")
          //- File Uploader
          .form-group.row
            label.col-md-2.col-form-label Single File Uploader：
            .col-md-10
              u-single-uploader(type="image", :image-path="form.file", acceptType=".jpg, .jpeg, .png", @change="changeFile")
          .form-group.row
            label.col-md-2.col-form-label File Uploader：
            .col-md-10
              u-uploader(name="uploader", :options="uploadOptions", v-model="form.files", @change="showValue")
          //- Button
          input.btn.btn-primary.mr-2(type="submit", value="Submit")
          input.btn.btn-default(type="button", value="Reset", @click="onReset")
  </template>

<script>
  import debugModule from 'debug'
  let debug = debugModule('page.form')
  export default {
    data () {
      return {
        form: this.initForm(),
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
      initForm () {
        return {
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
        }
      },
      changeFile (file) {
        this.form.file = file

        this.showValue(file)
      },
      showValue (value) {
        debug(value)
      },
      onSubmit (e) {
        e.preventDefault()

        debug(this.form)

        console.log(this.form)

        alert('submit success')
      },
      onReset (e) {
        console.log(this.initForm())
        this.form = this.initForm()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
