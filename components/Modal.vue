<template lang="pug">
  .u-modal
    .modal(:class="{ open }")
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
        shown: false,
        open: false
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

        if (value) {
          this.open = true
        } else {
          setTimeout(() => { this.open = false }, 300)
        }
      }
    },
    methods: {
      show () {
        this.shown = true
        this.$emit('show')
      },
      hide () {
        this.shown = false
        this.$emit('hide')
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
  @import "../assets/scss/mixins";
  @import "node_modules/bootstrap/scss/mixins/transition";

  .slide-enter-active, .slide-leave-active {
    @include transition($modal-transition);
  }

  .slide-enter, .slide-leave-to {
    transform: translateY(-125%);
  }

  .fade-enter-active, .fade-leave-active {
    @include transition($transition-fade);
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  button.close {
    outline: 0;
    cursor: pointer;
  }

  .u-modal-backdrop {
    @include backdrop;

    background-color: rgba(0, 0, 0, .4);
  }

  .modal.open {
    display: flex;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
