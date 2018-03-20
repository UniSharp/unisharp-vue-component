<template lang="pug">
  .u-datetime
    input.form-control(v-if="isMobile", :type="inputType", :value="valueForInput", @change='updateSelectedValue', :class="{ 'is-invalid': !!error }")
    input.form-control(v-else, :type="inputType", :value="valueForInput", @click='togglePicker', :class="{ 'is-invalid': !!error }", readonly)
    .invalid-feedback(v-if="error") {{ error }}
    .overlay(v-if='showPicker', @click='togglePicker', :class="{'active': display === 'modal'}")
    .picker.bg-white(v-if='showPicker', :class="{'position-center': display === 'modal'}")
      .scroll(v-if='scrollIsShown' ref='scroll')
        ul.nav.nav-pills
          li.nav-item(v-for='(timeUnit, index) in scrollables[timeUnitName]')
            a.nav-link(
              @click='setScrollableTimeUnit(index)',
              :class='{ selected: picker.get(timeUnitName) === index }'
            ) {{ timeUnitName === 'month' ? timeUnit : index }}
      .main(v-else)
        template(v-if='shouldPickDate')
          ul.nav.nav-pills.title-nav
            li.nav-item: a.nav-link(@click="picker = picker.subtract(1, 'month')"): i.fa.fa-arrow-left
            li.nav-item.scrollable: a.nav-link.font-weight-bold(@click='showScroll("month")') {{ scrollables.month[picker.month()] }}
            li.nav-item: a.nav-link(@click='resetDate'): i.fa.fa-calendar-o
            li.nav-item.scrollable: a.nav-link.font-weight-bold(@click='showScroll("year")') {{ picker.year() }}
            li.nav-item: a.nav-link(@click="picker = picker.add(1, 'month')"): i.fa.fa-arrow-right
          ul.nav.nav-pills.mt-2
            li.nav-item(v-for='weekday in weekdays'): a.nav-link.unclickable {{ weekday }}
          ul.nav.nav-pills.days-list
            li.nav-item(@click='setDate(day.date)', v-for='day in daysInMonth')
              a.nav-link(:class="{ today: isToday(day.date), selected: day.selected, unclickable: !day.date }") {{ day.date }}
        ul.nav.nav-pills.my-3(v-if='shouldPickTime')
          li.nav-item: a.nav-link(@click='resetTime'): i.fa.fa-clock-o
          li.nav-item.scrollable: a.nav-link(@click='showScroll("hour")') {{ picker.format('h') }}
          li.nav-item: a.nav-link(@click='resetTime') :
          li.nav-item.scrollable: a.nav-link(@click='showScroll("minute")') {{ picker.format('mm') }}
          li.nav-item: a.nav-link(@click='afterNoon = !afterNoon') {{ afterNoon ? 'P.M.' : 'A.M.' }}
        ul.nav.nav-pills
          li.nav-item.w-50: a.nav-link.text-danger(@click='selected = null'): i.fa.fa-refresh
          li.nav-item.w-50: a.nav-link.text-success(@click='togglePicker'): i.fa.fa-check

