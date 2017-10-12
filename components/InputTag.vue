<template lang="pug">
  .u-input-tag
    .form-control.d-flex.align-items-center(:class="{ 'is-invalid': !!error }")
      .tags.d-flex
        a.badge.badge-pill.badge-primary.d-flex.align-items-center.mr-2(
          :key="index",
          v-for="(s, index) in selected",
          @click.prevent.stop="remove(s)"
        ) {{ _.find(normalize(tags), { value: s }).text }}
          i.fa.fa-times.ml-2
      u-select.col.p-0(
        v-model="select",
        :options="normalizedTags",
        :search.sync="search",
        @keydown.delete="removeLast",
        @insert="onInsert",
        @change="onSelect",
        ref="select",
        :placeholder="placeholder",
        no-placeholder,
        filterable
        :empty="search && (!!this.insertable || this.insertable === '') ? `New Tag: ${search}` : ''",
        :disabled="tags.length < 1 && search.length < 1"
      )
      u-modal(ref="modal", size="sm")
        span(slot="title") Error
        h5.mb-0 {{ limitMessage }}
    .invalid-feedback(v-if="error") {{ error }}
</template>

<script>
  import _ from 'lodash'
  import Normalize from '../mixins/normalize'

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
      },
      error: {
        type: String
      }
    },
    watch: {
      selected (selected) {
        if (selected.length > 0) {
          this.select = _.last(selected)
        }

        this.normalizedTags = this.normalize(this.tags).map(v => {
          v.disabled = selected.includes(v.value)
          return v
        })
      }
    },
    data () {
      return {
        select: null,
        normalizedTags: [],
        search: ''
      }
    },
    created () {
      this.normalizedTags = this.normalize(this.tags)
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
          this.$emit('update:tags', _.uniq([...this.tags, { value: inserted, text: inserted, disabled: true }]))
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
      removeLast (e) {
        if (this.search === '') {
          let last = this.selected.pop()
          if (last) {
            this.search = _.find(this.normalize(this.tags), { value: last }).text
          }
          this.$emit('change', this.selected)
        }
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
