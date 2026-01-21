<script setup>
import { ref } from 'vue';
import InputGroup from '../components/Input.vue';

const order = ref({
  id: Date.now(),
  date: new Date().toISOString().split('T')[0],
  packageType: 'Box',
  weight: '',
  price: '',
  sender: { name: '', phone: '', address: '' },
  recipient: { name: '', phone: '', address: '' },
  status: 'Pending'
});

const saveOrder = () => {
  const existingOrders = JSON.parse(localStorage.getItem('delivery_orders') || '[]');

  existingOrders.push(order.value);

  localStorage.setItem('delivery_orders', JSON.stringify(existingOrders));

  alert("Order Saved to LocalStorage, Sir!");
  resetForm();
};

const resetForm = () => {
  order.value = {
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    packageType: 'Box',
    weight: '',
    price: '',
    sender: { name: '', phone: '', address: '' },
    recipient: { name: '', phone: '', address: '' },
    status: 'Pending'
  };
};

const packageOptions = ref([
  { id: 1, name: 'កេសឬប្រអប់', enName: 'Box', icon: '📦' },
  { id: 2, name: 'ស្រោមសំបុត្រ', enName: 'Envelope', icon: '✉️' },
  { id: 3, name: 'អីវ៉ាន់ងាយបែក', enName: 'Fragile', icon: '🍷' },
  { id: 4, name: 'ឯកសារ', enName: 'Document', icon: '📄' },
  { id: 5, name: 'គ្រឿងអេឡិចត្រូនិច', enName: 'Electronic', icon: '💻' }
]);
</script>

<template>
  <div class="max-full mx-auto p-4 font-kantum">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-slate-800">New Delivery Order</h1>
      <button @click="saveOrder" class="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 shadow-lg transition">
        Save & Print Label
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 class="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
          <span class="p-1.5 bg-blue-100 rounded text-blue-600">📤</span> ព័តមានអ្នកផ្ញើរ
        </h2>
        <InputGroup label="ព្រះនាមអ្នកផ្ញើរ" v-model="order.sender.name" placeholder="ឈ្មោះអ្នកផ្ញើរ" />
        <InputGroup label="លេខទូរស័ព្ទផ្ញើរ" v-model="order.sender.phone" placeholder="012..." />
        <InputGroup label="ទីតាំងផ្ញើរ" v-model="order.sender.address" placeholder="ភ្នំពេញ..." />
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 class="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
          <span class="p-1.5 bg-green-100 rounded text-green-600">📥</span> ព័តមានអ្នកួទទួល
        </h2>
        <InputGroup label="ព្រះនាមអ្នកទទួល" v-model="order.recipient.name" placeholder="ឈ្មោះអ្នកទទួល" />
        <InputGroup label="លេខទូរស័ព្ទអ្នកទទួល" v-model="order.recipient.phone" placeholder="098..." />
        <InputGroup label="ទីតាំងទទួល" v-model="order.recipient.address" placeholder="បាត់ដំបង..." />
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 class="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
          <span class="p-1.5 bg-orange-100 rounded text-orange-600">📦</span> ព័តមានរបស់ឥវ៉ាន់
        </h2>

        <div class="mb-4">
          <label class="text-sm font-semibold text-gray-700">ប្រភេទឥតវ៉ាន់</label>
          <div class="mb-4">
            <select
                v-model="order.packageType"
                class="w-full mt-1.5 p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="item in packageOptions" :key="item" :value="item">
                {{item.icon}} {{ item.name }} / {{item.enName}}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <InputGroup label="ទម្ងន់ (kg)" v-model="order.weight" placeholder="0.5" />
          <InputGroup label="តម្លៃ ($)" v-model="order.price" placeholder="2.50" />
        </div>

        <InputGroup label="ថ្ងៃដឹកជញ្ជូន" type="date" v-model="order.date" />
      </div>

    </div>
  </div>
</template>