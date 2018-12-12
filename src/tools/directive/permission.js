import {store} from '../../store/index';
import {hasPermission} from './../utils';
import user from "../../store/user";

export default {
  name: 'permission',
  event: {
    bind: function (el, binding, vnode) {
      let perrsionCode = binding.arg;
      let perrsions = store.getters.permissions;
      let isPermission = hasPermission(perrsions,perrsionCode);
      if(!isPermission)
      {
        el.parentNode.removeChild(el);
      }
    }
  }
}
