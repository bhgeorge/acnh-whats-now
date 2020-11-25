<template>
  <div>
    <header>
      <section class="o-section">
        <div class="o-container">
          <h1 class="h1">{{ title }}</h1>
          <p class="h3">{{ now | fullDate }}</p>
          <!-- TODO: Vue forms radio buttons -->
          <FilterList
            type="time"
            :filters="filters.time"
            :active="timeFilter"
            @emitFilter="setFilter"
          />
          <FilterList
            type="caught"
            :filters="filters.caught"
            :active="caughtFilter"
            @emitFilter="setFilter"
          />
          <!-- TODO: Vue Forms Filter Radio -->
          <!-- TODO: put inside of a modal triggered next to nav -->
        </div>
      </section>
    </header>
    <main>
      <!-- Available -->
      <section class="o-section">
        <div class="o-container">
          <ul class="o-grid o-grid--4-4-4@m">
            <CardAnimal
              v-for="animal in filtered"
              :key="animal.name"
              :animal="animal"
            />
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { mapState, mapGetters } from 'vuex';
import { GETTER_TYPES } from '@/store';
import CardAnimal from '@/components/CardAnimal.vue';
import FilterList from '@/components/FilterList.vue';

export const TIME = {
  NOW: 'now',
  MONTH: 'month',
  ANY: 'any',
};

export const CAUGHT = {
  NO: 'no',
  ANY: 'any',
};

export default {
  props: {
    animals: {
      type: Array,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
  },

  components: {
    CardAnimal,
    FilterList,
  },

  data() {
    return {
      locations: [
        'ocean',
        'pond',
        'river',
        'river_cliff',
        'river_mouth',
      ],
      timeFilter: TIME.NOW,
      caughtFilter: CAUGHT.NO,
      filters: {
        time: {
          [TIME.NOW]: { text: 'Now', validation: (a) => a.months.includes(this.time.month) && a.hours.includes(this.time.hour) },
          [TIME.MONTH]: { text: 'This month', validation: (a) => a.months.includes(this.time.month) },
          [TIME.ANY]: { text: 'Any time', validation: () => true },
        },
        caught: {
          [CAUGHT.NO]: { text: 'Not caught', validation: (a) => !this[GETTER_TYPES.GET_CAUGHT_STATUS](a.id) },
          [CAUGHT.ANY]: { text: 'All', validation: () => true },
        },
      },
    };
  },

  computed: {
    ...mapState(['now']),

    ...mapGetters([GETTER_TYPES.GET_CAUGHT_STATUS]),

    activeFilters() {
      const filters = [
        this.filters.time[this.timeFilter].validation,
        this.filters.caught[this.caughtFilter].validation,
      ];
      return filters;
    },

    filtered() {
      return this.animals.filter((animal) => {
        for (let i = 0; i < this.activeFilters.length; i += 1) {
          if (!this.activeFilters[i](animal)) {
            // Didn't pass a filter, go next
            return false;
          }
        }
        // Passed all filters, match
        return true;
      });
    },

    time() {
      return {
        month: parseInt(format(this.now, 'M'), 10) - 1,
        hour: parseInt(format(this.now, 'H'), 10),
      };
    },
  },

  methods: {
    setFilter({ type, key }) {
      // TODO: Refactor this stuff to be dynamic
      if (type === 'time') {
        this.timeFilter = key;
      } else if (type === 'caught') {
        this.caughtFilter = key;
      }
    },
  },
};
</script>
