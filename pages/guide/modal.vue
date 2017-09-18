<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    .container
      u-modal(ref="modal")
        button.btn.btn-primary(slot="lunch", type="button", @click.prevent.stop="$refs.modal.show()") Launch Modal
        span(slot="title") Modal
        button.btn.btn-info(slot="actions", @click.stop.prevent="$refs.modal.hide()") NO
        button.btn.btn-primary(slot="actions", @click.stop.prevent="$refs.modal.hide()") YES
        p Hello World
        p Hello World
        p Hello World
        p Hello World
        p.mb-0 Hello World
</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  .component {
    //
  }
</style>
