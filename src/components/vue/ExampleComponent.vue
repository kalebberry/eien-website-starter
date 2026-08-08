<template>
	<div class="card--bw flow" style="padding: 1.5rem; --space: 1.25rem;">
		<header class="repel" style="--gutter: 1rem;">
			<div>
				<h3 class="fs-step-2" style="margin: 0;">Vue 3 + Pinia Interactive Demo</h3>
				<p class="fs-step-00" style="opacity: 0.75; margin-top: 0.25rem;">
					Demonstrating local reactive state and Pinia store integration in Astro islands.
				</p>
			</div>
			<span class="tag" aria-pressed="true">Vue 3 Island</span>
		</header>

		<!-- 1. Local State Example -->
		<div class="card--bw flow" style="padding: 1rem; --space: 0.75rem;">
			<h4 class="fs-step-0" style="margin: 0; font-weight: 600;">1. Local Component State (<code>ref</code> & <code>computed</code>)</h4>
			<div class="cluster" style="--gutter: 1rem; align-items: center;">
				<button class="btn btn--sm" @click="decrementCount">-</button>
				<span class="fs-step-1" style="font-weight: 700; min-width: 3ch; text-align: center;">{{ count }}</span>
				<button class="btn btn--sm" @click="incrementCount">+</button>
				<span class="fs-step-00" style="opacity: 0.75;">(Double: {{ doubleCount }})</span>
			</div>
		</div>

		<!-- 2. Pinia Store Example -->
		<div class="card--bw flow" style="padding: 1rem; --space: 0.75rem;">
			<h4 class="fs-step-0" style="margin: 0; font-weight: 600;">2. Global Pinia Store (<code>useTransactionsStore</code>)</h4>
			
			<div class="repel" style="--gutter: 1rem;">
				<div>
					<p class="fs-step-00" style="opacity: 0.75; margin: 0;">Current Balance</p>
					<p class="fs-step-3" style="font-weight: 700; margin: 0;">
						${{ transactionsStore.balance.toFixed(2) }}
					</p>
				</div>
				<div class="cluster" style="--gutter: 1.5rem;">
					<div>
						<p class="fs-step-00" style="opacity: 0.75; margin: 0;">Income</p>
						<p class="fs-step-0" style="font-weight: 600; color: #22c55e; margin: 0;">
							+${{ transactionsStore.totalIncome.toFixed(2) }}
						</p>
					</div>
					<div>
						<p class="fs-step-00" style="opacity: 0.75; margin: 0;">Expenses</p>
						<p class="fs-step-0" style="font-weight: 600; color: #ef4444; margin: 0;">
							-${{ transactionsStore.totalExpenses.toFixed(2) }}
						</p>
					</div>
				</div>
			</div>

			<form @submit.prevent="handleAddTransaction" class="cluster" style="--gutter: 0.5rem; align-items: flex-end;">
				<div style="flex: 1; min-width: 130px;">
					<label class="fs-step-00" style="display: block; margin-bottom: 0.25rem;">Merchant / Item</label>
					<input 
						v-model="merchant" 
						type="text" 
						placeholder="e.g. Coffee" 
						required 
						class="btn btn--ghost" 
						style="width: 100%; text-align: left; background: var(--background); color: var(--foreground); border: 1px solid var(--border-weak);"
					/>
				</div>
				<div style="width: 100px;">
					<label class="fs-step-00" style="display: block; margin-bottom: 0.25rem;">Amount ($)</label>
					<input 
						v-model.number="amount" 
						type="number" 
						step="0.01" 
						min="0.01" 
						required 
						class="btn btn--ghost" 
						style="width: 100%; text-align: left; background: var(--background); color: var(--foreground); border: 1px solid var(--border-weak);"
					/>
				</div>
				<div style="width: 110px;">
					<label class="fs-step-00" style="display: block; margin-bottom: 0.25rem;">Type</label>
					<select 
						v-model="type" 
						class="btn btn--ghost" 
						style="width: 100%; background: var(--background); color: var(--foreground); border: 1px solid var(--border-weak);"
					>
						<option value="income">Income</option>
						<option value="expense">Expense</option>
					</select>
				</div>
				<button type="submit" class="btn btn--primary" style="margin-top: 0.25rem;">Add</button>
			</form>

			<div v-if="transactionsStore.transactions.length > 0" class="flow" style="--space: 0.5rem; margin-top: 0.5rem;">
				<div class="repel" style="align-items: center;">
					<p class="fs-step-00" style="font-weight: 600; opacity: 0.75; margin: 0;">Recent Activity:</p>
					<button 
						type="button" 
						class="btn btn--sm btn--ghost" 
						style="padding: 0.15rem 0.5rem; font-size: 0.75rem;" 
						@click="transactionsStore.clearTransactions"
					>
						Clear All
					</button>
				</div>
				<ul class="flow" style="list-style: none; padding: 0; margin: 0; --space: 0.25rem;">
					<li 
						v-for="txn in transactionsStore.transactions.slice(-5).reverse()" 
						:key="txn.id"
						class="repel"
						style="padding: 0.4rem 0.6rem; border-radius: 0.25rem; background: rgba(255,255,255,0.04); font-size: 0.875rem; align-items: center;"
					>
						<span>{{ txn.merchant }}</span>
						<div class="cluster" style="--gutter: 0.5rem; align-items: center;">
							<span :style="{ color: txn.type === 'income' ? '#22c55e' : '#ef4444', fontWeight: '600' }">
								{{ txn.type === 'income' ? '+' : '-' }}${{ txn.amount.toFixed(2) }}
							</span>
							<button 
								type="button" 
								aria-label="Remove item" 
								style="background: transparent; border: none; color: var(--muted); cursor: pointer; padding: 0 0.2rem; font-size: 1rem;" 
								@click="transactionsStore.removeTransaction(txn.id)"
							>
								&times;
							</button>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTransactionsStore } from '@/stores/useTransactionsStore';

// 1. Local Reactive State
const count = ref(0);
const doubleCount = computed(() => count.value * 2);

const incrementCount = () => count.value++;
const decrementCount = () => count.value--;

// 2. Pinia Store Integration
const transactionsStore = useTransactionsStore();

const merchant = ref('');
const amount = ref<number | ''>('');
const type = ref<'income' | 'expense'>('expense');

onMounted(() => {
	transactionsStore.loadFromStorage();
});

const handleAddTransaction = () => {
	if (!merchant.value || !amount.value || amount.value <= 0) return;

	transactionsStore.addTransaction({
		merchant: merchant.value,
		amount: Number(amount.value),
		type: type.value,
		category: type.value === 'income' ? 'Earnings' : 'General',
		date: new Date().toISOString().split('T')[0],
	});

	merchant.value = '';
	amount.value = '';
};
</script>
