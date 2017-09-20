<template lang="pug">
  .u-modal
    .modal(:class="{ show: shown }", role="dialog")
      transition(name="fade")
        .u-modal-backdrop(v-if="shown", @click="hide")
      transition(name="slide")
        .modal-dialog(v-if="shown", :class="modalClass")
          .modal-content
            .modal-header
              h5.modal-title
                slot(name="title")
              button.close(type="button", aria-label="Close", @click.prevent.stop="hide")
                span(aria-hidden="true") ×
            .modal-body
              slot
            .modal-footer(v-if="$slots.actions")
              slot(name="actions")
</template>

<script>
  export default {
    props: {
      size: {
        type: String
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
    watch: {
      shown (value) {
        document[['removeEventListener', 'addEventListener'][+value]]('keyup', this.onEsc)
      }
    },
    methods: {
      show () {
        this.shown = true
      },
      hide () {
        this.shown = false
      },
      onEsc (e) {
        if (e.keyCode === 27) {
          this.hide()
        }
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
    @include backdrop;

    background-color: rgba(0, 0, 0, .4);
  }
</style>
