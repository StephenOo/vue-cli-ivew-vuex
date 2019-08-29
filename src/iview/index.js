import {
  Button,
  Form,
  Input,
  Icon,
  FormItem,
  Tooltip,
} from 'iview';

const iview = {
  install: (Vue) => {
    Vue.component('Form', Form);
    Vue.component('Button', Button);
    Vue.component('FormItem', FormItem);
    Vue.component('Icon', Icon);
    Vue.component('Input', Input);
    Vue.component('Tooltip', Tooltip);
  },
};

export default iview;
