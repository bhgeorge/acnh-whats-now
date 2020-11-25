<template>
  <ul class="o-list-inline u-m-top-s">
    <li
      v-for="(val, key) in filters"
      :key="key"
      class="o-list-inline__item"
    >
      <button
        type="button"
        :name="`filter_${key}`"
        @click="emitFilter(key)"
        :class="{ 'active': active === key }"
        class="c-filter"
      >
        {{ val.text }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      default: '',
    },

    filters: {
      type: Object,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
  },

  methods: {
    emitFilter(key) {
      this.$emit('emitFilter', { type: this.type, key });
    },
  },
};
</script>
