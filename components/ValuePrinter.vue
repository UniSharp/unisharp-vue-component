<template lang="pug">
  .my-2
    i.fa.fa-info-circle.text-warning.mr-2
    span.mr-3 value:
    span(v-html="syntaxHighlight(JSON.stringify(value))")
</template>

<script>
  export default {
    props: {
      value: {
        required: true
      }
    },
    methods: {
      syntaxHighlight (json) {
        if (typeof json !== 'string') {
          json = JSON.stringify(json, undefined, 2)
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
          var cls = 'number'
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key'
            } else {
              cls = 'string'
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean'
          } else if (/null/.test(match)) {
            cls = 'null'
          }
          return '<span class="' + cls + '">' + match + '</span>'
        })
      }
    }
  }
</script>

<style>
  .key, .null {
    color: purple;
  }

  .number, .boolean {
    color: blue;
  }

  .string {
    color: red;
  }
</style>
