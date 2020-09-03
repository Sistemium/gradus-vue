<template lang="pug">

el-container.campaigns-with-aside

  el-aside
    resize#campaigns-scroll-container(:padding="20")
      priorities-list(:campaigns="campaigns" v-model="currentPriority")
      campaigns-list(:campaigns="campaigns" v-model="currentCampaign")

  el-main

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
          @uploaded="setPictures(currentCampaign)"
          :has-authoring="hasAuthoring"
        )

    el-alert(
      v-if="!currentCampaign && !currentPriority && campaigns.length"
      title="👈 Выберите акцию из списка"
      type="info"
    )

    priority-actions(
      v-if="currentPriority"
      :campaigns="campaigns"
      :priority="currentPriority"
    )

    router-view(v-if="currentCampaign")

</template>
<script>

import find from 'lodash/find';

import CampaignPicture from '@/models/CampaignPicture';
import * as actions from '@/vuex/campaigns/actions';
import * as g from '@/vuex/campaigns/getters';
import campaignsAuth from '@/components/campaigns/campaignsAuth';
import CampaignWorkflow from '@/components/campaigns/CampaignWorkflow.vue';
import PriorityActions from '@/components/actions/PriorityActions.vue';
import PrioritiesList from '@/components/actions/PrioritiesList.vue';
import { createNamespacedHelpers } from 'vuex';
import CampaignsPictureGallery from './CampaignsPictureGallery';
import CampaignsList from './CampaignsList.vue';
import CampaignView from './CampaignView.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('campaigns');

const NAME = 'CampaignsWithAside';

export default {

  data() {
    return {
      loading: false,
      currentCampaign: undefined,
      currentPriority: undefined,
      currentCampaignPictures: [],
    };
  },

  props: {
    campaigns: Array,
  },

  watch: {
    currentCampaign(campaign) {
      const { id: campaignId } = campaign || {};
      if (campaignId) {
        this.currentPriority = undefined;
      } else if (this.currentPriority) {
        return;
      }
      this.setPictures(campaign);
      this.updateRouteParams({ campaignId }, {}, 'campaigns');
      this.$nextTick(() => {
        this.scrollToCampaign(campaign);
      });
    },
    currentPriority(priority) {
      const { id: campaignId } = priority || {};
      if (campaignId) {
        this.currentCampaign = undefined;
      } else if (this.currentCampaign) {
        return;
      }
      this.updateRouteParams({ campaignId }, {}, 'campaignsPriorities');
    },
  },

  computed: {
    routedCampaign() {
      const { params: { campaignId }, name } = this.$route;
      if (name === 'campaignsPriorities') {
        return null;
      }
      return find(this.campaigns, { id: campaignId }) || null;
    },
    ...mapGetters({
      actionCopy: g.ACTION_COPY,
      busy: g.BUSY,
    }),
  },

  created() {
    this.$watch('routedCampaign', campaign => {
      if (campaign || this.campaigns.length) {
        this.currentCampaign = campaign;
      }
    }, { immediate: true });
  },

  mounted() {
    this.$nextTick(() => {
      // this.scrollToCampaign(this.currentCampaign);
    });
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
    scrollToCampaign(campaign) {
      if (!campaign) {
        return;
      }
      this.$scrollTo(`#c-${campaign.id}`, 500, {
        container: '#campaigns-scroll-container',
        force: false,
      });
    },
    setPictures(campaign) {
      const query = {
        where: { campaignId: { '==': campaign && campaign.id } },
        orderBy: [['ts', 'ASC'], ['id', 'ASC']],
      };
      CampaignPicture.bindAll(this, query, 'currentCampaignPictures');
    },
  },

  name: NAME,
  components: {
    PriorityActions,
    PrioritiesList,
    CampaignsPictureGallery,
    CampaignView,
    CampaignsList,
    CampaignWorkflow,
  },
  mixins: [campaignsAuth],
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";
@import "../../styles/responsive";

aside {
  margin-top: $margin-top;
  @include responsive-only(lt-md) {
    max-width: 220px;
  }
  @include responsive-only(md) {
    max-width: 260px;
  }
}

main {
  padding-right: 0;
  padding-bottom: 0;
}

.campaign-workflow + * {
  margin-left: $margin-right;
}

.priorities-list {
  margin-bottom: $margin-top;
}

</style>
