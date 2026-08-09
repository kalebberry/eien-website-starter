<template>
	<div class="vue-demo-container flow">
		<div class="grid demo-grid" data-cols="2">
			<!-- 1. Local State Example -->
			<div class="demo-block flow">
				<h3 class="fs-step-1 block-title">1. Local Component State (<code>ref</code> & <code>computed</code>)</h3>
				<p class="fs-step-00 block-desc">Simple reactive counter using local Vue composition API state.</p>
				
				<div class="cluster counter-controls">
					<button class="btn btn--sm" @click="decrementCount" aria-label="Decrement count">-</button>
					<span class="fs-step-3 count-display">{{ count }}</span>
					<button class="btn btn--sm" @click="incrementCount" aria-label="Increment count">+</button>
					<span class="fs-step-0 computed-text">Computed double: <strong>{{ doubleCount }}</strong></span>
				</div>
			</div>

			<!-- 2. Pinia Store Example Summary -->
			<div class="demo-block flow">
				<h3 class="fs-step-1 block-title">2. Global Pinia Store Overview</h3>
				<div class="repel balance-summary">
					<div>
						<p class="fs-step-00 balance-label">Current Balance</p>
						<p class="fs-step-4 balance-value">
							${{ transactionsStore.balance.toFixed(2) }}
						</p>
					</div>
					<div class="cluster totals-cluster">
						<div>
							<p class="fs-step-00 balance-label">Total Income</p>
							<p class="fs-step-1 income-value">
								+${{ transactionsStore.totalIncome.toFixed(2) }}
							</p>
						</div>
						<div>
							<p class="fs-step-00 balance-label">Total Expenses</p>
							<p class="fs-step-1 expense-value">
								-${{ transactionsStore.totalExpenses.toFixed(2) }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Transaction Input & Activity List -->
		<div class="demo-block demo-block--lg flow">
			<h3 class="fs-step-1 block-title">Add Transaction to Store</h3>

			<form @submit.prevent="handleAddTransaction" class="cluster transaction-form">
				<div class="form-group-merchant">
					<label class="fs-step-00 form-label">Merchant / Item</label>
					<input 
						v-model="merchant" 
						type="text" 
						placeholder="e.g. Coffee" 
						required 
						class="input-field"
					/>
				</div>
				<div class="form-group-amount">
					<label class="fs-step-00 form-label">Amount ($)</label>
					<input 
						v-model.number="amount" 
						type="number" 
						step="0.01" 
						min="0.01" 
						required 
						class="input-field"
					/>
				</div>
				<div class="form-group-type">
					<label class="fs-step-00 form-label">Type</label>
					<select 
						v-model="type" 
						class="input-field"
					>
						<option value="expense">Expense</option>
						<option value="income">Income</option>
					</select>
				</div>
				<button type="submit" class="btn btn--primary submit-btn">Add</button>
			</form>

			<div v-if="transactionsStore.transactions.length > 0" class="activity-section flow">
				<div class="repel activity-header">
					<p class="fs-step-00 activity-title">Recent Store Activity</p>
					<button 
						type="button" 
						class="btn btn--sm btn--ghost clear-btn" 
						@click="transactionsStore.clearTransactions"
					>
						Clear All
					</button>
				</div>
				<ul class="activity-list flow">
					<li 
						v-for="txn in transactionsStore.transactions.slice(-5).reverse()" 
						:key="txn.id"
						class="repel transaction-item"
					>
						<span class="merchant-name">{{ txn.merchant }}</span>
						<div class="cluster item-cluster">
							<span :class="txn.type === 'income' ? 'amount-income' : 'amount-expense'">
								{{ txn.type === 'income' ? '+' : '-' }}${{ txn.amount.toFixed(2) }}
							</span>
							<button 
								type="button" 
								aria-label="Remove item" 
								class="remove-btn" 
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

<style scoped>
.vue-demo-container {
	--space: 2rem;
}

.demo-grid {
	--gutter: 2rem;
	--grid-min-item-size: 18rem;
}

.demo-block {
	--space: 1rem;
	padding: 1.5rem;
	border-radius: 0.75rem;
	border: 1px solid var(--border-weak);
}

.demo-block--lg {
	--space: 1.5rem;
	padding: 1.75rem;
}

.block-title {
	margin: 0;
	font-weight: 700;
}

.block-desc {
	opacity: 0.7;
	margin: 0;
}

.counter-controls {
	--gutter: 1.25rem;
	align-items: center;
	padding-top: 0.5rem;
}

.count-display {
	font-weight: 800;
	min-width: 2.5ch;
	text-align: center;
}

.computed-text {
	opacity: 0.75;
	margin-left: 0.5rem;
}

.balance-summary {
	--gutter: 1.5rem;
	align-items: flex-end;
	padding-top: 0.25rem;
}

.balance-label {
	opacity: 0.7;
	margin: 0;
}

.balance-value {
	font-weight: 800;
	margin: 0.25rem 0 0 0;
}

.totals-cluster {
	--gutter: 1.5rem;
}

.income-value {
	font-weight: 700;
	color: #22c55e;
	margin: 0.25rem 0 0 0;
}

.expense-value {
	font-weight: 700;
	color: #ef4444;
	margin: 0.25rem 0 0 0;
}

.transaction-form {
	--gutter: 1rem;
	align-items: flex-end;
}

.form-group-merchant {
	flex: 2;
	min-width: 160px;
}

.form-group-amount,
.form-group-type {
	flex: 1;
	min-width: 120px;
}

.form-label {
	display: block;
	margin-bottom: 0.4rem;
	font-weight: 600;
}

.submit-btn {
	padding-inline: 1.5rem;
}

.input-field {
	width: 100%;
	padding: 0.6rem 0.9rem;
	border-radius: 0.5rem;
	border: 1px solid var(--border-weak);
	background: var(--background);
	color: var(--text);
	font-family: inherit;
	font-size: 0.9rem;
	transition: border-color 0.2s ease;
}

.input-field:focus {
	outline: none;
	border-color: var(--text);
}

.activity-section {
	--space: 1rem;
	margin-top: 1.5rem;
	border-top: 1px solid var(--border-weak);
	padding-top: 1.25rem;
}

.activity-header {
	align-items: center;
	margin-bottom: 0.85rem;
}

.activity-title {
	font-weight: 700;
	opacity: 0.85;
	margin: 0;
}

.clear-btn {
	padding: 0.3rem 0.75rem;
	font-size: 0.75rem;
}

.activity-list {
	list-style: none;
	padding: 0;
	margin: 0;
	--space: 0.65rem;
}

.transaction-item {
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;
	background: rgba(125, 125, 125, 0.05);
	font-size: 0.9rem;
	align-items: center;
}

.merchant-name {
	font-weight: 500;
}

.item-cluster {
	--gutter: 0.75rem;
	align-items: center;
}

.amount-income {
	color: #22c55e;
	font-weight: 700;
}

.amount-expense {
	color: #ef4444;
	font-weight: 700;
}

.remove-btn {
	background: transparent;
	border: none;
	color: var(--muted);
	cursor: pointer;
	padding: 0 0.25rem;
	font-size: 1.1rem;
	line-height: 1;
	transition: color 0.2s ease;
}

.remove-btn:hover {
	color: #ef4444;
}
</style>
