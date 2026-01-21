<script setup>
import { ref } from 'vue';
import InputGroup from '../components/Input.vue';

// Order State
const order = ref({
  id: Date.now(), // Unique ID
  date: new Date().toISOString().split('T')[0],
  packageType: 'Box',
  weight: '',
  price: '',
  // Sender Object
  sender: { name: '', phone: '', address: '' },
  // Recipient Object
  recipient: { name: '', phone: '', address: '' },
  status: 'Pending'
});

const saveOrder = () => {
  // 1. Get existing orders from localStorage or start with empty array
  const existingOrders = JSON.parse(localStorage.getItem('delivery_orders') || '[]');

  // 2. Add current order to the list
  existingOrders.push(order.value);

  // 3. Save back to localStorage
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
          <span class="p-1.5 bg-orange-100 rounded text-orange-600">📦</span> Package Info
        </h2>

        <div class="mb-4">
          <label class="text-sm font-semibold text-gray-700">Package Type</label>
          <select v-model="order.packageType" class="w-full mt-1.5 p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
            <option>Box</option>
            <option>Envelope</option>
            <option>Electronic</option>
            <option>Fragile</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <InputGroup label="Weight (kg)" v-model="order.weight" placeholder="0.5" />
          <InputGroup label="Price ($)" v-model="order.price" placeholder="2.50" />
        </div>

        <InputGroup label="Delivery Date" type="date" v-model="order.date" />
      </div>

    </div>
  </div>
</template>