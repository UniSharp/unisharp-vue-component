<template lang="pug">
.mod_select
  .select
    .select-styled(@click.blur="show = !show", :class="{ active: show }")
      | {{selected.text}}
    ul.select-options(:class="{ 'd-block': show }", ref="options")
      u-option(:value="defaults.value") {{ defaults.text }}
      u-option(@change="select", v-for="(option, key) in options", :key="key", :value="option.value")
        | {{ option.text }}
</template>

<script>
  import UOption from '~/components/Option'
  export default {
    components: { UOption },
    model: {
      prop: 'selected',
      event: 'change'
    },
    props: {
      defaults: {
        type: Object,
        default: () => {
          return {
            'text': '請選擇',
            'value': null
          }
        }
      },
      options: {
        type: Array
      }
    },
    data () {
      return {
        show: false,
        selected: {
          'text': '',
          'value': null
        }
      }
    },
    methods: {
      select (selected) {
        this.selected = selected
        this.show = false
        this.$emit('change', this.selected)
      }
    },
    mounted () {
      this.selected = this.defaults
    }
  }
</script>
