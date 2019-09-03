import {
  Button,
  Form,
  Input,
  Icon,
  FormItem,
  Tooltip,
  Message,
  Switch,
  ColorPicker,
  Row,
  Col,
  Modal,
} from 'iview';

const iview = {
  install: (Vue) => {
    Vue.component('Form', Form);
    Vue.component('Button', Button);
    Vue.component('FormItem', FormItem);
    Vue.component('Icon', Icon);
    Vue.component('Input', Input);
    Vue.component('Tooltip', Tooltip);
    Vue.component('Message', Message);
    Vue.component('Switch', Switch);
    Vue.component('ColorPicker', ColorPicker);
    Vue.component('Row', Row);
    Vue.component('Col', Col);
    Vue.component('Modal', Modal);
  },
};

export default iview;
