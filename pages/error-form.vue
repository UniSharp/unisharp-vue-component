<template lang="pug">
  u-admin
    .section
      u-alert(type='danger') 失敗
    .card
      .card-header Form Components
      .card-body
        form
          //- Label
          .form-group.row
            label.col-md-2.col-md-2.col-form-label.text-sm-right Label：
            .col-md-10.form-control-static I'm label text.
          //- Input
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right Email address：
            .col-md-10
              u-input(type="email", v-model="form.email", placeholder="Enter email", error="欄位必填")
          //- Select
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right Select：
            .col-sm-10.col-md-4.mb-3.mb-md-0
              u-select(v-model="form.food", :options="foods", error="欄位必填")
            label.col-md-2.col-form-label.text-sm-right Select：
            .col-sm-10.col-md-4.mb-3.mb-md-0
              u-select(v-model="form.food", :options="foods", error="欄位必填")
          //- Checkbox
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right Checkbox：
            .col-md-10.form-inline
              u-checkbox(v-model="check", value="yes")
                | Option 1
          //- Checkboxes
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right Checkbox：
            .col-md-10.form-inline
              u-checkbox(v-model="checks", value="1")
                | Option 1
              u-checkbox(v-model="checks", value="2")
                | Option 2
              u-checkbox(v-model="checks", value="3")
                | Option 3
          //- Switch
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right Switch：
            .col-md-10
              u-switch(name='switch', v-model='form.checked', @change='showSwitchValue', error="欄位必填")
          //- Date Time Picker
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right Date Time：
            .col-md-10
              u-datetime(mode='datetime', v-model='form.time', @change='showTime', error="欄位必填")
          //- Textarea
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right Textarea：
            .col-md-10
             u-textarea(rows="5", v-model='form.email', error="欄位必填")
          //- Radio
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right
              span.title Radio Inline：
            .col-md-10
              u-radio(name="food1", :options="foods", v-model="form.radio.value", error="欄位必填")
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right
              span.title Radio Stacked：
            .col-md-10
              u-radio(name="food2", :options="foods", stacked="true", v-model="form.radio.value", error="欄位必填")
          //- Input Tag
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right
              span.title Tag Input (Selection)：
            .col-md-10
              u-input-tag(v-model="selectedTags", placeholder="AddTag", :tags="tags", :limitTag="2", error="欄位必填")
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right
              span.title Tag Input (Can Scroll)：
            .col-md-10
              u-input-tag(v-model="selectedTags3", placeholder="AddTag", :tags="tags", :maxTagsShow="5", error="欄位必填")
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right
              span.title Tag Input (Text Add)：
            .col-md-10
              u-input-tag(v-model="selectedTags2", placeholder="AddTag", :tags.sync="tags", type="add", :limitTag="2", insertable, error="欄位必填")
          //- File Uploader
          .form-group.row
            label.col-md-2.col-form-label.text-sm-right
              span.title File Uploader：
            .col-md-10
              u-uploader(name="uploader", :options="uploadOptions", v-model="files", error="欄位必填")
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
        check: 'yes',
        checks: ['1', '2'],
        files: [],
        form: {
          email: '',
          name: '',
          food: null,
          fruit: null,
          checked: false,
          time: '2017-09-07 12:38:59',
          secret: 'S3CR3T',
          radio: {
            value: 1
          }
        },
        foods: [
          { text: 'Carrots', value: 1 },
          { text: 'Beans', value: 2 },
          { text: 'Corn', value: 3 }
        ],
        foods2: {
          1: 'Carrots',
          2: 'Beans',
          3: 'Corn'
        },
        fruits: ['orange', 'apple', 'banana', 'peach'],
        selectedTags: [],
        selectedTags2: [],
        selectedTags3: [],
        tags: ['Done', 'Doing', 'Doc', 'Reopen', 'Complete', 'Blocked', 'Teach', 'Depend', 'Error', 'Success'],
        // Refference: http://www.dropzonejs.com/#config-url
        uploadOptions: {
          url: 'http://mockbin.org/bin/323cf903-c2c8-4cb4-a257-10ee8597d3f0',
          method: 'post',
          paramName: 'files',
          uploadMultiple: true,
          // acceptedFiles: {
          //   extensions: ['image/*'],
          //   message: 'You are uploading an invalid file'
          // },
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
      showTime () {
        debug(this.form.time)
      },
      onSubmit (e) {
        alert(JSON.stringify(this.form))
      },
      showSwitchValue (value) {
        debug(value)
      }
    },
    watch: {
      check (val) {
        debug(val)
      },
      checks (val) {
        debug(val)
      },
      files (files) {
        debug(files)
      },
      selectedTags (tags) {
        debug(tags)
      },
      selectedTags2 (tags) {
        debug(tags)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
