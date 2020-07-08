<template lang="pug">

el-container.campaigns-with-aside

  el-aside
    resize#campaigns-scroll-container(:padding="30")
      campaigns-list(:campaigns="campaigns" v-model="currentCampaign")

  el-main

    campaign-view(
      v-if="currentCampaign"
      :campaign="currentCampaign"
      :pictures="currentCampaignPictures"
      @campaignPictureClick="campaignPictureClick"
    )
      template(v-slot:buttons)
        el-button(
          v-if="actionCopy"
          @click="onPasteAction"
          icon="el-icon-suitcase"
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
        )

    el-alert(
      v-if="!currentCampaign && campaigns.length"
      title="👈 Выберите акцию из списка"
      type="info"
    )

    router-view(v-if="currentCampaign")

</template>
<script>

import find from 'lodash/find';

import CampaignPicture from '@/models/CampaignPicture';
import * as svc from '@/services/campaigns';
import * as actions from '@/vuex/campaigns/actions';
import * as g from '@/vuex/campaigns/getters';
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
      currentCampaignPictures: [],
    };
  },

  props: {
    campaigns: Array,
  },

  watch: {
    currentCampaign(campaign) {
      const { id: campaignId } = campaign || {};
      this.updateRouteParams({ campaignId });
      this.setPictures(campaign);
      this.$nextTick(() => {
        this.scrollToCampaign(campaign);
      });
    },
  },

  computed: {
    routedCampaign() {
      const { campaignId } = this.$route.params;
      return find(this.campaigns, { id: campaignId }) || null;
    },
    ...mapGetters({
      actionCopy: g.ACTION_COPY,
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
    }),
    onEditCampaign() {
      this.$emit('editCampaign', this.currentCampaign);
    },
    onAddAction() {
      this.updateRouteParams({}, {}, 'campaignActionCreate');
    },
    onPasteAction() {
      this.updateRouteParams({}, {}, 'campaignActionPaste');
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
      // this.currentCampaignPictures = campaign ? campaign.pictures : [];
      const query = {
        where: { campaignId: { '==': campaign && campaign.id } },
        orderBy: [['ts', 'ASC'], ['id', 'ASC']],
      };
      CampaignPicture.bindAll(this, query, 'currentCampaignPictures');
      if (!campaign) {
        return;
      }
      this.loading = true;
      svc.getCampaignPicturesByCampaign(campaign)
        .finally(() => {
          this.loading = false;
        });
    },
  },

  name: NAME,
  components: {
    CampaignsPictureGallery,
    CampaignView,
    CampaignsList,
  },
};

</script>
<style scoped lang="scss">

@import "../../styles/variables";

aside {
  margin-top: $margin-top;
}

main {
  padding-right: 0;
}

</style>
