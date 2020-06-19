<template lang="pug">

.action-option(:class="isGrid && 'grid'")

  .self(v-if="hasSelfRow")
    .name(v-if="name") {{ name }}
    .range(v-for="range in ranges") {{ range.name }}

  template(v-if="showConditions")
    .action-required(
      v-for="req in ownRequirements"
      :class="req.cls"
      :style="requiredStyle"
      v-html="req.value || '-'"
    )

    .discount(
      v-if="!showOptions"
      v-for="discountHeader in discountHeaders"
      :class="discountHeader.cls"
    ) {{ discount[discountHeader.cls] || '-' }}

  template(v-if="showOptions" v-for="(option, idx) in action.options" :action="option")
    .option
      .name(v-if="option.name") {{ option.name }}
      template(v-if="option.ranges")
        .range(v-for="range in option.ranges") {{ range.name }}
      .comment(v-if="option.commentText")
        i.el-icon-info
        span {{ option.commentText }}
    .option-required(
      v-if="!ownRequirements.length"
      v-for="req in optionRequirements(option)" :key="`${req.cls}${idx}`"
      :class="req.cls"
      v-html="req.value || '-'"
    )
    .discount(
      v-for="discountHeader in discountHeaders"
      :class="discountHeader.cls"
    ) {{ option[discountHeader.name] || action[discountHeader.name] || '-' }}

  .discount-matrix(v-if="action.discountMatrix")
    discount-matrix-info(:discount-matrix="action.discountMatrix")
    .optional(v-if="!showOptions" v-for="option in action.options" :action="option")
      .option
        .name(v-if="option.name") {{ option.name }}
        template(v-if="option.ranges")
          .range(v-for="range in option.ranges") {{ range.name }}
        .comment(v-if="option.commentText")
          i.el-icon-info
          span {{ option.commentText }}

  .comment(v-if="action.commentText")
    i.el-icon-info
    span {{ action.commentText }}


</template>
<script>

import DiscountMatrixInfo from '@/components/actions/DiscountMatrixInfo.vue';
import actionBase from './actionBase';
import ActionRequired from './ActionRequired.vue';
import ActionDiscount from './ActionDiscount.vue';

const NAME = 'ActionOption';

export default {

  name: NAME,
  components: {
    DiscountMatrixInfo,
    ActionDiscount,
    ActionRequired,
  },
  computed: {

    name() {
      const { action } = this;
      return action.name;
    },

    ranges() {
      const { parent, action } = this;
      return action.ranges && action.ranges.length ? action.ranges : (parent && parent.ranges);
    },

    showOptions() {
      return this.hasOptions && !this.ranges;
    },

    requiredStyle() {
      return this.showOptions && {
        'grid-row-start': this.hasSelfRow ? 2 : 1,
        'grid-row-end': `span ${this.action.options.length}`,
      };
    },
    discountHeaders() {
      return [
        {
          title: '% комп.',
          name: 'discountComp',
          cls: 'comp',
        },
        {
          title: '% комм.',
          name: 'discountOwn',
          cls: 'own',
        },
      ];
    },
    hasSelfRow() {
      const { ranges, name } = this;
      return name || (ranges && ranges.length);
    },
  },
  mixins: [actionBase],
  props: {
    showConditions: {
      type: Boolean,
      default: false,
    },
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";
@import "./actionBase";

.range {
  text-align: left;
}

.action-option {
  text-align: left;
}

.action-option.grid {

  display: grid;
  gap: 1px;
  grid-template-columns: auto 89px 59px 89px 89px;
  //grid-template-rows: auto auto;
  background: $gray-border-color;

  > .action-option {
    grid-column: 1 / span 5;
  }

}

.option {
  grid-column: 1;
}

.volume {
  grid-column: 2;
}

.sku {
  grid-column: 3;
}

.action-option > .action-required {
  grid-row-start: 1;
}

.comp {
  grid-column: 4;
}

.own {
  grid-column: 5;
}

.discount, .action-required, .option, .option-required {
  text-align: center;
  background: white;
  padding: $padding;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  white-space: pre-line;
}

.option, .ranges {
  align-items: flex-start;

  > * + * {
    margin-top: $padding;
  }
}

.self, .action-option > .comment {

  grid-column: 1;

  background: white;
  padding: $padding;

  > * + * {
    margin-top: $padding;
  }
}

.action-option > .comment {
  grid-column-end: 6;
  background: $light-green;
}

.name {
  font-weight: bold;
  text-align: left;
}

.discount-matrix {
  padding: $margin-top;
  grid-column: 1 / span 5;
  background: white;
  display: flex;

  .discount-matrix-info {
    // border-top: none;
    // border-bottom: none;
    // border-left: none;
    margin: 0 auto 0 0;
    min-width: 0;
    width: auto;
  }

  > * + * {
    margin-left: $margin-top;
  }

  .optional > .option {
    padding: 0;
  }

}

.comment {
  text-align: left;
}

</style>
