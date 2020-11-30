<template>
  <li
    :is="htmlTag"
    class="c-card c-card--outline"
  >
    <!-- Leaving this month  -->
    <div
      v-if="isLeavingThisMonth"
      class="c-card-animal__alert"
      title="Last chance! Leaving this month"
    >
      <Icon
        :modifiers="['o-icon--s']"
        type="timer"
      />
    </div>
    <h3
      :is="titleTag"
      class="c-card__title c-card-animal__title"
    >
      {{ animal.name }}
    </h3>
    <div class="c-card__body u-d-flex">
      <img :src="imgSrc" alt="" />
      <div class="u-m-left-s">
        <!-- TODO: Tooltip -->
        <p v-if="animal.location">{{ animal.location }}</p>
        <p v-if="animal.size">{{ animal.size }}</p>
        <div class="c-input__group">
          <input
            :id="`caught_${animal.id}`"
            type="checkbox"
            v-model="isAnimalCaught"
          >
          <label>
            Caught
          </label>
        </div>
      </div>
    </div>
    <div class="u-p-s">
      <!-- TODO: Collapse -->
      <details>
        <summary>Availability</summary>
        <TimeAvailability
          :months="animal.months"
          :hours="animal.hours"
        />
      </details>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { format } from 'date-fns';
import { ACTION_TYPES, GETTER_TYPES } from '@/store';
import TimeAvailability from '@/components/TimeAvailability.vue';

export default {
  props: {
    animal: {
      type: Object,
      required: true,
    },

    htmlTag: {
      type: String,
      default: 'li',
    },

    titleTag: {
      type: String,
      default: 'h3',
    },
  },

  components: {
    TimeAvailability,
  },

  computed: {
    ...mapGetters([GETTER_TYPES.GET_CAUGHT_STATUS]),

    ...mapState(['now']),

    imgSrc() {
      if (!this.animal.img) {
        return '/img/fish/bitterling.png';
      }
      return `/img/${this.animal.img}`;
    },

    isAnimalCaught: {
      get() {
        return this[GETTER_TYPES.GET_CAUGHT_STATUS](this.animal.id);
      },
      set(val) {
        this.$store.dispatch(ACTION_TYPES.SET_CAUGHT_STATUS, {
          id: this.animal.id,
          val,
        });
      },
    },

    isLeavingThisMonth() {
      const monthInt = format(this.now, 'M') - 1;
      const nextMonthInt = monthInt === 11 ? 0 : monthInt + 1;
      return (this.animal.months.includes(monthInt) && !this.animal.months.includes(nextMonthInt));
    },
  },
};
</script>
