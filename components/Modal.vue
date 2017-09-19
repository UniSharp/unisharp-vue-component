<template lang="pug">
  .u-modal
    .modal(:class="{ show: shown }")
      transition(name="fade")
        .u-modal-backdrop(v-if="shown", @click="shown = false")
      transition(name="slide")
        .modal-dialog(v-if="shown", :class="modalClass")
          .modal-content
            .modal-header
              h5.modal-title
                slot(name="title") Modal title
              button.close(type="button", aria-label="Close", @click.prevent.stop="shown = false")
                span(aria-hidden="true") ×
            .modal-body
              slot
                p Modal body text goes here.
            .modal-footer(v-if="!disableFooter")
              slot(name="actions")
                button.btn.btn-info(type="button", @click.prevent.stop="shown = false") Close
                button.btn.btn-primary(type="button", @click.prevent.stop="shown = false") Save changes
</template>

<script>
  export default {
    props: {
      size: {
        type: String
      },
      disableFooter: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        shown: false
      }
    },
    computed: {
      modalClass () {
        switch (this.size) {
          case 'lg':
            return 'modal-lg'

          case 'sm':
            return 'modal-sm'

          default:
            return ''
        }
      }
    },
    methods: {
      show () {
        this.shown = true
      },
      hide () {
        this.shown = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/transition";

  .slide-enter-active, .slide-leave-active {
    @include transition($transition-slide);
  }

  .slide-enter, .slide-leave-to {
    margin-top: -125%;
  }

  .fade-enter-active, .fade-leave-active {
    @include transition($transition-fade);
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .modal.show {
    display: block;
  }

  .u-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, .4);
  }
</style>
