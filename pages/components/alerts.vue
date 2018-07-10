<template lang="pug">
  u-admin
    section
      .alert.alert-success(role="alert")
        | This is a success alert with&nbsp;
        a.alert-link an example link
      .alert.alert-danger(role="alert")
        | This is a danger alert with&nbsp;
        a.alert-link an example link
      .alert.alert-info(role="alert")
        | This is a info alert with&nbsp;
        a.alert-link an example link

      md.form-control.
        ```
        .alert.alert-success(role="alert")
          | This is a success alert with&nbsp;
          a.alert-link an example link

        .alert.alert-danger(role="alert")
          | This is a danger alert with&nbsp;
          a.alert-link an example link

        .alert.alert-info(role="alert")
          | This is a info alert with&nbsp;
          a.alert-link an example link
        ```
</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  section {
    width: 90%;
    margin: 0 auto;
    padding: 2rem 0;
  }

</style>
