<template>
  <div class="space-y-6 font-kantum">
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-slate-50 border-b border-slate-200">
        <tr>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">ID</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Sender / Recipient</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Package</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Actions</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
        <tr v-for="(order, index) in allOrders" :key="order.id" class="hover:bg-slate-50">
          <td class="px-6 py-4 text-sm font-medium">#{{ String(order.id).slice(-5) }}</td>
          <td class="px-6 py-4">
            <div class="text-sm font-semibold">{{ order.sender.name }} → {{ order.recipient.name }}</div>
          </td>
          <td class="px-6 py-4 text-sm">{{ order.packageType }} ({{ order.weight }}kg)</td>
          <td class="px-6 py-4">
               <span :class="order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'" class="px-2 py-1 rounded text-xs font-bold">
                 {{ order.status }}
               </span>
          </td>

          <td class="px-6 py-4 text-center">
            <div class="flex justify-center gap-2">
              <button @click="editOrder(order)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                ✏️
              </button>
              <button @click="deleteOrder(index)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                🗑️
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const allOrders = ref([]);
const router = useRouter();

onMounted(() => {
  loadOrders();
});

const loadOrders = () => {
  const data = localStorage.getItem('delivery_orders');
  allOrders.value = data ? JSON.parse(data) : [];
};

// DELETE FUNCTION
const deleteOrder = (index) => {
  if (confirm("Are you sure you want to delete this order, Sir?")) {
    allOrders.value.splice(index, 1); // Remove from array
    localStorage.setItem('delivery_orders', JSON.stringify(allOrders.value)); // Update localStorage
  }
};

// EDIT FUNCTION
const editOrder = (order) => {
  // We save the order we want to edit in a temporary "edit_mode" storage
  localStorage.setItem('edit_order_data', JSON.stringify(order));
  // Redirect to the Order form page
  router.push('/orders');
};
</script>