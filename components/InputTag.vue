<template lang="pug">
  .u-input-tag.form-control.d-flex.align-items-center
    .tags.d-flex
      a.badge.badge-pill.badge-primary.d-flex.align-items-center.mr-2(
        :key="index",
        v-for="(s, index) in selected",
        @click.prevent.stop="remove(s)"
      ) {{ s }}
        i.fa.fa-times.ml-2
    u-select.col.p-0(v-model="select", :options="tags", @insert="onInsert", @change="onSelect", ref="select", :placeholder="placeholder", no-placeholder, filterable)
    u-modal(ref="modal", size="sm")
      span(slot="title") Error
      h5.mb-0 {{ limitMessage }}
</template>

<script>
  import _ from 'lodash'
  import Normalize from '~/mixins/normalize'

  export default {
    mixins: [Normalize],
    model: {
      prop: 'selected',
      event: 'change'
    },
    props: {
      selected: {
        type: Array,
        required: true
      },
      insertable: {
        type: Boolean,
        default: null
      },
      placeholder: String,
      tags: {
        type: Array,
        required: true
      },
      limit: Number,
      limitMessage: {
        type: String,
        default: 'Maximum tags exceeded.'
      }
    },
    data () {
      return {
        select: null
      }
    },
    computed: {
      _: () => _
    },
    methods: {
      onInsert (inserted) {
        if (this.limit && this.selected.length >= this.limit) {
          this.$refs.modal.show()
          return
        }

        if (!!this.insertable || this.insertable === '') {
          this.$emit('update:tags', _.uniq([...this.tags, {value: null, text: inserted}]))
          this.$emit('change', _.uniq([...this.selected, inserted]))
        }
      },
      onSelect (selected) {
        if (this.limit && this.selected.length >= this.limit) {
          this.$refs.modal.show()

          return
        }

        this.$emit('change', _.uniq([...this.selected, selected]))
      },
      remove (value) {
        this.$emit('change', this.selected.filter(x => x !== value))
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "../assets/scss/variables";

  .u-input-tag {
    .badge {
      cursor: pointer;
      font-size: 85%;
    }
  }
</style>