</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'

  export default {
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        default: null
      },
      mode: {
        type: String,
        default: 'datetime'
      },
      display: {
        type: String,
        default: 'dropdown'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      error: {
        type: String
      },
      config: {
        type: Object,
        default: () => {
          return {locale: 'en'}
        }
      }
    },
    data () {
      return {
        scrollables: {
          year: 3000,
          month: moment.localeData(this.config.locale).months(),
          hour: 12,
          minute: 60
        },
        timeUnitName: '',
        showPicker: false,
        scrollIsShown: false,
        pickerString: null,
        selectedString: null
      }
    },
    watch: {
      selected () {
        if (moment(this.selected).isValid()) {
          this.$emit('change', moment(this.selected).format({
            'date': 'YYYY-MM-DD',
            'time': 'HH:mm:00',
            'datetime': 'YYYY-MM-DD HH:mm:00'
          }[this.shouldPick]))
        } else {
          this.$emit('change', null)
        }
      }
    },
    mounted () {
      if (moment(this.value).isValid()) {
        this.selected = this.picker = moment(this.value)
      } else {
        this.selected = null
        this.picker = moment()
      }
    },
    computed: {
      moment () {
        return moment
      },
      selected: {
        get () {
          return moment(this.selectedString)
        },
        set (value) {
          if (value === null) {
            this.selectedString = null
          } else {
            this.selectedString = moment(value).format()
          }
        }
      },
      picker: {
        get () {
          return moment(this.pickerString)
        },
        set (value) {
          if (value === null) {
            this.pickerString = null
          } else {
            this.pickerString = moment(value).format()
          }
        }
      },
      afterNoon: {
        get () {
          return this.selected.format('a') === 'pm'
        },
        set (value) {
          this.picker = this.selected = this.selected.hour(this.selected.hour() + [12, -12][+this.afterNoon])
        }
      },
      valueForInput () {
        if (this.selectedString === null) {
          return null
        }
        return this.selected.format({
          'date': 'YYYY-MM-DD',
          'time': 'HH:mm',
          'datetime': 'YYYY-MM-DDTHH:mm'
        }[this.shouldPick])
      },
      isMobile () {
        return /Mobi/.test(navigator.userAgent)
      },
      weekdays () {
        return moment.localeData(this.config.locale).weekdaysShort()
      },
      daysInMonth () {
        // add empty day before first day in month
        // Sun, Mon, Tue, Wed, Thu, Fri, Sat
        //   _,   _,   _,   1,   2,   3,   4
        return [
          ..._.range(moment(this.picker).date(1).weekday()).map(() => {
            return {
              date: null,
              weekday: null,
              selected: false
            }
          }),
          ..._.range(1, this.picker.daysInMonth() + 1).map(date => {
            let itsDate = this.picker.clone().date(date)
            return {
              date,
              weekday: itsDate.weekday(),
              selected: itsDate.isSame(this.selected, 'day')
            }
          })
        ]
      },
      shouldPick () {
        if (['date', 'time'].includes(this.mode)) {
          return this.mode
        } else {
          return 'datetime'
        }
      },
      shouldPickDate () {
        return this.shouldPick.indexOf('date') !== -1
      },
      shouldPickTime () {
        return this.shouldPick.indexOf('time') !== -1
      },
      inputType () {
        return {
          'time': 'time',
          'date': 'date',
          'datetime': 'datetime-local'
        }[this.shouldPick]
      }
    },
    methods: {
      updateSelectedValue (e) {
        this.selected = e.target.value
      },
      togglePicker () {
        if (!this.isMobile) {
          this.showPicker = !this.showPicker
          this.scrollIsShown = this.showPicker ? this.scrollIsShown : false
        }
      },
      resetDate () {
        let current = moment()
        this.selected = this.picker = this.picker.set({
          'year': current.year(),
          'month': current.month(),
          'date': current.date()
        })
      },
      resetTime () {
        let current = moment()
        this.selected = this.picker = this.picker.set({
          'hour': current.hour(),
          'minute': current.minute()
        })
      },
      setDate (date) {
        this.selected = this.picker = this.picker.set({ date })
      },
      setScrollableTimeUnit (timeUnit) {
        if (this.timeUnitName === 'hour') {
          timeUnit += (this.afterNoon * 12)
        }

        this.picker = this.picker.set(this.timeUnitName, timeUnit)

        if (['hour', 'minute'].includes(this.timeUnitName)) {
          this.selected = this.selected.set(this.timeUnitName, timeUnit)
        }

        this.scrollIsShown = false
      },
      isToday (date) {
        return moment().isSame(this.picker.date(date), 'day')
      },
      showScroll (timeUnitName) {
        this.timeUnitName = timeUnitName
        this.scrollIsShown = true
        this.$nextTick(() => {
          let container = this.$refs.scroll
          let scrollItems = this.scrollables[this.timeUnitName]
          let scrollLength = Array.isArray(scrollItems) ? scrollItems.length : scrollItems
          let offset = this.timeUnitName === 'month' ? 3.5 : 2.5
          container.scrollTop = container.scrollHeight * (this.picker.get(this.timeUnitName) - offset) / scrollLength
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "node_modules/bootstrap/scss/_functions";

  // Button size
  $button-height: 2.5rem;
  $button-width: 3.5rem;

  // Color
  $background-selected-color: $blue;
  $text-selected-color: white;
  $text-hover-color: black;

  // Position
  $top-offset: 3rem;
  $z-index: 999;

  // Other
  $border-width: 2px;

  input::-webkit-inner-spin-button,
  input::-webkit-calendar-picker-indicator,
  input::-webkit-clear-button {
    display: none;
    appearance: none;
  }

  .u-datetime {
    position: relative;

    input.form-control {
      background-color: $gray-200;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    height: 100%;
    width: 100%;
    z-index: 998;
  }

  .overlay.active {
    background-color: rgba(0, 0, 0, .5);
  }

  .picker {
    position: absolute;
    top: $top-offset;
    width: calc(#{$button-width} * 7 + #{$border-width} * 2);
    z-index: $z-index;
    border: $border-width solid $gray-800;
  }

  .picker.position-center {
    position: fixed;
    top: calc(50vh - #{$button-height} * 10 / 2);
    left: calc(50vw - #{$button-width} * 7 / 2);
  }

  .scroll {
    height: $button-height * 6;
    overflow: scroll;

    & li.nav-item {
      width: $button-width * 7;
    }
  }

  ul.title-nav {
    background-color: $gray-500;
    color: white;
  }

  li.nav-item {
    width: $button-width;
    cursor: pointer;

    &.scrollable {
      width: $button-width * 2;
    }
  }

  ul.days-list .nav-link {
    width: $button-height;
    border-radius: $button-height;

    &:hover:not(.unclickable) {
      border: $border-width solid $background-selected-color;
      color: $text-hover-color;
    }

    &.today, &.today:hover {
      font-weight: bold;
      text-decoration: underline;
    }

    &.selected {
      background-color: $background-selected-color;
      color: $text-selected-color;

      &:hover {
        color: $text-selected-color;
      }
    }
  }

  .nav-link {
    width: 100%;
    text-align: center;
    border-radius: 0;
    height: $button-height;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
</style>
