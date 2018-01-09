import UAdmin from './components/Admin'
import UAlert from './components/Alert'
import UBreadcrumb from './components/Breadcrumb'
import UCheckbox from './components/Checkbox'
import UCheckboxGroup from './components/CheckboxGroup'
import UDatetime from './components/Datetime'
import UDropdown from './components/Dropdown'
import UEditor from './components/Editor'
import UFace from './components/Face'
import UInputBtn from './components/InputBtn'
import UInputTag from './components/InputTag'
import ULogin from './components/Login'
import ULogo from './components/Logo'
import UModal from './components/Modal'
import UPagination from './components/Pagination'
import URadio from './components/Radio'
import USelect from './components/Select'
import USidebar from './components/Sidebar'
import USidenav from './components/Sidenav'
import USwitch from './components/Switch'
import UTable from './components/Table'
import UUploader from './components/Uploader'
import UImageUploader from './components/ImageUploader'
import UUserDropdown from './components/UserDropdown'
import UWelcome from './components/Welcome'
import UInput from './components/Input'

import VFocus from './directives/Focus'

let components = {
  UAdmin,
  UAlert,
  UBreadcrumb,
  UCheckbox,
  UDatetime,
  UDropdown,
  UEditor,
  UFace,
  UInputBtn,
  UInputTag,
  ULogin,
  ULogo,
  UModal,
  UPagination,
  URadio,
  USelect,
  USidebar,
  USidenav,
  USwitch,
  UTable,
  UUploader,
  UImageUploader,
  UUserDropdown,
  UWelcome,
  UInput,
  UCheckboxGroup
}

let directives = {
  VFocus
}

export default {
  install: function (Vue) {
    for (let component in components) {
      Vue.component(component, components[component])
    }

    for (let directive in directives) {
      directives[directive](Vue)
    }
  }
}
