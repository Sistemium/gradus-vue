<template lang="pug">

.sign-in

  p Пожалуйста, представьтесь

  .fields

    el-input(
      v-if="phaState==='sms'"
      label="Телефон"
      v-model="phone"
      readonly
      disabled
      )

    el-input.long-title(
    v-model="input"
    type="tel"
    id="sign-input"
    :label="label"
    :placeholder="placeholder"
    )

  .buttons
    el-button(
    :plain="phaState === 'phone'"
    :type="buttonType"
    :disabled="!isComplete || !!error"
    @click="sendClick"
    ) {{ buttonText }}

</template>
<script>

import { mapActions, mapState } from 'vuex';
import InputMask from 'inputmask';

import { AUTH_REQUEST, AUTH_REQUEST_CONFIRM } from 'sistemium-vue/store/auth/actions';
import { PHA_AUTH_TOKEN } from 'sistemium-vue/store/auth/mutations';

// import log from 'sistemium-telegram/services/log';
// const { debug } = log('SignIn');

const phoneMask = '+7 (999) 999-99-99';
const smsMask = '9{4,6}';

export default {

  name: 'SignIn',

  data() {
    return {
      input: '',
      masked: {},
    };
  },

  computed: {
    ...mapState('auth', {
      phaState(state) {
        return state[PHA_AUTH_TOKEN] && state[PHA_AUTH_TOKEN].phone ? 'sms' : 'phone';
      },
      phone(state) {
        return state[PHA_AUTH_TOKEN] && state[PHA_AUTH_TOKEN].phone;
      },
      error: 'error',
    }),
    isComplete() {
      return this.masked.isComplete && this.masked.isComplete();
    },
    authorized() {
      return !!this.$store.state.auth.roles;
    },
    placeholder() {
      return this.phaState === 'phone' ? phoneMask.replace(/9/g, '_') : '4-6 цифр из СМС';
    },
    label() {
      return this.phaState === 'phone' ? 'Ваш сотовый' : 'Пароль';
    },
    buttonText() {
      if (this.phaState === 'phone') {
        return 'Укажите номер, который на вас зарегистрирован';
      }
      return this.isComplete ? 'Вход' : 'Вам отправлено СМС';
    },
    buttonType() {
      return this.phaState === 'phone' ? '' : 'primary';
    },
  },

  watch: {
    phaState() {
      if (!this.authorized) {
        this.$nextTick(() => this.attachMask());
      }
    },
    input() {

      if ((this.phaState === 'sms' && this.input.length === 6) ||
        (this.isComplete && this.phaState === 'phone')) {

        this.$nextTick(() => this.sendClick());

      }

    },
  },

  methods: {

    ...mapActions('auth', [AUTH_REQUEST, AUTH_REQUEST_CONFIRM]),

    sendClick() {

      if (!this.isComplete || this.error) {
        return false;
      }

      const value = { value: this.masked.unmaskedvalue(), input: this.input };

      this.masked = {};

      if (this.phaState === 'phone') {
        return this[AUTH_REQUEST](value)
          .then(() => {
            this.input = '';
          });
      }

      return this[AUTH_REQUEST_CONFIRM](value)
        .then(() => this.$router.push('/'));

    },

    element() {
      return document.getElementById('sign-input');
    },

    attachMask() {

      const el = this.element();

      if (!el) {
        return;
      }

      this.masked = this.inputMask().mask(el);

    },

    inputMask() {

      return new InputMask({
        mask: this.phaState === 'phone' ? phoneMask : smsMask,
        onKeyDown: ({ which }) => which === 13 && this.sendClick(),
      });

    },

  },

  mounted() {

    this.$nextTick(() => {
      this.attachMask();
    });

  },

};

</script>

<style scoped lang="scss">

@import "../styles/variables";

.buttons {

  margin-top: $margin-top * 3;

  button {

    display: block;
    width: 100%;
    padding: $margin-top 12px;
    height: auto;

    &.is-plain {
      border: none;
    }

  }

}

</style>