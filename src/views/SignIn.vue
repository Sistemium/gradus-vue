<template lang="pug">

.sign-in

  p.title
    span Пожалуйста, представьтесь
    a.clickable(@click="cancelClick") Отмена

  .fields

    el-input.phone-number(
      v-if="phaState==='sms'"
      label="Телефон"
      v-model="phone"
      readonly
      disabled
    )

    el-input.sms(
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

import { mapActions, mapState, mapMutations } from 'vuex';
import InputMask from 'inputmask';

import * as a from 'sistemium-vue/store/auth/actions';
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
        return 'Укажите зарегистрированный в системе сотовый номер';
      }
      return this.isComplete ? 'Вход' : 'Вам отправлено СМС с одноразовым паролем';
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
      const smsComplete = this.phaState === 'sms' && this.input.length === 6;
      const phoneComplete = this.isComplete && this.phaState === 'phone';
      if (smsComplete || phoneComplete) {
        this.$nextTick(() => this.sendClick());
      }
    },
    error(message) {
      if (message) {
        this.$message({
          message,
          type: 'error',
          onClose: () => {
            this.clearError();
            this.attachMask();
          },
          showClose: true,
          duration: 5000,
        });
      }
    },
  },

  methods: {

    ...mapActions('auth', {
      authRequest: a.AUTH_REQUEST,
      authConfirm: a.AUTH_REQUEST_CONFIRM,
      clearError: a.CLEAR_ERROR,
    }),

    ...mapMutations('auth', {
      authCancel: PHA_AUTH_TOKEN,
    }),

    sendClick() {

      if (!this.isComplete || this.error) {
        return false;
      }

      const value = {
        value: this.masked.unmaskedvalue(),
        input: this.input,
      };

      this.masked = {};

      if (this.phaState === 'phone') {
        return this.authRequest(value)
          .then(() => {
            this.input = '';
          })
          .catch(() => {
          });
      }

      return this.authConfirm(value)
        .then(() => this.$router.push('/'));

    },

    cancelClick() {
      if (this.phaState === 'phone' && !this.input) {
        this.$router.replace('/');
        return;
      }
      this.input = '';
      this.authCancel();
      this.clearError();
    },

    element() {
      return document.getElementById('sign-input');
    },

    attachMask() {

      const el = this.element();

      if (!el) {
        return;
      }

      this.masked = this.inputMask()
        .mask(el);

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

.title {
  display: flex;
  justify-content: space-between;
}

.sign-in {
  margin: 0 auto;
  max-width: 470px;
}

.fields {
  > * + * {
    margin-top: $margin-top;
  }
}

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
