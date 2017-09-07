<template lang="pug">
  .u-datetime
    input.form-control(type="datetime-local", :value="rfcDateTime", @click='showPicker = !showPicker')
    .picker.bg-white(v-if='showPicker')
      ul.nav.nav-pills
        li.nav-item: a.nav-link: i.fa.fa-arrow-left
        li.nav-item: a.nav-link.month-label.text-center Sep. 2017
        li.nav-item: a.nav-link: i.fa.fa-arrow-right
      ul.nav.nav-pills
        li.nav-item(v-for='weekday in weekdays'): a.nav-link {{weekday}}

</template>

<script>
  export default {
    data () {
      return {
        datetime: '2000-01-01 00:00:00',
        showPicker: false,
        weekdays: [0, 1, 2, 3, 4, 5, 6]
      }
    },
    mounted () {
      this.datetime = this.value
    },
    computed: {
      isMobile () {
        return /Mobi/.test(navigator.userAgent)
      },
      rfcDateTime () {
        var time = this.datetime.replace(' ', 'T')
        return time.substr(0, time.lastIndexOf(':'))
      },
      timeWithoutSeconds () {
        return this.datetime.substr(0, this.datetime.lastIndexOf(':'))
      }
    },
    props: {
      value: {
        default: true
      },
      name: {
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      // togglePicker () {
      //   this.showPicker = !this.showPicker
      // }
    }
  }
</script>

<style lang="scss" scoped>
  $height: 40px;
  $button-width: 50px;

  input::-webkit-inner-spin-button,
  input::-webkit-calendar-picker-indicator,
  input::-webkit-clear-button {
    display: none;
    -webkit-appearance: none;
  }

  .u-datetime {
    position: relative;
  }

  .picker {
    position: absolute;
    top: 40px;
    // width: 300px;
    z-index: 999;
    border: 2px solid gray;
  }

  .left-button {
    height: $height;
  }

  .right-button {
    height: $height;
  }

  .nav-link {
    width: $button-width;

    &:hover {
      background-color: #bbb;
    }

    &.month-label {
      width: $button-width * 5;
    }
  }
</style>
