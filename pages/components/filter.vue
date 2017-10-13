<template lang="pug">
  u-admin
    button.btn.btn-secondary.mb-4(@click.prevent) Button
    button.btn.btn-primary.mb-4(@click.prevent) Button
    form.form-inline(slot="functions")
      form.form-inline.d-none.d-sm-flex(slot="functions")
        u-input-btn(@click.prevent.stop="$refs.TypeFilter.show()") 複數篩選
        u-input-btn(@click.prevent.stop="$refs.TagFilter.show()") 標籤篩選
        u-select(v-model="age", placeholder="Age", :options="ages")
        u-input-tag

    .filter-result.d-lg-flex.justify-content-between.align-items-center
      .tag-content
        h6.d-inline-block.m-2 篩選的內容：
        a.badge.badge-pill.badge-primary.m-1.mr-2
          | 篩選內容
          i.fa.fa-times.pl-1(aria-hidden='true')
        a.badge.badge-pill.badge-primary.m-1.mr-2
          | 篩選內容
          i.fa.fa-times.pl-1(aria-hidden='true')
        a.badge.badge-pill.badge-primary.m-1.mr-2
          | 篩選內容
          i.fa.fa-times.pl-1(aria-hidden='true')
      .cancal-text.text-right.m-2
        a.text-link
          i.fa.fa-times.pr-1(aria-hidden='true')
          | 全部取消

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
  .filter-result {
    background-color: rgba(0, 0, 0, .03);
    border-top: 1px solid rgba(0, 0, 0, .06);
    border-bottom: 1px solid rgba(0, 0, 0, .06);
    padding: 30px;

    h6 {
      margin: 0;
    }

    .cancal-text {
      min-width: 90px;
    }
  }
</style>
