<template lang="pug">
  u-admin
    .section
      u-alert(type='success') 成功
    .card
      .card-header Form Components
      .card-body
        form
          //- Label
          .form-group.row
            label.col-md-2 Label：
            .col-md-10.form-control-static I'm label text.
          //- Input
          .form-group.row
            label.col-md-2.col-form-label Email address：
            .col-md-10
              input.form-control(type='email', v-model='form.email', required='', placeholder='Enter email')
          //- Select
          .form-group.row
            label.col-md-2.col-form-label Select：
            .col-md-10
              u-select(v-model="form.food", :options="foods")
          //- Checkbox
          .form-group.row
            label.col-md-2.col-form-label Checkbox：
            .col-md-10.form-inline
              u-checkbox(v-model="check", value="yes")
                | Option 1
          //- Checkboxes
          .form-group.row
            label.col-md-2.col-form-label Checkbox：
            .col-md-10.form-inline
              u-checkbox(v-model="checks", value="1")
                | Option 1
              u-checkbox(v-model="checks", value="2")
                | Option 2
              u-checkbox(v-model="checks", value="3")
                | Option 3
          //- Switch
          .form-group.row
            label.col-md-2.col-form-label Switch：
            .col-md-10
              u-switch(name='switch', v-model='form.checked', @change='showSwitchValue')
          //- Date Time Picker
          .form-group.row
            label.col-md-2.col-form-label Date Time：
            .col-md-10
              u-datetime(mode='datetime', v-model='form.time', @change='showTime', nullable)
          //- Textarea
          .form-group.row
            label.col-md-2.col-form-label Textarea：
            .col-md-10
             textarea.form-control(rows="5")
          //- Radio
          .form-group.row
            label.col-md-2
              span.title Radio Inline：
            .col-md-10
              u-radio(name="food1", :options="foods", v-model="form.radio.value")
          .form-group.row
            label.col-md-2
              span.title Radio Stacked：
            .col-md-10
              u-radio(name="food2", :options="foods", stacked="true", v-model="form.radio.value")
          .form-group.row
            label.col-md-2
              span.title Radio Result：
            .col-md-10
              input(type="text", :value="showRadioText(form.radio.value)")
          //- Input Tag
          .form-group.row
            label.col-md-2
              span.title Tag Input (Selection)：
            .col-md-10
              u-input-tag(v-model="selectedTags", placeholder="AddTag", :tags="tags", :limit="2")
          .form-group.row
            label.col-md-2
              span.title Tag Input (Can Scroll)：
            .col-md-10
              u-input-tag(v-model="selectedTags3", placeholder="AddTag", :tags="tags", :maxTagsShow="5")
          .form-group.row
            label.col-md-2
              span.title Tag Input (Text Add)：
            .col-md-10
              u-input-tag(v-model="selectedTags2", placeholder="AddTag", :tags.sync="tags", :limit="2", insertable)
          //- File Uploader
          .form-group.row
            label.col-md-2
              span.title File Uploader：
            .col-md-10
              u-uploader(name="uploader", :options="uploadOptions", v-model="files")
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
          time: '',
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
      },
      showRadioText (value) {
        return this.foods.find((food) => {
          if (food.value === value) {
            return food
          }
        }).text
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
