<template lang="pug">
  u-admin
    section
      h4 Normal
      a.badge.badge-pill.badge-primary Primary
      a.badge.badge-pill.badge-danger Danger
      a.badge.badge-pill.badge-info Info

      md.form-control.my-4.
        ```
        a.badge.badge-pill.badge-primary Primary
        a.badge.badge-pill.badge-danger Danger
        a.badge.badge-pill.badge-info Info
        ```

      h4 With icon
      a.badge.badge-pill.badge-primary
        | Primary
        i.fa.fa-times.pl-1(aria-hidden='true')
      a.badge.badge-pill.badge-danger
        | Danger
        i.fa.fa-times.pl-1(aria-hidden='true')
      a.badge.badge-pill.badge-info
        | Info
        i.fa.fa-times.pl-1(aria-hidden='true')

      md.form-control.my-4.
        ```
        a.badge.badge-pill.badge-primary
          | Primary
          i.fa.fa-times.pl-1(aria-hidden='true')
        a.badge.badge-pill.badge-danger
          | Danger
          i.fa.fa-times.pl-1(aria-hidden='true')
        a.badge.badge-pill.badge-info
          | Info
          i.fa.fa-times.pl-1(aria-hidden='true')
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

    .badge + .badge {
      margin-left: 1rem;
    }

    h4 {
      padding: 0 0 16px;
    }
  }
</style>
