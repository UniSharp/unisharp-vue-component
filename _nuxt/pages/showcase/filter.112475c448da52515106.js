webpackJsonp([5],{"6Brq":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("F2aO"),r=a("S54o"),i=!1;var o=function(t){i||a("aN0e")},l=a("VU/8")(s.a,r.a,!1,o,"data-v-4f611bb1",null);l.options.__file="pages/showcase/filter.vue",e.default=l.exports},F2aO:function(t,e,a){"use strict";var s=a("M4fF"),r=a.n(s);e.a={data:function(){return{form:{age:null,checked:[]},options:[{text:"Blue",value:"Blue"},{text:"Corina",value:"Corina"}]}},computed:{ages:function(){return r.a.map(r.a.range(5,10),function(t){return{text:t+" years old",value:t}})}}}},O0yU:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".filter-result[data-v-4f611bb1]{background-color:rgba(0,0,0,.03);border-top:1px solid rgba(0,0,0,.06);border-bottom:1px solid rgba(0,0,0,.06);padding:30px}.filter-result h6[data-v-4f611bb1]{margin:0}.filter-result .cancal-text[data-v-4f611bb1]{min-width:90px}.filter-result .cancal-text a.text-link[data-v-4f611bb1]:hover{text-decoration:underline}",""])},S54o:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("u-admin",[a("form",{staticClass:"form-inline",attrs:{slot:"functions"},slot:"functions"},[a("form",{staticClass:"form-inline d-none d-sm-flex",attrs:{slot:"functions"},slot:"functions"},[a("u-input-btn",{attrs:{"append-icon":"filter"},on:{click:function(e){e.preventDefault(),e.stopPropagation(),t.$refs.TypeFilter.show()}}},[t._v("篩選內容")]),a("u-select",{attrs:{placeholder:"Age",options:t.ages},model:{value:t.form.age,callback:function(e){t.$set(t.form,"age",e)},expression:"form.age"}})],1),a("u-input-tag",{attrs:{tags:t.options,placeholder:"Tags"},model:{value:t.form.checked,callback:function(e){t.$set(t.form,"checked",e)},expression:"form.checked"}})],1),a("div",{staticClass:"filter-result d-lg-flex justify-content-between align-items-center"},[a("div",{staticClass:"tag-content"},[a("h6",{staticClass:"d-inline-block m-2"},[t._v("篩選的內容：")]),a("a",{staticClass:"badge badge-pill badge-primary m-1 mr-2"},[t._v("篩選內容"),a("i",{staticClass:"fa fa-times pl-1",attrs:{"aria-hidden":"true"}})]),a("a",{staticClass:"badge badge-pill badge-primary m-1 mr-2"},[t._v("篩選內容"),a("i",{staticClass:"fa fa-times pl-1",attrs:{"aria-hidden":"true"}})]),a("a",{staticClass:"badge badge-pill badge-primary m-1 mr-2"},[t._v("篩選內容"),a("i",{staticClass:"fa fa-times pl-1",attrs:{"aria-hidden":"true"}})])]),a("div",{staticClass:"cancal-text text-right m-2"},[a("a",{staticClass:"text-link"},[a("i",{staticClass:"fa fa-times pr-1",attrs:{"aria-hidden":"true"}}),t._v("全部取消")])])]),a("u-modal",{ref:"TypeFilter"},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("Type Filter")]),a("button",{staticClass:"btn btn-primary",attrs:{slot:"actions"},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.$refs.modal.hide()}},slot:"actions"},[t._v("Confirm")]),a("u-select",{staticClass:"mb-2",attrs:{placeholder:"Age",options:t.ages},model:{value:t.form.age,callback:function(e){t.$set(t.form,"age",e)},expression:"form.age"}}),a("u-select",{staticClass:"mb-2",attrs:{placeholder:"Age",options:t.ages},model:{value:t.form.age,callback:function(e){t.$set(t.form,"age",e)},expression:"form.age"}}),a("u-select",{staticClass:"mb-2",attrs:{placeholder:"Age",options:t.ages},model:{value:t.form.age,callback:function(e){t.$set(t.form,"age",e)},expression:"form.age"}}),a("u-input-tag",{attrs:{tags:t.options,placeholder:"Tags"},model:{value:t.form.checked,callback:function(e){t.$set(t.form,"checked",e)},expression:"form.checked"}})],1)],1)};s._withStripped=!0;var r={render:s,staticRenderFns:[]};e.a=r},aN0e:function(t,e,a){var s=a("O0yU");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a("rjj0")("03979dfd",s,!1)}});