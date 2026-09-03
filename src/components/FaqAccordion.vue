<script setup>
import { ref } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true
  }
})

const activeIndex = ref(null)

function toggleItem(index) {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <div class="faq-accordion">
    <div 
      v-for="(item, idx) in items" 
      :key="idx" 
      class="faq-item"
      :class="{ 'active': activeIndex === idx }"
    >
      <button 
        type="button" 
        class="faq-question-btn" 
        :aria-expanded="activeIndex === idx"
        @click="toggleItem(idx)"
      >
        <span>{{ item.question }}</span>
        <span class="faq-toggle-icon" aria-hidden="true">{{ activeIndex === idx ? '−' : '+' }}</span>
      </button>
      <div class="faq-answer-panel" v-show="activeIndex === idx">
        <p>{{ item.answer }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border: 1px solid var(--border);
  border-radius: 4px;
  background: #ffffff;
  overflow: hidden;
  transition: var(--transition-base);
}

.faq-item.active {
  border-color: #d1c8c2;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
}

.faq-question-btn {
  width: 100%;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-align: left;
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--fg);
  font-weight: 500;
  transition: color 0.2s ease;
}

.faq-question-btn:hover {
  color: var(--accent);
}

.faq-toggle-icon {
  font-size: 1.35rem;
  line-height: 1;
  color: var(--accent);
  font-weight: 300;
  flex-shrink: 0;
}

.faq-answer-panel {
  padding: 0 1.5rem 1.35rem;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.7;
}
</style>
