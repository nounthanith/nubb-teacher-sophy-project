<template>
  <div class="space-y-6 font-kantum">
    <div v-if="allOrders.length > 0" class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-slate-50 border-b border-slate-200">
        <tr>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">លេខសំគាល់</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">អ្នកផ្ញើរ / អ្នកទទួល</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ទីតាំងផ្ញើរ / ទទួល</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">កញ្ចប់ឥវ៉ាន់</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ស្ថានភាព</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">កាលបរិច្ឆេទ</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">សកម្មភាព</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
        <tr v-for="(order, index) in allOrders" :key="order.id" class="hover:bg-slate-50 transition-colors">
          <td class="px-6 py-4 text-sm font-medium text-blue-600">
            #{{ String(order.id).slice(-5) }}
          </td>

          <td class="px-6 py-4">
            <div class="text-sm font-bold text-slate-800">{{ order.sender.name }} → {{ order.recipient.name }}</div>
            <div class="text-xs text-slate-500 mt-1">
              📞 {{ order.sender.phone }} <span class="mx-1">|</span> {{ order.recipient.phone }}
            </div>
          </td>

          <td class="px-6 py-4 text-sm text-slate-600 max-w-[200px]">
            <div class="truncate" :title="order.sender.address + ' to ' + order.recipient.address">
              {{ order.sender.address }} → {{ order.recipient.address }}
            </div>
          </td>

          <td class="px-6 py-4 text-sm text-slate-700">
            <span class="font-medium">{{ order.packageType?.name || order.packageType }}</span>
            <span class="text-xs text-slate-400 ml-1">({{ order.weight }}kg)</span>
          </td>

          <td class="px-6 py-4">
            <select
                v-model="order.status"
                @change="updateStatus"
                :class="{
                  'bg-orange-100 text-orange-700': order.status === 'Pending',
                  'bg-blue-100 text-blue-700': order.status === 'Sending',
                  'bg-green-100 text-green-700': order.status === 'Delivered',
                  'bg-red-100 text-red-700': order.status === 'Cancelled'
                }"
                class="text-[11px] font-bold px-3 py-1.5 rounded-full border-none outline-none cursor-pointer appearance-none text-center min-w-[110px]"
            >
              <option value="Pending">⏳ រង់ចាំ</option>
              <option value="Sending">🚚 កំពុងដឹក</option>
              <option value="Delivered">✅ ជោគជ័យ</option>
              <option value="Cancelled">❌ បោះបង់</option>
            </select>
          </td>
          <td class="px-6 py-4 text-sm font-semibold" ><span class="bg-pink-200 text-pink-500 p-1.5 rounded-full">{{ order.date}}</span></td>
          <td class="px-6 py-4">
            <div class="flex justify-center items-center gap-3">
              <button @click="deleteOrder(index)" class="text-red-500 hover:text-red-700 transition" title="Delete">
                <span class="text-lg hover:underline">លុប</span>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="min-h-[70vh] flex flex-col items-center justify-center text-center animate-fade-in">
      <div class="bg-slate-100 p-8 rounded-full mb-6">
        <span class="text-6xl">📦</span>
      </div>
      <h3 class="text-2xl font-bold text-slate-800 font-kantum">មិនទាន់មានទិន្នន័យបញ្ញើនៅឡើយទេ</h3>
      <p class="text-slate-500 mt-2 mb-8">Sir, your delivery list is currently empty.</p>
      <router-link to="/order" class="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-200">
        + បង្កើតបញ្ញើថ្មី (Create Order)
      </router-link>
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

const updateStatus = () => {
  localStorage.setItem('delivery_orders', JSON.stringify(allOrders.value));
  console.log("Status updated and saved, Sir!");
};

const deleteOrder = (index) => {
  if (confirm("Are you sure you want to delete this order, Sir?")) {
    allOrders.value.splice(index, 1);
    localStorage.setItem('delivery_orders', JSON.stringify(allOrders.value));
  }
};

const editOrder = (order) => {
  localStorage.setItem('edit_order_data', JSON.stringify(order));
  router.push('/order');
};
</script>