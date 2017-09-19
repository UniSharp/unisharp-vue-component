import UAdmin from './components/Admin'
import UBreadcrumb from './components/Breadcrumb'
import UCheckbox from './components/Checkbox'
import UDatetime from './components/Datetime'
import UDropdown from './components/Dropdown'
import UFace from './components/Face'
import UInputTag from './components/InputTag'
import ULogin from './components/Login'
import ULogo from './components/Logo'
import UModal from './components/Modal'
import UOption from './components/Option'
import UPagination from './components/Pagination'
import URadio from './components/Radio'
import USelect from './components/Select'
import USidebar from './components/Sidebar'
import USidenav from './components/Sidenav'
import USwitch from './components/Switch'
import UTable from './components/Table'
import UUploader from './components/Uploader'
import UUserDropdown from './components/UserDropdown'
import UWelcome from './components/Welcome'

var components = {
  UAdmin,
  UBreadcrumb,
  UCheckbox,
  UDatetime,
  UDropdown,
  UFace,
  UInputTag,
  ULogin,
  ULogo,
  UModal,
  UOption,
  UPagination,
  URadio,
  USelect,
  USidebar,
  USidenav,
  USwitch,
  UTable,
  UUploader,
  UUserDropdown,
  UWelcome
}

export default {
  install: function (Vue) {
    for (var component in components) {
      Vue.component(component, components[component])
    }
  }
}
