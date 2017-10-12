<template lang="pug">
  u-admin
    form.form-inline(slot="functions")
      form.form-inline.d-none.d-sm-flex(slot="functions")
        u-input-btn(@click.prevent.stop="$refs.modal.show()")
        u-select(v-model="age", placeholder="Age", :options="ages")

    u-modal(ref="modal")
      span(slot="title") Filter
      button.btn.btn-primary(slot="actions", @click.stop.prevent="$refs.modal.hide()") Confirm
      u-select.mb-2(v-model="age", placeholder="Age", :options="ages")
      u-select.mb-2(v-model="age", placeholder="Age", :options="ages")
      u-select(v-model="age", placeholder="Age", :options="ages")

</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  .example {
    padding: 10px;
  }
</style>
