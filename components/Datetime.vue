<template lang="pug">
  .u-datetime
    input.form-control(:type="inputType", :value="formattedTime", @click='togglePicker', :class="{ 'is-invalid': !!error }")
    .invalid-feedback(v-if="error") {{ error }}
    .overlay(v-if='showPicker', @click='togglePicker')
    .picker.bg-white(v-if='showPicker')
      .scroll(v-if='showScroll' ref='scroll')
        ul.nav.nav-pills
          li.nav-item(v-for='(timeUnit, index) in scrollables[timeUnitName]')
            a.nav-link(
              @click='setScrollableTimeUnit(index)',
              :class='{ selected: picker.get(timeUnitName) === index }'
            ) {{ timeUnitName === 'month' ? timeUnit : index }}
      .main(v-else)
        ul.nav.nav-pills(v-if='shouldPickDate')
          li.nav-item: a.nav-link(@click="picker = picker.subtract(1, 'month')"): i.fa.fa-arrow-left
          li.nav-item: a.nav-link.scrollable(@click='toggleScroll("month")') {{ picker.format('MMMM') }}
          li.nav-item: a.nav-link.text-center(@click='resetMonth'): i.fa.fa-calendar-o
          li.nav-item: a.nav-link.scrollable(@click='toggleScroll("year")') {{ picker.year() }}
          li.nav-item: a.nav-link(@click="picker = picker.add(1, 'month')"): i.fa.fa-arrow-right
          li.nav-item(v-for='weekday in weekdays'): a.nav-link.unclickable {{ weekday }}
          li.nav-item(v-for='date in daysInMonth')
            a.nav-link(@click='setDate', :class="{ today: isToday(date.date), selected: date.selected, unclickable: !date.date }") {{ date.date }}
        ul.nav.nav-pills.my-3(v-if='shouldPickTime')
          li.nav-item: a.nav-link.text-center(@click='resetMinute'): i.fa.fa-clock-o
          li.nav-item: a.nav-link.scrollable(@click='toggleScroll("hour")') {{ picker.format('hh') }}
          li.nav-item: a.nav-link.text-center(@click='resetMinute') :
          li.nav-item: a.nav-link.scrollable(@click='toggleScroll("minute")') {{ picker.minute() }}
          li.nav-item: a.nav-link.text-center(@click='toggleNoon') {{ afterNoon ? 'P.M.' : 'A.M.' }}

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
      disabled: {
        type: Boolean,
        default: false
      },
      format: {
        type: String,
        default: null
      },
      required: {
        type: Boolean,
        default: false
      },
      error: {
        type: String
      }
    },
    data () {
      return {
        scrollables: {
          year: 3000,
          month: moment.months(),
          hour: 12,
          minute: 60
        },
        timeUnitName: '',
        showPicker: false,
        showScroll: false,
        pickerString: '',
        selectedString: ''
      }
    },
    watch: {
      selected () {
        this.$emit('change', moment(this.formattedTime).format(this.format))
      }
    },
    mounted () {
      this.selected = moment(this.value).isValid() ? moment() : moment(this.value)
      this.picker = this.selected
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
          this.selectedString = moment(value).format()
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
          return this.picker.hour() > 12
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
      formattedTime () {
        return {
          'date': this.selected.format('YYYY-MM-DD'),
          'time': this.selected.format('HH:mm'),
          'datetime': this.selected.format('YYYY-MM-DDTHH:mm')
        }[this.shouldPick]
      },
      isMobile () {
        // return false
        return /Mobi/.test(navigator.userAgent)
      },
      weekdays () {
        return moment.weekdays()
          .map(weekday => { return `${weekday.slice(0, 3)}.` })
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
      togglePicker () {
        if (!this.isMobile) {
          this.showPicker = !this.showPicker
          this.showScroll = !this.showPicker ? false : this.showScroll
        }
      },
      resetMonth () {
        let current = moment()
        this.selected = this.picker = this.picker.set({
          'year': current.year(),
          'month': current.month(),
          'date': current.date()
        })
      },
      resetMinute () {
        let current = moment()
        this.selected = this.picker = this.picker.set({
          'hour': current.year(),
          'minute': current.month()
        })
      },
      setDate (e) {
        this.selected = this.picker.clone().date(e.target.innerHTML)
      },
      setScrollableTimeUnit (timeUnit) {
        if (this.timeUnitName === 'hour') {
          this.picker = this.selected.hour(parseInt(timeUnit) + (this.afterNoon + 0) * 12)
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

  $height: 2.5rem;
  $button-width: 4.5rem;
  $highlight-color: $gray-400;
  $border-width: 2px;
  $top-offset: 3rem;
  $z-index: 999;

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

  .picker {
    position: absolute;
    top: $top-offset;
    width: calc(#{$button-width} * 7 + #{$border-width} * 2);
    z-index: $z-index;
    border: $border-width solid $gray-800;
  }

  .scroll {
    height: $height * 6;
    overflow: scroll;

    & .nav-link {
      width: $button-width * 7;
    }
  }

  .nav-link {
    width: $button-width;
    text-align: center;
    border-radius: 0;
    height: $height;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(.unclickable) {
      border: $border-width solid $highlight-color;
    }

    &.today, &.today:hover {
      font-weight: bold;
      text-decoration: underline;
    }

    &.selected {
      background-color: $highlight-color;

      @include color-yiq($highlight-color);
    }

    &.scrollable {
      width: $button-width * 2;
    }
  }
</style>
