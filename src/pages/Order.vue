<script setup>
import { ref, watch } from 'vue';
import InputGroup from '../components/Input.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const order = ref({
  id: Date.now(),
  date: new Date().toISOString().split('T')[0],
  packageType: 'Box',
  weight: '',
  price: '0.00',
  sender: { name: '', phone: '', address: '' },
  recipient: { name: '', phone: '', address: '' },
  status: 'Pending'
});

watch(() => order.value.weight, (newWeight) => {
  if (newWeight && newWeight > 0) {
    const calculated = (newWeight / 5).toFixed(2);
    order.value.price = calculated;
  } else {
    order.value.price = '0.00';
  }
});

const saveOrder = () => {
  if (!order.value.sender.name || !order.value.recipient.name ||
      !order.value.sender.address || !order.value.recipient.address ||
      !order.value.weight) {

    toast.warn("សូមបំពេញព័ត៌មានឱ្យបានគ្រប់គ្រាន់សិន!");
    return;
  }

  const existingOrders = JSON.parse(localStorage.getItem('delivery_orders') || '[]');
  existingOrders.push(order.value);
  localStorage.setItem('delivery_orders', JSON.stringify(existingOrders));

  toast.success("បង្កើតបញ្ញើជោគជ័យ! (Saved Successfully)");
  resetForm();
};

const resetForm = () => {
  order.value = {
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    packageType: 'Box',
    weight: '',
    price: '0.00',
    sender: { name: '', phone: '', address: '' },
    recipient: { name: '', phone: '', address: '' },
    status: 'Pending'
  };
};

const packageOptions = [
  { name: 'កេសឬប្រអប់', enName: 'Box', icon: '📦' },
  { name: 'ស្រោមសំបុត្រ', enName: 'Envelope', icon: '✉️' },
  { name: 'អីវ៉ាន់ងាយបែក', enName: 'Fragile', icon: '🍷' },
  { name: 'ឯកសារ', enName: 'Document', icon: '📄' },
  { name: 'គ្រឿងអេឡិចត្រូនិច', enName: 'Electronic', icon: '💻' }
];

const provinces = [
  "ភ្នំពេញ (Phnom Penh)", "បាត់ដំបង (Battambang)", "សៀមរាប (Siem Reap)",
  "ព្រះសីហនុ (Preah Sihanouk)", "កណ្តាល (Kandal)", "កំពង់ចាម (Kampong Cham)",
  "កំពង់ឆ្នាំង (Kampong Chhnang)", "កំពង់ធំ (Kampong Thom)", "កំពង់ស្ពឺ (Kampong Speu)",
  "កំពត (Kampot)", "កែប (Kep)", "កោះកុង (Koh Kong)", "ក្រចេះ (Kratie)",
  "មណ្ឌលគីរី (Mondulkiri)", "ប៉ៃលិន (Pailin)", "ព្រៃវែង (Prey Veng)",
  "ពោធិ៍សាត់ (Pursat)", "រតនគីរី (Ratanakiri)", "ស្វាយរៀង (Svay Rieng)", "តាកែវ (Takeo)"
];
</script>

<template>
  <div class=" mx-auto p-6 font-kantum">

    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-800">បង្កើតបញ្ញើថ្មី</h1>
        <p class="text-slate-500">Create a new delivery shipment</p>
      </div>
      <button @click="saveOrder" class="bg-blue-600 text-white px-10 py-3 rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 font-bold">
        + រក្សាទុកបញ្ញើ
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-lg font-bold flex items-center gap-2 text-slate-800 pb-2 border-b">
          <span class="p-2 bg-blue-50 rounded-lg text-blue-600">📤</span> ព័ត៌មានអ្នកផ្ញើរ
        </h2>
        <InputGroup label="ព្រះនាមអ្នកផ្ញើរ *" v-model="order.sender.name" placeholder="ឈ្មោះអ្នកផ្ញើរ" />
        <InputGroup label="លេខទូរស័ព្ទផ្ញើរ *" v-model="order.sender.phone" placeholder="012..." />

        <div class="space-y-1">
          <label class="text-sm font-semibold text-slate-700">ទីតាំងផ្ញើរ *</label>
          <div class="relative">
            <select v-model="order.sender.address" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none">
              <option value="" disabled>ជ្រើសរើសទីតាំង</option>
              <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
            </select>
            <span class="absolute right-3 top-3 text-slate-400 pointer-events-none">▼</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-lg font-bold flex items-center gap-2 text-slate-800 pb-2 border-b">
          <span class="p-2 bg-green-50 rounded-lg text-green-600">📥</span> ព័ត៌មានអ្នកទទួល
        </h2>
        <InputGroup label="ព្រះនាមអ្នកទទួល *" v-model="order.recipient.name" placeholder="ឈ្មោះអ្នកទទួល" />
        <InputGroup label="លេខទូរស័ព្ទអ្នកទទួល *" v-model="order.recipient.phone" placeholder="098..." />

        <div class="space-y-1">
          <label class="text-sm font-semibold text-slate-700">ទីតាំងទទួល *</label>
          <div class="relative">
            <select v-model="order.recipient.address" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none">
              <option value="" disabled>ជ្រើសរើសទីតាំង</option>
              <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
            </select>
            <span class="absolute right-3 top-3 text-slate-400 pointer-events-none">▼</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
        <h2 class="text-lg font-bold flex items-center gap-2 text-slate-800 pb-2 border-b">
          <span class="p-2 bg-orange-50 rounded-lg text-orange-600">📦</span> ព័ត៌មានអីវ៉ាន់
        </h2>

        <div>
          <label class="text-sm font-semibold text-slate-700">ប្រភេទអីវ៉ាន់</label>
          <select v-model="order.packageType" class="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
            <option v-for="item in packageOptions" :key="item.enName" :value="item.enName">
              {{ item.icon }} {{ item.name }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <InputGroup label="ទម្ងន់ (kg) *" type="number" v-model="order.weight" placeholder="0.0" />

          <div class="space-y-1">
            <label class="text-sm font-semibold text-slate-700">តម្លៃសរុប ($)</label>
            <div class="w-full p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 font-bold text-lg text-center">
              $ {{ order.price }}
            </div>
          </div>
        </div>

        <InputGroup label="ថ្ងៃដឹកជញ្ជូន" type="date" v-model="order.date" />
      </div>

    </div>
  </div>
</template>

