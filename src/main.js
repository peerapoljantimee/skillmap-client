// src\main.js

// 📌 นำเข้า Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

// FontAwesome
import "@fortawesome/fontawesome-free/css/all.css";

// 📌 นำเข้า Vue และ App หลัก
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 📌 นำเข้า PrimeVue
import PrimeVue from "primevue/config";
import 'primeicons/primeicons.css'
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

// 📌 นำเข้า PrimeVue Components ที่ต้องใช้ (ตัวอย่าง)
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";



// ✅ สร้าง Vue App และใช้ PrimeVue
const app = createApp(App);
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{indigo.50}",
      100: "{indigo.100}",
      200: "{indigo.200}",
      300: "{indigo.300}",
      400: "{indigo.400}",
      500: "{indigo.500}",
      600: "{indigo.600}",
      700: "{indigo.700}",
      800: "{indigo.800}",
      900: "{indigo.900}",
      950: "{indigo.950}",
    },
  },
});

app.use(PrimeVue, {
  // Default theme configuration
  //   theme: {
  //     preset: Aura,
  //     options: {
  //       prefix: "p",
  //       // darkModeSelector: "system",
  //       darkModeSelector: false || 'none',
  //       cssLayer: false,
  //     },
//   },
   theme: {
      preset: MyPreset,
      options: {
         prefix: "p",
         darkModeSelector: false || 'none',
      }
   }
});

app.use(router);

// ✅ ลงทะเบียน PrimeVue Components (ถ้าต้องการใช้ในทุกที่)
app.component("Button", Button);
app.component("DataTable", DataTable);
app.component("Column", Column);

app.mount("#app");
