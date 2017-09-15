<template lang="pug">
  .u-datetime
    input.form-control(type="datetime-local", :value="rfcDateTime", @click='togglePicker')
    .picker.bg-white(v-if='showPicker')
      .scroll(v-if='showMonthScroll')
        ul.nav.nav-pills
          li.nav-item(v-for='(month, index) in months'): a.nav-link(@click='setMonth(index)') {{ month }}
      .scroll(v-else-if='showYearScroll' ref='yearScroll')
        ul.nav.nav-pills
          li.nav-item(v-for='year in 3000'): a.nav-link(@click='setYear(year - 1)', :class='{ selected: year - 1 === picker_year }') {{ year - 1 }}
      .scroll(v-else-if='showHourScroll')
        ul.nav.nav-pills
          li.nav-item(v-for='hour in 12'): a.nav-link(@click='setHour(hour - 1)') {{ hour - 1 }}
      .scroll(v-else-if='showMinuteScroll')
        ul.nav.nav-pills
          li.nav-item(v-for='minute in 60'): a.nav-link(@click='setMinute(minute - 1)') {{ minute - 1 }}
      .main(v-else)
        ul.nav.nav-pills
          li.nav-item: a.nav-link(@click='subMonth'): i.fa.fa-arrow-left
          li.nav-item: a.nav-link.scrollable(@click='toggleMonthScroll') {{ months[picker_month - 1] }}
          li.nav-item: a.nav-link.text-center(@click='resetMonth'): i.fa.fa-calendar-o
          li.nav-item: a.nav-link.scrollable(@click='toggleYearScroll') {{ picker_year }}
          li.nav-item: a.nav-link(@click='addMonth'): i.fa.fa-arrow-right
        ul.nav.nav-pills
          li.nav-item(v-for='weekday in weekdays'): a.nav-link.unclickable {{ weekday }}
        ul.nav.nav-pills
          li.nav-item(v-for='item in offsetDays'): a.nav-link.unclickable
          li.nav-item(v-for='monthDay in monthDays'): a.nav-link(@click='setDate', :class="{ today: isToday(monthDay.date), selected: monthDay.selected }") {{ monthDay.date }}
        ul.nav.nav-pills
          li.nav-item(v-for='item in 7'): a.nav-link.unclickable
          li.nav-item: a.nav-link.unclickable: i.fa.fa-clock-o
          li.nav-item: a.nav-link.scrollable(@click='toggleHourScroll') {{ picker_hour }}
          li.nav-item: a.nav-link.text-center(@click='resetMinute') :
          li.nav-item: a.nav-link.scrollable(@click='toggleMinuteScroll') {{ picker_minute }}
          li.nav-item: a.nav-link.text-center(@click='toggleNoon')
            div(v-if='beforeNoon') A.M.
            div(v-else) P.M.
          li.nav-item(v-for='item in 7'): a.nav-link.unclickable

</template>

