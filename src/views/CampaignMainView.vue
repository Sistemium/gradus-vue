<template lang="pug">

campaign-view(
  v-if="currentCampaign"
  :campaign="currentCampaign"
  :pictures="currentCampaignPictures"
  @campaignPictureClick="campaignPictureClick"
)

  template(v-slot:buttons)
    campaign-workflow(
      :disabled="busy"
      :processing="currentCampaign.processing"
      @transition="onWorkflowTransition"
    )
    transition(name="bounce")
      el-tooltip(v-if="actionCopy")
        div(slot="content") Нажмите, чтобы вставить копию механики «{{ actionCopy.name }}»
        el-button(
          v-if="actionCopy"
          @click="onPasteAction"
          icon="el-icon-suitcase"
          size="mini" circle
        )
    el-button(
      @click="onCopyCampaign"
      icon="el-icon-copy-document"
      size="mini" circle
    )
    button-edit(@click="onEditCampaign")
    button-add(@click="onAddAction")

  template(v-slot:footer)
    campaigns-picture-gallery(
      v-if="currentCampaign"
      :new-image-properties="{ campaignId: currentCampaign.id }"
      carousel-type=""
      :show-empty="false"
      @uploaded="setPictures()"
      :has-authoring="hasAuthoring"
    )

    router-view


</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import * as g from '@/vuex/campaigns/getters';
import * as actions from '@/vuex/campaigns/actions';
import CampaignPicture from '@/models/CampaignPicture';
import Campaign from '@/models/Campaign';

import CampaignView from '@/components/campaigns/CampaignView.vue';
import CampaignsPictureGallery from '@/components/campaigns/CampaignsPictureGallery';
import CampaignWorkflow from '@/components/campaigns/CampaignWorkflow.vue';
import campaignsAuth from '@/components/campaigns/campaignsAuth';

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

const NAME = 'CampaignMainView';

export default {

  name: NAME,

  mixins: [campaignsAuth],

  props: {
    campaignId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      currentCampaign: undefined,
      currentCampaignPictures: [],
    };
  },

  components: {
    CampaignView,
    CampaignsPictureGallery,
    CampaignWorkflow,
  },

  computed: {
    ...mapGetters({
      actionCopy: g.ACTION_COPY,
      busy: g.BUSY,
      searchText: g.SEARCH_TEXT,
    }),
  },

  methods: {
    ...mapActions({
      campaignPictureClick: actions.SHOW_CAMPAIGN_PICTURE,
      transitCampaign: actions.TRANSIT_CAMPAIGN,
      copyCampaign: actions.COPY_CAMPAIGN,
    }),
    onCopyCampaign() {
      this.copyCampaign(this.currentCampaign);
    },
    onEditCampaign() {
      this.$emit('editCampaign', this.currentCampaign);
    },
    onAddAction() {
      this.updateRouteParams({}, {}, 'campaignActionCreate');
    },
    onPasteAction() {
      this.updateRouteParams({}, {}, 'campaignActionPaste');
    },
    onWorkflowTransition(processing) {
      return this.transitCampaign({
        campaign: this.currentCampaign,
        processing,
      });
    },
    setPictures() {
      const { campaignId } = this;
      if (!campaignId) {
        this.$error('campaignId:empty');
        return;
      }
      const query = {
        where: { campaignId: { '==': campaignId } },
        orderBy: [['ts', 'ASC'], ['id', 'ASC']],
      };
      this.$bindToModelFilter(CampaignPicture, query, 'currentCampaignPictures');
    },
  },

  created() {
    this.$watchImmediate('campaignId', campaignId => {
      if (!campaignId) {
        this.$error('campaignId:empty');
        return;
      }
      this.$bindById(Campaign, campaignId, 'currentCampaign');
      this.setPictures();
    });
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.campaign-workflow + * {
  margin-left: $margin-right;
}

</style>
