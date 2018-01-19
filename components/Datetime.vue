<template lang="pug">
  .u-datetime
    input.form-control(v-if="isMobile", :type="inputType", :value="valueForInput", @change='updateSelectedValue', :class="{ 'is-invalid': !!error }")
    input.form-control(v-else, :type="inputType", :value="valueForInput", @click='togglePicker', :class="{ 'is-invalid': !!error }", readonly)
    .invalid-feedback(v-if="error") {{ error }}
    .overlay(v-if='showPicker', @click='togglePicker', :class="{'active': display === 'modal'}")
    .picker.bg-white(v-if='showPicker', :class="{'position-center': display === 'modal'}")
      .scroll(v-if='showScroll' ref='scroll')
        ul.nav.nav-pills
          li.nav-item(v-for='(timeUnit, index) in scrollables[timeUnitName]')
            a.nav-link(
              @click='setScrollableTimeUnit(index)',
              :class='{ selected: picker.get(timeUnitName) === index }'
            ) {{ timeUnitName === 'month' ? timeUnit : index }}
      .main(v-else)
        template(v-if='shouldPickDate')
          ul.nav.nav-pills
            li.nav-item: a.nav-link(@click="picker = picker.subtract(1, 'month')"): i.fa.fa-arrow-left.text-gray-700
            li.nav-item: a.nav-link.scrollable.text-secondary.font-weight-bold(@click='toggleScroll("month")') {{ scrollables.month[picker.month()] }}
            li.nav-item: a.nav-link.text-center(@click='resetDate'): i.fa.fa-calendar-o
            li.nav-item: a.nav-link.scrollable.text-secondary.font-weight-bold(@click='toggleScroll("year")') {{ picker.year() }}
            li.nav-item: a.nav-link(@click="picker = picker.add(1, 'month')"): i.fa.fa-arrow-right.text-gray-700
          hr.mt-0
          ul.nav.nav-pills.text-gray-600
            li.nav-item(v-for='weekday in weekdays'): a.nav-link.unclickable {{ weekday }}
          ul.nav.nav-pills.text-gray-600
            li.nav-item(v-for='date in daysInMonth')
              a.nav-link(@click='setDate', :class="{ today: isToday(date.date), selected: date.selected, unclickable: !date.date }") {{ date.date }}
          //- li.nav-item: a.nav-link(@click="picker = picker.subtract(1, 'month')"): i.fa.fa-arrow-left
          //- li.nav-item: a.nav-link.scrollable(@click='toggleScroll("month")') {{ picker.format('MMMM') }}
          //- li.nav-item: a.nav-link.text-center(@click='resetDate'): i.fa.fa-calendar-o
          //- li.nav-item: a.nav-link.scrollable(@click='toggleScroll("year")') {{ picker.year() }}
          //- li.nav-item: a.nav-link(@click="picker = picker.add(1, 'month')"): i.fa.fa-arrow-right
          //- li.nav-item(v-for='weekday in weekdays'): a.nav-link.unclickable {{ weekday }}
          //- li.nav-item(v-for='date in daysInMonth')
          //-   a.nav-link(@click='setDate', :class="{ today: isToday(date.date), selected: date.selected, unclickable: !date.date }") {{ date.date }}
        ul.nav.nav-pills.my-3(v-if='shouldPickTime')
          li.nav-item: a.nav-link.text-center(@click='resetTime'): i.fa.fa-clock-o
          li.nav-item: a.nav-link.scrollable(@click='toggleScroll("hour")') {{ picker.format('h') }}
          li.nav-item: a.nav-link.text-center(@click='resetTime') :
          li.nav-item: a.nav-link.scrollable(@click='toggleScroll("minute")') {{ picker.format('mm') }}
          li.nav-item: a.nav-link.text-center(@click='toggleNoon') {{ afterNoon ? 'P.M.' : 'A.M.' }}
        ul.nav.nav-pills
          li.nav-item.w-50: a.nav-link.w-100.text-center(@click='selected = null'): i.fa.fa-refresh
          li.nav-item.w-50: a.nav-link.w-100.text-center(@click='togglePicker'): i.fa.fa-check

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
        showScroll: false,
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
          this.pickerString = moment(value).format()
        }
      },
      afterNoon: {
        get () {
          return this.selected.format('a') === 'pm'
        },
        set (value) {
          let diff = 0
          switch (true) {
            case !value && this.picker.hour() > 11:
              diff = -12
              break
            case value && this.picker.hour() < 12:
              diff = 12
              break
          }

          this.picker = this.picker.hour(this.picker.hour() + diff)
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
        return false
        // return /Mobi/.test(navigator.userAgent)
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
      isSelectedMonth () {
        return this.picker.isSame(this.selected, 'month')
      },
      shouldPick () {
        if (this.mode === 'time' || this.mode === 'date') {
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
          this.showScroll = !this.showPicker ? false : this.showScroll
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
      setDate (e) {
        this.selected = this.picker.clone().date(e.target.innerHTML)
      },
      setScrollableTimeUnit (timeUnit) {
        if (this.timeUnitName === 'hour') {
          timeUnit += (this.afterNoon * 12)
        }

        this.picker = this.picker.set(this.timeUnitName, timeUnit)

        if (['hour', 'minute'].includes(this.timeUnitName)) {
          this.selected = this.picker
        }

        this.showScroll = !this.showScroll
      },
      isToday (date) {
        return moment().isSame(this.picker.date(date), 'day')
      },
      toggleNoon () {
        this.afterNoon = !this.afterNoon
        this.selected = this.picker
      },
      toggleScroll (timeUnitName) {
        this.timeUnitName = timeUnitName
        this.showScroll = !this.showScroll
        if (this.showScroll) {
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
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "../assets/scss/variables/datetime";
  @import "node_modules/bootstrap/scss/_functions";

  input::-webkit-inner-spin-button,
  input::-webkit-calendar-picker-indicator,
  input::-webkit-clear-button {
    display: none;
    appearance: none;
  }

  .u-datetime {
    position: relative;
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

    & .nav-link {
      width: $button-width * 7;
    }
  }

  .nav-link {
    width: $button-width;
    text-align: center;
    border-radius: 0;
    height: $button-height;
    display: flex;
    align-items: center;
    justify-content: center;

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
      color: color-yiq($background-selected-color);

      &:hover {
        color: color-yiq($background-selected-color);
      }
    }

    &.scrollable {
      width: $button-width * 2;
    }
  }
</style>
