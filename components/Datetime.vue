<template lang="pug">
  .u-datetime
    input.form-control(type="datetime-local", :value="rfcDateTime", @click='showPicker = !showPicker')
    .picker.bg-white(v-if='showPicker')
      ul.nav.nav-pills
        li.nav-item: a.nav-link(@click='subMonth'): i.fa.fa-arrow-left
        li.nav-item: a.nav-link.month-label(@click='resetMonth') {{ months[picker_month - 1] }}. {{ picker_year }}
        li.nav-item: a.nav-link(@click='addMonth'): i.fa.fa-arrow-right
      ul.nav.nav-pills
        li.nav-item(v-for='weekday in weekdays'): a.nav-link.unclickable {{ weekday }}
      ul.nav.nav-pills
        li.nav-item(v-for='item in offset'): a.nav-link.unclickable
        li.nav-item(v-for='monthDay in monthDays'): a.nav-link(@click='setDate', :class="{ today: isToday(monthDay.date), selected: monthDay.selected }") {{ monthDay.date }}

</template>

<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        datetime: '2000-01-01 00:00:00',
        showPicker: false,
        weekdays: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
        months: moment.months(),
        current_year: moment().year(),
        current_month: moment().month() + 1,
        current_day: moment().date(),
        picker_year: moment().year(),
        picker_month: moment().month() + 1,
        picker_day: moment().date(),
        selected_year: moment().year(),
        selected_month: moment().month() + 1,
        selected_day: moment().date()
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
      },
      monthDays () {
        return this.getDaysWithinMonth(this.picker_year, this.picker_month)
      },
      offset () {
        var firstDay = this.monthDays[0]
        return new Array(this.weekdays.indexOf(firstDay.weekday))
      },
      isCurrentMonth () {
        return this.picker_month === this.selected_month && this.picker_year === this.selected_year
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
      getDaysWithinMonth (year, month) {
        var names = this.weekdays
        var date = new Date(year, month - 1, 1)
        var result = []
        while (date.getMonth() === month - 1) {
          result.push({
            date: date.getDate(),
            weekday: names[date.getDay()],
            selected: this.isCurrentMonth && this.selected_day === date.getDate()
          })
          date.setDate(date.getDate() + 1)
        }

        return result
      },
      addMonth () {
        if (this.picker_month === 12) {
          this.picker_month = 1
          this.picker_year++
        } else {
          this.picker_month++
        }
        this.updateSelected()
      },
      subMonth () {
        if (this.picker_month === 1) {
          this.picker_month = 12
          this.picker_year--
        } else {
          this.picker_month--
        }
        this.updateSelected()
      },
      resetMonth () {
        this.picker_month = this.current_month
        this.picker_year = this.current_year
        this.updateSelected()
      },
      setDate (e) {
        this.selected_day = e.target.innerHTML
        this.selected_month = this.picker_month
        this.selected_year = this.picker_year
        this.datetime = this.selected_year +
          '-' + this.prependZero(this.selected_month) +
          '-' + this.prependZero(this.selected_day) +
          ' 00:00:00'
        this.updateSelected()
        // this.showPicker = false
      },
      isToday (date) {
        if (date === this.current_day &&
          this.picker_month === this.current_month &&
          this.picker_year === this.current_year) {
          return 'today'
        } else {
          return ''
        }
      },
      updateSelected () {
        if (this.isCurrentMonth) {
          this.monthDays[this.selected_day - 1].selected = true
        }
      },
      prependZero (str) {
        return ('0' + str).slice(-2)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $height: 40px;
  $button-width: 68px;
  $padding-y: 8px;
  $highlight-color: #ddd;

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
    width: $button-width * 7 + 4px;
    z-index: 999;
    border: 2px solid gray;
  }

  .nav-link {
    width: $button-width;
    text-align: center;
    border-radius: 0;

    &:hover:not(.unclickable) {
      background-color: $highlight-color;
      cursor: pointer;
    }

    &.today, &.today:hover {
      font-weight: 900;
      text-decoration: underline;
    }

    &.selected {
      border: 2px solid $highlight-color;
      height: $height - 3px;
      line-height: $height - 6px - ($padding-y * 2);
      vertical-align: center;
    }

    &.month-label {
      width: $button-width * 5;
    }
  }
</style>
