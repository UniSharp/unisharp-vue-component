<template lang="pug">
  .u-datetime
    input.form-control(type="datetime-local", :value="rfcDateTime", @click='togglePicker')
    .picker.bg-white(v-if='showPicker')
      .scroll(v-if='showScroll' ref='scroll')
        ul.nav.nav-pills
          li.nav-item(v-for='(timeUnit, index) in timeUnitRange')
            a.nav-link(
              v-if='timeUnitName === "month"',
              @click='setScrollableTimeUnit(index + 1)',
              :class='{ selected: picker[timeUnitName] === index + 1 }'
            ) {{ timeUnit }}
            a.nav-link(
              v-else,
              @click='setScrollableTimeUnit(index)',
              :class='{ selected: picker[timeUnitName] === index }'
            ) {{ index }}
      .main(v-else)
        ul.nav.nav-pills
          li.nav-item: a.nav-link(@click='subMonth'): i.fa.fa-arrow-left
          li.nav-item: a.nav-link.scrollable(@click='toggleScroll("month")') {{ this.scrollables.month[picker.month - 1] }}
          li.nav-item: a.nav-link.text-center(@click='resetMonth'): i.fa.fa-calendar-o
          li.nav-item: a.nav-link.scrollable(@click='toggleScroll("year")') {{ picker.year }}
          li.nav-item: a.nav-link(@click='addMonth'): i.fa.fa-arrow-right
        ul.nav.nav-pills
          li.nav-item(v-for='weekday in weekdays'): a.nav-link.unclickable {{ weekday }}
        ul.nav.nav-pills
          li.nav-item(v-for='item in offsetDays'): a.nav-link.unclickable
          li.nav-item(v-for='monthDay in monthDays'): a.nav-link(@click='setDate', :class="{ today: isToday(monthDay.date), selected: monthDay.selected }") {{ monthDay.date }}
        ul.nav.nav-pills.my-3
          li.nav-item: a.nav-link.unclickable: i.fa.fa-clock-o
          li.nav-item: a.nav-link.scrollable(@click='toggleScroll("hour")') {{ picker_hour }}
          li.nav-item: a.nav-link.text-center(@click='resetMinute') :
          li.nav-item: a.nav-link.scrollable(@click='toggleScroll("minute")') {{ selected.minute }}
          li.nav-item: a.nav-link.text-center(@click='toggleNoon') {{ beforeNoon ? 'A.M.' : 'P.M.' }}

</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      value: {
        default: true
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
    data () {
      var currentTime = {
        year: moment().year(),
        month: moment().month() + 1,
        day: moment().date(),
        hour: moment().hour(),
        minute: moment().minute()
      }

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
        weekdays: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
        current: this.clone(currentTime),
        picker: this.clone(currentTime),
        selected: this.clone(currentTime)
      }
    },
    computed: {
      datetime () {
        return ('000' + this.selected.year).slice(-4) +
          '-' + this.prependZero(this.selected.month) +
          '-' + this.prependZero(this.selected.day) +
          ' ' + this.prependZero(this.selected.hour) +
          ':' + this.prependZero(this.selected.minute) +
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
        return this.getDaysWithinMonth(this.picker.year, this.picker.month)
      },
      offsetDays () {
        var firstDay = this.monthDays[0]
        return new Array(this.weekdays.indexOf(firstDay.weekday))
      },
      isCurrentMonth () {
        return this.picker.month === this.selected.month && this.picker.year === this.selected.year
      },
      picker_hour () {
        return this.selected.hour % 12
      },
      beforeNoon () {
        return this.selected.hour < 12
      },
      timeUnitRange () {
        return this.scrollables[this.timeUnitName]
      }
    },
    mounted () {
      var date = this.value.substr(0, this.value.indexOf(' ')).split('-')
      var time = this.value.substr(this.value.indexOf(' ') + 1).split(':')
      this.selected.year = parseInt(date[0])
      this.selected.month = parseInt(date[1])
      this.selected.day = parseInt(date[2])
      this.selected.hour = parseInt(time[0])
      this.selected.minute = parseInt(time[1])
      this.picker = this.clone(this.selected)
    },
    watch: {
      selected: {
        handler: function () {
          this.updateSelectedDay()
        },
        deep: true
      },
      picker: {
        handler: function () {
          this.updateSelectedDay()
        },
        deep: true
      }
    },
    methods: {
      togglePicker () {
        if (!this.isMobile) {
          if (!this.showPicker) {
            this.picker.year = this.selected.year
            this.picker.month = this.selected.month
            this.showScroll = false
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
            selected: this.isCurrentMonth && this.selected.day === today
          })
          date.setDate(today + 1)
        }

        return result
      },
      addMonth () {
        if (this.picker.month === 12) {
          this.picker.month = 1
          this.picker.year++
        } else {
          this.picker.month++
        }
      },
      subMonth () {
        if (this.picker.month === 1) {
          this.picker.month = 12
          this.picker.year--
        } else {
          this.picker.month--
        }
      },
      resetMonth () {
        this.picker.month = this.current.month
        this.picker.year = this.current.year
      },
      resetMinute () {
        this.selected.hour = moment().hour()
        this.selected.minute = moment().minute()
        this.picker.hour = moment().hour()
        this.picker.minute = moment().minute()
      },
      setDate (e) {
        this.selected.day = e.target.innerHTML
        this.selected.month = this.picker.month
        this.selected.year = this.picker.year
        // this.showPicker = false
      },
      setScrollableTimeUnit (timeUnit) {
        this.selected[this.timeUnitName] = timeUnit
        this.picker[this.timeUnitName] = timeUnit
        this.showScroll = !this.showScroll
      },
      isToday (date) {
        return (date === this.current.day &&
          this.picker.month === this.current.month &&
          this.picker.year === this.current.year)
      },
      updateSelectedDay () {
        this.monthDays[this.selected.day - 1].selected = this.isCurrentMonth
      },
      prependZero (str) {
        return ('00' + str).slice(-2)
      },
      toggleNoon () {
        this.selected.hour += this.beforeNoon ? 12 : -12
      },
      toggleScroll (timeUnitName) {
        this.timeUnitName = timeUnitName
        this.showScroll = !this.showScroll
        if (this.showScroll) {
          this.$nextTick(function () {
            var container = this.$refs.scroll
            var scrollItems = this.scrollables[this.timeUnitName]
            var scrollLength = Array.isArray(scrollItems) ? scrollItems.length : scrollItems
            var offset = this.timeUnitName === 'month' ? 3.5 : 2.5
            container.scrollTop = container.scrollHeight * (this.selected[this.timeUnitName] - offset) / scrollLength
          })
        }
      },
      clone (value) {
        return JSON.parse(JSON.stringify(value))
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
  $top-offset: 2.5rem;
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
      cursor: pointer;
      background-color: $highlight-color;

      @include color-yiq($highlight-color);
    }

    &.today, &.today:hover {
      font-weight: bold;
      text-decoration: underline;
    }

    &.selected {
      border: $border-width solid $highlight-color;
    }

    &.scrollable {
      width: $button-width * 2;
    }
  }
</style>
