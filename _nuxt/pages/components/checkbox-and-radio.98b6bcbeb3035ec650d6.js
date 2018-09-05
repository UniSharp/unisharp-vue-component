webpackJsonp([24],{"/GKe":function(e,t,o){"use strict";var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("u-admin",[o("div",{staticClass:"card w-100"},[o("div",{staticClass:"card-body"},[o("section",[o("h4",[e._v("Single Checkbox")]),o("u-value-printer",{attrs:{value:e.form.enabled}}),o("u-checkbox",{model:{value:e.form.enabled,callback:function(t){e.$set(e.form,"enabled",t)},expression:"form.enabled"}},[e._v("Checked")]),o("u-checkbox",{attrs:{disabled:""},model:{value:e.form.enabled,callback:function(t){e.$set(e.form,"enabled",t)},expression:"form.enabled"}},[e._v("Disabled")]),o("u-code-viewer",[o("template",{slot:"template"},[e._v('u-checkbox(v-model="form.checked") Checked\n\nu-checkbox(v-model="form.checked", disabled) Disabled')]),o("template",{slot:"script"},[e._v("data () {\n  return {\n    form: {\n      checked: true\n    }\n  }\n}")])],2),o("h5",[e._v("Properties")]),o("ul",e._l(e.checkboxProperties,function(t){return o("li",[e._v(e._s(t.property)+" ["+e._s(t.type)+"]")])})),o("h5",[e._v("Events")]),o("ul",e._l(e.checkboxEvents,function(t){return o("li",[e._v(e._s(t))])}))],1),o("section",[o("h4",[e._v("Checkbox Group")]),o("u-value-printer",{attrs:{value:e.selectedCheckboxGroup}}),o("h5",[e._v("Inline display")]),o("u-checkbox-group",{attrs:{options:e.options},model:{value:e.selectedCheckboxGroup,callback:function(t){e.selectedCheckboxGroup=t},expression:"selectedCheckboxGroup"}}),o("h5",{staticClass:"mt-3"},[e._v("Stacked display")]),o("u-checkbox-group",{attrs:{options:e.options,stacked:!0},model:{value:e.selectedCheckboxGroup,callback:function(t){e.selectedCheckboxGroup=t},expression:"selectedCheckboxGroup"}}),o("u-code-viewer",[o("template",{slot:"template"},[e._v('u-checkbox-group(v-model="form.checked", :options="options")\n\nu-checkbox-group(v-model="form.checked", :options="options", :stacked="true")')]),o("template",{slot:"script"},[e._v("data () {\n  return {\n    form: {\n      checked: [1]\n    },\n    options: [\n      { text: 'I', value: 1 },\n      { text: 'II', value: 2 },\n      { text: 'III', value: 3 }\n    ]\n  }\n}")])],2),o("h5",[e._v("Properties")]),o("ul",e._l(e.checkboxGroupProperties,function(t){return o("li",[e._v(e._s(t.property)+" ["+e._s(t.type)+"]")])})),o("h5",[e._v("Events")]),o("ul",e._l(e.checkboxGroupEvents,function(t){return o("li",[e._v(e._s(t.event))])}))],1),o("section",[o("h4",[e._v("Single Radio")]),o("u-radio",{attrs:{name:"single1"}},[e._v("Checked")]),o("u-radio",{attrs:{name:"single2",disabled:""}},[e._v("Disabled")]),o("u-code-viewer",[o("template",{slot:"template"},[e._v('u-radio(name="single1") Checked\n\nu-radio(name="single2", disabled) Disabled')])],2)],1),o("section",[o("h4",[e._v("Radio Group")]),o("u-value-printer",{attrs:{value:e.form.checked}}),o("h5",[e._v("Inline display")]),o("u-radio-group",{attrs:{options:e.options},model:{value:e.form.checked,callback:function(t){e.$set(e.form,"checked",t)},expression:"form.checked"}}),o("h5",{staticClass:"mt-3"},[e._v("Stacked display")]),o("u-radio-group",{attrs:{options:e.options,stacked:!0},model:{value:e.form.checked,callback:function(t){e.$set(e.form,"checked",t)},expression:"form.checked"}}),o("u-code-viewer",[o("template",{slot:"template"},[e._v('u-radio-group(v-model="form.checked", :options="options")\n\nu-radio-group(v-model="form.checked", :options="options", :stacked="true")')]),o("template",{slot:"script"},[e._v("data () {\n  return {\n    form: {\n      checked: 1\n    },\n    options: [\n      { text: 'I', value: 1 },\n      { text: 'II', value: 2 },\n      { text: 'III', value: 3 }\n    ]\n  }\n}")])],2),o("h5",[e._v("Properties")]),o("ul",e._l(e.radioGroupProperty,function(t){return o("li",[e._v(e._s(t.property)+" ["+e._s(t.type)+"]")])})),o("h5",[e._v("Events")]),o("ul",e._l(e.radioEvents,function(t){return o("li",[e._v(e._s(t.event))])}))],1)])])])};r._withStripped=!0;var a={render:r,staticRenderFns:[]};t.a=a},"9WNB":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("BFcW"),a=o("/GKe"),n=o("VU/8")(r.a,a.a,!1,null,null,null);n.options.__file="pages/components/checkbox-and-radio.vue",t.default=n.exports},BFcW:function(e,t,o){"use strict";t.a={data:function(){return{form:{enabled:!0,checked:1},selectedCheckboxGroup:[1],options:[{text:"I",value:1},{text:"II",value:2},{text:"III",value:3}],propertyFields:{property:{label:"Property"},type:{label:"Type"},default_value:{label:"Default Value"},required:{label:"Required"},description:{label:"Description"}},eventFields:{event:{label:"Event"},arguments:{label:"Arguments"},description:{label:"Description"}},checkboxProperties:[{property:"selected",type:"Boolean",default_value:"false",required:"",description:"Checkbox is checked or not"},{property:"disabled",type:"Boolean",default_value:"false",required:"",description:"The disabled attribute of checkbox"},{property:"error",type:"String",default_value:"",required:"",description:"Error text value"}],checkboxEvents:["change","focus","blur","click"],checkboxGroupProperties:[{property:"selected",type:"Array",default_value:"",required:"false",description:"Values of selected options"},{property:"options",type:"Array",default_value:"",required:"true",description:"The options of checkboxes, and format is [{ text: 'displayname', value: 'key' }]"},{property:"stacked",type:"Boolean",default_value:"false",required:"",description:"The arrangement of options"},{property:"error",type:"String",default_value:"",required:"",description:"Error text value"}],checkboxGroupEvents:[{event:"change",arguments:"Checked value of checkbox(es). When bound to multiple checkboxes, value will be an array.",description:"Get current value when the checkbox is toggled"}],radioGroupProperty:[{property:"selected",type:"any",default_value:"",required:"false",description:"Value of selected options"},{property:"options",type:"Array",default_value:"",required:"true",description:"The options of radios, and format is [{ text: 'displayname', value: 'key' }]"},{property:"disabled",type:"Boolean",default_value:"false",required:"",description:"The disabled attribute of radio"},{property:"stacked",type:"Boolean",default_value:"false",required:"",description:"The arrangement of options"},{property:"error",type:"String",default_value:"",required:"",description:"Error text value"}],radioEvents:[{event:"change",arguments:"Checked value of radio, and the type according to the option value",description:"Get checked radio value when target radio is checked"},{event:"focus",arguments:"(same as change event)",description:"Get checked radio value when target radio is focused"},{event:"blur",arguments:"(same as change event)",description:"Get checked radio value when target radio is blurred"},{event:"click",arguments:"(same as change event)",description:"Get checked radio value when target radio is click"}]}}}}});