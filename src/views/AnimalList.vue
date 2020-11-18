<template>
  <div>
    <header>
      <section class="o-section">
        <div class="o-container">
          <h1 class="h1">{{ title }}</h1>
          <p class="h3">{{ now | fullDate }}</p>
        </div>
      </section>
    </header>
    <main>
      <!-- Available Now -->
      <section class="o-section">
        <div class="o-container">
          <h2 class="h5">Available now</h2>
          <ul class="o-grid o-grid--4-4-4@m">
            <CardAnimal
              v-for="animal in available.now"
              :key="animal.name"
              :animal="animal"
            />
          </ul>
        </div>
      </section>
      <!-- Available This Month -->
      <section class="o-section">
        <div class="o-container">
          <h2 class="h5">Available this month</h2>
          <ul class="o-grid o-grid--4-4-4@m">
            <CardAnimal
              v-for="animal in available.month"
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
import { mapState } from 'vuex';

import CardAnimal from '@/components/CardAnimal.vue';

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
  },

  computed: {
    ...mapState(['now']),

    available() {
      const availableNow = [];
      const availableThisMonth = [];

      const month = parseInt(format(this.now, 'M'), 10) - 1;
      const hour = parseInt(format(this.now, 'H'), 10);

      this.animals.forEach((animal) => {
        if (animal.months.indexOf(month) !== -1) {
          if (animal.hours.indexOf(hour) !== -1) {
            availableNow.push(animal);
          }
          availableThisMonth.push(animal);
        }
      });

      return { now: availableNow, month: availableThisMonth };
    },
  },
};
</script>
