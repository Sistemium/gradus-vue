<template lang="pug">

.action-single-view()

  h1.campaign(v-if="campaign")
    img(src="../assets/icons8-discount-orange.svg")
    .name Акция {{ campaign.name }}

  campaign-action(
    :action="action"
    v-if="action"
    :with-pictures="true"
    :with-history="false"
  )

  .footer(v-if="campaign")
    .fields
      .oneTime(v-if="campaign.oneTime")
        i.el-icon-circle-check
        span Единовременная
      .repeatable(v-if="campaign.repeatable")
        i.el-icon-circle-check
        span Многократная
      .needPhoto(v-if="campaign.needPhoto")
        i.el-icon-camera-solid
        span Фото-отчет
      .territory(v-if="campaign.territory")
        i.el-icon-location
        span {{ campaign.territory }}
    img(src="../assets/icons8-discount-orange.svg")

</template>
<script>

import Action from '@/models/Action';
import Campaign from '@/models/Campaign';
import CampaignAction from '@/components/campaigns/CampaignAction.vue';

const NAME = 'ActionSingleView';

export default {

  name: NAME,
  components: { CampaignAction },

  props: {
    actionId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      action: null,
      campaign: null,
      logo: '../assets/icons8-discount-green.svg',
    };
  },

  computed: {
    // action() {
    //   return Action.get(this.actionId);
    // },
  },

  created() {
    this.$watchImmediate('actionId', actionId => {
      if (!actionId) {
        return;
      }
      this.$bindById(Action, actionId, 'action');
      Action.find(actionId);
    });

    this.$watchImmediate('action.campaignId', campaignId => {
      if (!campaignId) {
        return;
      }
      this.$bindById(Campaign, campaignId, 'campaign');
      Campaign.find(campaignId);
    });

  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

//$header-color: #F44336;
//$header-color: #2ECC71;
//$header-color: rgb(0, 123, 193);
$header-color: rgb(87, 53, 128);

img {
  max-height: 75px;
}

@mixin header-font {
  font-size: 30px;
  font-weight: 500;
}

.action-single-view {
  height: 750px;
  width: 1100px;
  border: dashed 1px $gray-border-color;
  padding: $margin;
  display: flex;
  flex-direction: column;
}

.campaign {

  .name {
    background: $header-color;
    color: white;
    flex: 1;
    padding: $margin-top;
  }

  @include header-font();
  display: flex;
  align-items: center;

  img {
    margin-right: $margin;
  }

}

.campaign-action {

  $col-width: 130px;
  $col-width-thin: 90px;
  $col-width-1: $col-width - 1;

  font-size: 23px;

  flex: 1;

  /deep/ {

    table {
      //height: 100%;
    }

    th.discount {
      color: #444;
    }

    th .title span {
      @include header-font();
    }

    .action-required em {
      font-size: 15px;
    }

    .tfoot {
      font-size: 18px;
    }

    button {
      display: none;
    }

    td.discount, th.discount {
      width: $col-width;
      //@media print {
      //  width: 60px;
      //}
    }

    th.volume, td.volume {
      width: $col-width;
      max-width: $col-width;
      //@media print {
      //  width: 80px;
      //  max-width: 80px;
      //}
    }

    th.sku, td.sku {
      width: $col-width-thin;
      max-width: $col-width-thin;
      //@media print {
      //  width: 40px;
      //  max-width: 40px;
      //}
    }

    th.number, td.number {
      width: 50px;
      background: $gray-background;
      //@media print {
      //  width: 26px;
      //}
    }

    .action-option.grid {

      grid-template-columns: auto $col-width-1 $col-width-thin - 1 $col-width-1 $col-width-1;

      @media print {
        //grid-template-columns: auto $col-width-1 $col-width-1 $col-width-1 $col-width-1;
      }

      &.no-ranges {
        grid-template-columns: auto $col-width-1 - 1 $col-width-thin - 1 $col-width-1 $col-width-1;
        //@media print {
        //  grid-template-columns: auto 88px 39px 59px 59px;
        //}
      }

    }

    .footer .other {
      display: none;
    }

  }

}

.footer {

  .fields {
    background: $header-color;
    flex: 1;
    padding: $margin-top;
  }

  img {
    margin-left: $margin;
  }

  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: $margin;
  color: white;
  font-size: 30px;

  i {
    margin-right: $margin-right;
  }

  .fields > * {
    margin-right: $margin;
    display: inline-block;
  }

}

</style>
