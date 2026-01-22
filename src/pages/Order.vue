<script setup>
import { ref } from 'vue';
import InputGroup from '../components/Input.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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
  if (!order.value.sender.name || !order.value.recipient.name ||
      !order.value.sender.phone || !order.value.recipient.phone ||
      !order.value.price) {

    toast.warn("សូមបំពេញព័តមានសិនមុនរក្សាទុក");
    return;
  }
  const existingOrders = JSON.parse(localStorage.getItem('delivery_orders') || '[]');

  existingOrders.push(order.value);

  localStorage.setItem('delivery_orders', JSON.stringify(existingOrders));

  toast.success("បង្កើតជោគជ័យ");
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

const provinces = ref([
  "ភ្នំពេញ (Phnom Penh)",
  "បាត់ដំបង (Battambang)",
  "សៀមរាប (Siem Reap)",
  "ព្រះសីហនុ (Preah Sihanouk)",
  "កណ្តាល (Kandal)",
  "កំពង់ចាម (Kampong Cham)",
  "កំពង់ឆ្នាំង (Kampong Chhnang)",
  "កំពង់ធំ (Kampong Thom)",
  "កំពង់ស្ពឺ (Kampong Speu)",
  "កំពត (Kampot)",
  "កែប (Kep)",
  "កោះកុង (Koh Kong)",
  "ក្រចេះ (Kratie)",
  "មណ្ឌលគីរី (Mondulkiri)",
  "ឧត្តរមានជ័យ (Oddar Meanchey)",
  "ប៉ៃលិន (Pailin)",
  "ព្រះវិហារ (Preah Vihear)",
  "ព្រៃវែង (Prey Veng)",
  "ពោធិ៍សាត់ (Pursat)",
  "រតនគីរី (Ratanakiri)",
  "ស្ទឹងត្រែង (Stung Treng)",
  "ស្វាយរៀង (Svay Rieng)",
  "តាកែវ (Takeo)",
  "ត្បូងឃ្មុំ (Tboung Khmum)",
  "ប៉ៃលិន (Pailin)",
  "បន្ទាយមានជ័យ (Banteay Meanchey)"
]);
</script>

<template>
  <div class="max-full mx-auto p-4 font-kantum">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-slate-800">បង្កើតបញ្ញើ</h1>
      <button @click="saveOrder" class="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 shadow-lg transition">
        + រក្សាទុក
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 class="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
          <span class="p-1.5 bg-blue-100 rounded text-blue-600">📤</span> ព័តមានអ្នកផ្ញើរ
        </h2>
        <InputGroup label="ព្រះនាមអ្នកផ្ញើរ" v-model="order.sender.name" placeholder="ឈ្មោះអ្នកផ្ញើរ" />
        <InputGroup label="លេខទូរស័ព្ទផ្ញើរ" v-model="order.sender.phone" placeholder="012..." />
        <div class="space-y-1">
          <label class="text-sm font-semibold text-slate-700 flex items-center gap-1">
            ទីតាំងផ្ញើរ
          </label>
          <div class="relative group">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            📍
          </span>
            <select
                v-model="order.recipient.address"
                required
                class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer font-kantum"
            >
              <option value="" disabled>--- សូមជ្រើសរើសខេត្ត/ក្រុង ---</option>
              <option v-for="province in provinces" :key="province" :value="province">
                {{ province }}
              </option>
            </select>
            <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              ▼
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 class="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
          <span class="p-1.5 bg-green-100 rounded text-green-600">📥</span> ព័តមានអ្នកួទទួល
        </h2>
        <InputGroup aria-required="true" label="ព្រះនាមអ្នកទទួល" v-model="order.recipient.name" placeholder="ឈ្មោះអ្នកទទួល" />
        <InputGroup label="លេខទូរស័ព្ទអ្នកទទួល" v-model="order.recipient.phone" placeholder="098..." />
        <div class="space-y-1">
          <label class="text-sm font-semibold text-slate-700 flex items-center gap-1">
            ទីតាំងទទួល
          </label>
          <div class="relative group">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            📍
          </span>
            <select
                v-model="order.recipient.address"
                required
                class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer font-kantum"
            >
              <option value="" disabled>--- សូមជ្រើសរើសខេត្ត/ក្រុង ---</option>
              <option v-for="province in provinces" :key="province" :value="province">
                {{ province }}
              </option>
            </select>
            <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              ▼
            </div>
          </div>
        </div>
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