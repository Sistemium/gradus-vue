<template lang="pug">

.campaign-view

  .buttons(v-if="hasAuthoring")
    slot(name="buttons")

  .fields

    .name
      campaign-group-select(v-model="campaign.groupCode" :readonly="true" v-if="campaign.groupCode")
      span(v-text="campaign.name")
    .period
      .date-b {{ campaign.dateB | ruDate }}
      .date-e {{ campaign.dateE | ruDate }}

    .comment-text(v-if="campaign.commentText")
      i.el-icon-info
      span {{ campaign.commentText }}
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

  resize(:padding="20")

    .actions
      campaign-action(
        v-for="action in sortedActions" :action="action" :key="action.id"
        @actionClick="onActionClick"
      )

    .pictures()
      .thumbnail(
        v-for="picture in pictures"
        :key="picture.id"
      )
        img(:src="picture.thumbnailSrc" @click="campaignThumbnailClick(picture)")

    slot(name="footer")

</template>
<script>

import orderBy from 'lodash/orderBy';
import Action from '@/models/Action';
import CampaignAction from '@/components/campaigns/CampaignAction.vue';
import CampaignGroupSelect from '@/components/campaigns/CampaignGroupSelect.vue';
import campaignsAuth from '@/components/campaigns/campaignsAuth';

const NAME = 'CampaignView';

export default {

  props: {
    campaign: Object,
    pictures: Array,
  },

  data() {
    return { actions: [] };
  },

  methods: {
    editCampaignClick() {
      this.$emit('editCampaign', this.campaign);
    },
    campaignThumbnailClick(picture) {
      this.$emit('campaignPictureClick', picture);
    },
    onActionClick({ id: actionId }) {
      this.updateRouteParams({ actionId }, {}, 'ActionSingleView');
    },
  },

  computed: {
    sortedActions() {
      return orderBy(this.actions, 'name');
    },
  },

  created() {
    this.$watch('campaign.id', campaignId => {
      this.$bindToModelFilter(Action, { campaignId }, 'actions');
    }, { immediate: true });
  },

  name: NAME,
  components: {
    CampaignGroupSelect,
    CampaignAction,
  },
  mixins: [campaignsAuth],

};

</script>
<style scoped lang="scss">

@import "campaignsBase";

.pictures {
  margin-top: $margin-top;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.thumbnail {
  margin: $padding;
  border-radius: $border-radius;
  border: solid 1px $gray-border-color;

  &:hover {
    border-color: $blue;
  }

  img {
    max-width: 170px;
    margin: $margin-top;
    cursor: zoom-in;
  }
}

.name {
  display: flex;
  font-size: large;
  font-weight: bold;
  white-space: pre-line;

  > * + * {
    margin-left: $padding;
  }
}

.period {
  display: flex;

  .date-b:before {
    content: "с";
    margin-right: $padding;
  }

  .date-e:before {
    content: "по";
    margin: 0 $padding;
  }
}

.buttons {
  float: right;
}

.actions {
  .campaign-action {
    margin-top: $margin-top;
    @media print {
      margin-top: $margin-top-print;
    }
  }
}

.campaign-group-select {
  color: $light-gray;
}

</style>
