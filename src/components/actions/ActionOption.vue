<template lang="pug">

.action-option-complex(:class="{ grid: isGrid, 'no-ranges': !showRanges }")

  .option-name(v-if="!hasName && name")
    .name(v-if="name") {{ name }}

  .self(v-if="hasSelfRow" :class="{ 'has-name': hasName }")
    .name(v-if="hasName") {{ name }}
    .range(v-for="range in ranges") {{ range.name }}

  .name-after(v-if="hasName")

  template(v-if="showConditions")
    .action-required(
      v-for="req in ownRequirements"
      :class="req.cls"
      :style="requiredStyle"
      v-html="req.value || '-'"
      v-if="!hasOptionRequirements(req.cls)"
    )

    .discount(
      v-if="!showOptions"
      v-for="discountHeader in discountHeaders"
      :class="discountHeader.cls"
    ) {{ discount && discount[discountHeader.cls] || '-' }}

  template(v-if="showOptions" v-for="(option, idx) in action.options")
    .option
      .name(v-if="option.name") {{ option.name }}
      template(v-if="option.ranges")
        .range(v-for="range in option.ranges") {{ range.name }}
      .comment(v-if="option.commentText")
        i.el-icon-info
        span {{ option.commentText }}
    .option-required(
      v-for="req in optionRequirements(option)" :key="`${req.cls}${idx}`"
      v-if="!ownRequirements.length || hasOptionRequirements(req.cls)"
      :class="req.cls"
      v-html="req.value || '-'"
    )
    .discount(
      v-for="discountHeader in discountHeaders"
      :class="discountHeader.cls"
    ) {{ discountValue(option, discountHeader) | decimal }}

  .discount-matrix(v-if="action.discountMatrix")
    discount-matrix-info(:discount-matrix="action.discountMatrix")
    .optional(v-if="!showOptions && action.options.length")
      .option(v-for="option in action.options" :key="option.id")
        .name(v-if="option.name") {{ option.name }}
        template(v-if="option.ranges")
          .range(v-for="range in option.ranges") {{ range.name }}
        .comment(v-if="option.commentText")
          i.el-icon-info
          span {{ option.commentText }}

  .comment(v-if="action.commentText && showRanges")
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

    hasName() {
      return !!this.name && this.showConditions && !this.action.discountMatrix;
    },

    name() {
      const { action } = this;
      return action.name;
    },

    ranges() {
      const {
        parent,
        action,
      } = this;
      return action.ranges && action.ranges.length ? action.ranges : (parent && parent.ranges);
    },

    showOptions() {
      return this.hasOptions && !(this.ranges && this.ranges.length);
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
          title: '% общая',
          name: 'discountTotal',
          cls: 'total',
        },
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
      const {
        ranges,
        name,
        showRanges,
      } = this;
      return (name || (ranges && ranges.length)) && showRanges;
    },
  },
  methods: {
    discountValue(option, { name }) {
      if (name === 'discountTotal') {
        return this.discountValueSimple(option, 'discountOwn')
          + this.discountValueSimple(option, 'discountComp');
      }
      return this.discountValueSimple(option, name);
    },
    discountValueSimple(option, name) {
      return option[name] || this.action[name] || 0;
    },
  },
  mixins: [actionBase],
  props: {
    showConditions: {
      type: Boolean,
      default: false,
    },
    showRanges: {
      type: Boolean,
      default: true,
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

.action-option-complex {
  text-align: left;
}

$col-wide: 109px;
$col-wide-print: 109px;

$col-mid: 89px;
$col-mid-print: 59px;

.action-option-complex.grid {

  display: grid;
  gap: 1px;
  grid-template-columns: auto $col-wide 59px $col-mid $col-mid $col-mid;
  background: $gray-border-color;
  height: 100%;

  > .action-option-complex {
    grid-column: 1 / span 5;
  }

  &.no-ranges {

    grid-template-columns: auto $col-wide - 1 59px $col-mid $col-mid $col-mid;

    .volume {
      grid-column: 1 / span 2;
    }

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

.action-option-complex > .action-required {
  grid-row-start: 1;
}

.total {
  grid-column: 4;
}

.comp {
  grid-column: 5;
}

.own {
  grid-column: 6;
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
    margin-top: $margin-top-small;
  }
}

.option-name, .self.has-name {
  background: $gray-border-color;
}

.name-after {
  grid-column: 2 / span 5;
  background: white;
}

.option-name {
  padding: $padding;
}

.self, .action-option-complex > .comment {

  grid-column: 1;

  background: white;
  padding: $padding;

  > * + * {
    margin-top: $margin-top-small;
  }
}

.action-option-complex > .comment {
  grid-column-end: 7;
}

.action-option-complex, .option {
  > .comment {
    background: $light-green;
  }
}

.name {
  font-weight: bold;
  text-align: left;
}

.discount-matrix {
  padding: $margin-top;
  grid-column: 1 / span 6;
  background: white;
  display: flex;

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
