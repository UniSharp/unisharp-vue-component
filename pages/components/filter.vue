<template lang="pug">
  u-admin
    button.btn.btn-secondary.mb-4(@click.prevent) Create
    button.btn.btn-primary.mb-4(@click.prevent) Others
    form.form-inline(slot="functions")
      form.form-inline.d-none.d-sm-flex(slot="functions")
        u-input-btn(@click.prevent.stop="$refs.TypeFilter.show()") 複數篩選
        u-input-btn(@click.prevent.stop="$refs.TagFilter.show()") 標籤篩選
        u-select(v-model="age", placeholder="Age", :options="ages")
        u-input-tag

    u-modal(ref="TypeFilter")
      span(slot="title") Type Filter
      button.btn.btn-primary(slot="actions", @click.stop.prevent="$refs.modal.hide()") Confirm
      u-select.mb-2(v-model="age", placeholder="Age", :options="ages")
      u-select.mb-2(v-model="age", placeholder="Age", :options="ages")
      u-select(v-model="age", placeholder="Age", :options="ages")

    u-modal(ref="TagFilter")
      span(slot="title") Tag Filter
      button.btn.btn-primary(slot="actions", @click.stop.prevent="$refs.modal.hide()") Confirm
      u-input-tag(v-model="form.checked", :tags="options", placeholder="Tags")

</template>

<script>
  export default {
    data () {
      return {
        form: {
          checked: []
        },
        options: [
          { text: 'Blue', value: 'Blue' },
          { text: 'Corina', value: 'Corina' }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .example {
    padding: 10px;
  }
</style>
