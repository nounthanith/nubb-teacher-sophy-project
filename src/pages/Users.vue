<template>
  <div class="p-6 font-kantum relative overflow-hidden min-h-screen">

    <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">គ្រប់គ្រងបុគ្គលិក (Staff Management)</h1>
        <p class="text-sm text-slate-500">បន្ថែម ឬកែប្រែព័ត៌មានបុគ្គលិកនៅទីនេះ</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
              v-model="searchQuery"
              type="text"
              placeholder="ស្វែងរកឈ្មោះ ឬអ៊ីមែល..."
              class="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 w-64 text-sm transition-all"
          />
        </div>

        <button
            @click="openPanel('add')"
            class="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all active:scale-95"
        >
          + បន្ថែមបុគ្គលិក
        </button>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-slate-50 border-b border-slate-200">
        <tr>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">ឈ្មោះ / តួនាទី</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">អ៊ីមែល / ទូរស័ព្ទ</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">អាសយដ្ឋាន</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">សកម្មភាព</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
        <tr v-for="user in filteredUsers" :key="user.email" class="hover:bg-slate-50/50 transition-colors">
          <td class="px-6 py-4">
            <div class="font-bold text-slate-800">{{ user.name }}</div>
            <div :class="user.role === 'admin' ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-slate-500 bg-slate-100 border-slate-200'" class="text-[10px] px-2 py-0.5 rounded-full border inline-block font-bold uppercase mt-1">
              {{ user.role }}
            </div>
          </td>
          <td class="px-6 py-4 text-sm text-slate-600">
            <div class="font-medium text-slate-700">{{ user.email }}</div>
            <div class="text-xs text-slate-400">{{ user.phone }}</div>
          </td>
          <td class="px-6 py-4 text-sm text-slate-500 italic">{{ user.address }}</td>
          <td class="px-6 py-4 text-center">
            <div class="flex justify-center gap-3">
              <button @click="openPanel('edit', user)" class="text-blue-600 hover:text-blue-800 font-bold text-sm">កែប្រែ</button>
              <button @click="removeUser(user.email)" class="text-red-500 hover:text-red-700 font-bold text-sm">លុប</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>

      <div v-if="filteredUsers.length === 0" class="p-12 text-center text-slate-400">
        <p>មិនមានបុគ្គលិកឈ្មោះនេះទេ បាទលោកគ្រូ! (No records found)</p>
      </div>
    </div>

    <div v-if="isPanelOpen" @click="closePanel" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"></div>

    <aside
        :class="isPanelOpen ? 'translate-x-0' : 'translate-x-full'"
        class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out border-l border-slate-200"
    >
      <div class="p-6 flex flex-col h-full overflow-y-auto">
        <div class="flex justify-between items-center mb-8 pb-4 border-b">
          <h2 class="text-xl font-bold text-slate-800">{{ mode === 'add' ? 'ចុះឈ្មោះបុគ្គលិកថ្មី' : 'កែប្រែទិន្នន័យបុគ្គលិក' }}</h2>
          <button @click="closePanel" class="text-slate-400 hover:text-slate-600 text-xl">✕</button>
        </div>

        <div class="space-y-5">
          <div>
            <label class="text-sm font-bold text-slate-700">ឈ្មោះបុគ្គលិក *</label>
            <input v-model="form.name" type="text" class="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="បញ្ចូលឈ្មោះ..." />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-bold text-slate-700">អ៊ីមែល *</label>
              <input v-model="form.email" type="email" class="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="example@mail.com" />
            </div>
            <div>
              <label class="text-sm font-bold text-slate-700">ពាក្យសម្ងាត់ *</label>
              <input v-model="form.password" type="password" class="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="******" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-bold text-slate-700">លេខទូរស័ព្ទ</label>
              <input v-model="form.phone" type="text" class="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="+855..." />
            </div>
            <div>
              <label class="text-sm font-bold text-slate-700">តួនាទី (Role)</label>
              <select v-model="form.role" class="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>

          <div>
            <label class="text-sm font-bold text-slate-700">អាសយដ្ឋាន</label>
            <input v-model="form.address" type="text" class="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="ខេត្ត/ក្រុង..." />
          </div>
        </div>

        <div class="pt-8 flex gap-3 mt-auto">
          <button @click="closePanel" class="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition">បោះបង់</button>
          <button @click="handleSubmit" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
            {{ mode === 'add' ? 'រក្សាទុក' : 'ធ្វើបច្ចុប្បន្នភាព' }}
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { toast } from 'vue3-toastify';
import userData from "../utils/userData.js";

const users = ref([...(userData || [])]);

const isPanelOpen = ref(false);
const mode = ref('add');
const searchQuery = ref('');

const form = ref({
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  role: 'staff'
});

let editingEmail = null;

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;

  const query = searchQuery.value.toLowerCase();
  return users.value.filter(u =>
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query)
  );
});

const openPanel = (type, data = null) => {
  mode.value = type;
  if (type === 'edit' && data) {
    form.value = { ...data };
    editingEmail = data.email;
  } else {
    form.value = { name: '', email: '', password: '', phone: '', address: '', role: 'staff' };
    editingEmail = null;
  }
  isPanelOpen.value = true;
};

const closePanel = () => {
  isPanelOpen.value = false;
};

const handleSubmit = () => {
  if (!form.value.name || !form.value.email || !form.value.password) {
    toast.error("សូមបំពេញឈ្មោះ អ៊ីមែល និងពាក្យសម្ងាត់ បាទលោកគ្រូ!");
    return;
  }

  if (mode.value === 'add') {
    const exists = users.value.some(u => u.email === form.value.email);
    if (exists) {
      toast.warn("អ៊ីមែលនេះមានរួចហើយ!");
      return;
    }

    users.value.unshift({ ...form.value });
    toast.success("បន្ថែមបុគ្គលិកថ្មីជោគជ័យ!");
  } else {
    // Update existing user
    const idx = users.value.findIndex(u => u.email === editingEmail);
    if (idx !== -1) {
      users.value[idx] = { ...form.value };
      toast.info("កែប្រែព័ត៌មានជោគជ័យ!");
    }
  }
  closePanel();
};

const removeUser = (email) => {
  if (confirm("តើលោកគ្រូពិតជាចង់លុបបុគ្គលិកនេះមែនទេ? (Are you sure, Sir?)")) {
    users.value = users.value.filter(u => u.email !== email);
    toast.success("លុបបុគ្គលិកចេញរួចរាល់!");
  }
};
</script>