<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        showPicker: false,
        showMonthScroll: false,
        showYearScroll: false,
        showHourScroll: false,
        showMinuteScroll: false,
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
        selected_day: moment().date(),
        current_hour: moment().hour(),
        current_minute: moment().minute(),
        selected_hour: 1,
        selected_minute: 2,
        scroll: null
      }
    },
    computed: {
      datetime () {
        return this.selected_year +
          '-' + this.prependZero(this.selected_month) +
          '-' + this.prependZero(this.selected_day) +
          ' ' + this.prependZero(this.selected_hour) +
          ':' + this.prependZero(this.selected_minute) +
          ':00'
      },
      isMobile () {
        return false
        // return /Mobi/.test(navigator.userAgent)
      },
      rfcDateTime () {
        var time = this.datetime.replace(' ', 'T')
        return time.substr(0, time.lastIndexOf(':'))
      },
      monthDays () {
        return this.getDaysWithinMonth(this.picker_year, this.picker_month)
      },
      offsetDays () {
        var firstDay = this.monthDays[0]
        return new Array(this.weekdays.indexOf(firstDay.weekday))
      },
      isCurrentMonth () {
        return this.picker_month === this.selected_month && this.picker_year === this.selected_year
      },
      picker_hour () {
        return this.selected_hour - (this.beforeNoon ? 0 : 12)
      },
      picker_minute () {
        return this.selected_minute
      },
      beforeNoon () {
        return this.selected_hour < 12
      },
      yearScroll () {
        return this.$refs.yearScroll
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
    watch: {
      selected_day () {
        this.updateSelectedDay()
      },
      picker_month () {
        this.updateSelectedDay()
      },
      picker_year () {
        this.updateSelectedDay()
      // },
      // showYearScroll () {
      //   this.scroll = this.$refs.yearScroll
      }
    },
    methods: {
      togglePicker () {
        if (!this.isMobile) {
          if (!this.showPicker) {
            this.picker_year = this.selected_year
            this.picker_month = this.selected_month
            this.showYearScroll = false
            this.showMonthScroll = false
            this.showHourScroll = false
            this.showMinuteScroll = false
          }
          this.showPicker = !this.showPicker
        }
      },
      getDaysWithinMonth (year, month) {
        var date = new Date(year, month - 1, 1)
        var result = []
        while (date.getMonth() === month - 1) {
          var today = date.getDate()
          result.push({
            date: today,
            weekday: this.weekdays[date.getDay()],
            selected: this.isCurrentMonth && this.selected_day === today
          })
          date.setDate(today + 1)
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
      },
      subMonth () {
        if (this.picker_month === 1) {
          this.picker_month = 12
          this.picker_year--
        } else {
          this.picker_month--
        }
      },
      resetMonth () {
        this.picker_month = this.current_month
        this.picker_year = this.current_year
      },
      resetMinute () {
        this.selected_hour = moment().hour()
        this.selected_minute = moment().minute()
      },
      setDate (e) {
        this.selected_day = e.target.innerHTML
        this.selected_month = this.picker_month
        this.selected_year = this.picker_year
        // this.showPicker = false
      },
      setMonth (monthIndex) {
        this.picker_month = monthIndex + 1
        this.toggleMonthScroll()
      },
      setYear (year) {
        this.picker_year = year
        this.toggleYearScroll()
      },
      setHour (hour) {
        this.selected_hour = hour
        this.toggleHourScroll()
      },
      setMinute (minute) {
        this.selected_minute = minute
        this.toggleMinuteScroll()
      },
      isToday (date) {
        return (date === this.current_day &&
          this.picker_month === this.current_month &&
          this.picker_year === this.current_year)
      },
      updateSelectedDay () {
        this.monthDays[this.selected_day - 1].selected = this.isCurrentMonth
      },
      prependZero (str) {
        return ('00' + str).slice(-2)
      },
      toggleNoon () {
        this.selected_hour += this.beforeNoon ? 12 : -12
      },
      toggleMonthScroll () {
        this.showMonthScroll = !this.showMonthScroll
      },
      toggleYearScroll () {
        this.showYearScroll = !this.showYearScroll
        if (this.showYearScroll) {
          this.$nextTick(function () {
            var container = this.$refs.yearScroll
            container.scrollTop = container.scrollHeight * (this.selected_year - 2) / 3000
            // container.scrollTop = 500
          })
        }
      },
      toggleHourScroll () {
        this.showHourScroll = !this.showHourScroll
      },
      toggleMinuteScroll () {
        this.showMinuteScroll = !this.showMinuteScroll
      },
      scrollToEnd () {
        // console.log('test')
        // console.log(this.scroll)
        // console.log(this.$refs.get())
        // console.log(this.$refs.get())
        // var container = this.$refs[0]
        // console.log(container)
        // var container = this.$el.querySelector('#year-scroll')
        // container.scrollTop = container.scrollHeight * this.selected_year / 3000
        // container.scrollTop = 500
      }
    }
  }
</script>

<style lang="scss" scoped>
  $height: 40px;
  $button-width: 68px;
  $padding-y: 8px;
  $highlight-color: #ddd;
  $border-width: 2px;

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
    width: $button-width * 7 + $border-width * 2;
    z-index: 999;
    border: $border-width solid gray;
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

    &:hover:not(.unclickable) {
      background-color: $highlight-color;
      cursor: pointer;
    }

    &.today, &.today:hover {
      font-weight: bold;
      text-decoration: underline;
    }

    &.selected {
      border: $border-width solid $highlight-color;
      height: $height - ($border-width + 1px);
      line-height: $height - ($border-width + 1px) * 2 - ($padding-y * 2);
      vertical-align: center;
    }

    &.scrollable {
      width: $button-width * 2;
    }
  }
</style>
