<template lang="pug">
  b-container(:fluid="true")
    b-card(header="Form Components", header-tag="header")
      b-form(@submit='onSubmit')
        //- Text Input
        b-form-group(label='Email address:', label-for='exampleInput1', description="We'll never share your email with anyone else.")
          b-form-input#exampleInput1(type='email', v-model='form.email', required='', placeholder='Enter email')
        //- Text Input
        b-form-group(label='Your Name:', label-for='exampleInput2')
          b-form-input#exampleInput2(type='text', v-model='form.name', required='', placeholder='Enter name')
        //- Select
        b-form-group(label='Food:', label-for='exampleInput3')
          b-form-select#exampleInput3(:options='foods', required='', v-model='form.food')
        //- Checkbox
        b-form-group
          b-form-checkbox#exampleInput4(v-model='form.checked')
            | Check me out
        //- Textarea
        b-form-group(label='Textarea:', label-for='exampleInput5')
          b-form-textarea#exampleInput5(placeholder='Enter something', :rows='3', :max-rows='6')
        //- Radio
        b-form-group(label='Food:', label-for='exampleInput6')
          b-form-radio#exampleInput6(:options='foods', v-model='form.food')
        //- Button
        b-button(type='submit', variant='primary') Submit
        b-button(type='reset', variant='secondary') Reset
</template>

<script>
  // import Logo from '~/components/Logo.vue'
  export default {
    data () {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: false,
          secret: 'S3CR3T'
        },
        foods: [
          { text: 'Select One', value: null },
          { text: 'Carrots', value: 1 },
          { text: 'Beans', value: 2 },
          { text: 'Corn', value: 3 }
        ]
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
