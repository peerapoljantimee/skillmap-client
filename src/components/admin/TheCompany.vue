<!-- src/components/admin/TheCompany.vue -->
<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <!-- Sidebar -->
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
        <TheSidebar />
      </div>
      <!-- ส่วนของเนื้อหา -->
      <div class="col py-3">
        <h1 class="fw-bold h1 mb-4" style="color: #2a2d65">จัดการข้อมูลบริษัท</h1>

        <!-- Company DataTable -->
        <div class="card">
          <div class="card-body">
            <!-- Header -->
            <div class="d-flex justify-content-between mb-3">
              <!-- ส่วนค้นหา -->
              <div class="d-flex align-items-center">
                <span class="p-input-icon-left me-3">
                  <IconField>
                     <InputIcon class="pi pi-search" />
                     <InputText v-model="filters.global.value" placeholder="ค้นหา" class="p-inputtext-sm" />
                  </IconField>
                </span>
              </div>
              <!-- ปุ่มเปิดหน้าเพิ่มบริษัทใหม่ Add Company Dialog -->
              <div class="mb-4">
                <Button label="เพิ่มบริษัทใหม่" icon="pi pi-plus" @click="openNewCompany" class="p-button-success" />
              </div>
            </div>
            
            <!-- DataTable เเสดงรายการบริษัท -->
            <DataTable 
              :value="company" 
              :paginator="true" 
              :rows="10"
              :rowsPerPageOptions="[5, 10, 25, 50, 100]"
              dataKey="company_id"
              :filters="filters"
              filterDisplay="menu"
              :loading="companyLoading"
              responsiveLayout="scroll"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="แสดง {first} ถึง {last} จากทั้งหมด {totalRecords} รายการ"              
              stripedRows
              sortMode="multiple"
              :globalFilterFields="['company_id', 'name', 'industry', 'company_size']"
            >
              <!-- คอลัมน์ ID -->
              <Column field="company_id" header="รหัส" sortable style="min-width: 5rem"></Column>
              <Column field="name" header="บริษัท" sortable style="min-width: 14rem">
                <template #body="slotProps">
                  <div class="d-flex flex-column">
                    <span class="fw-bold text-primary">{{ slotProps.data.name }}</span>
                    <span class="small" v-if="slotProps.data.short_name">{{ slotProps.data.short_name }}</span>
                  </div>
                </template>
              </Column>

              <!-- คอลัมน์หมวดหมู่อุตสาหกรรม -->
              <Column field="industry" header="อุตสาหกรรม" sortable style="min-width: 12rem">
               <template #body="slotProps">
                  <span>{{ slotProps.data.industry || 'N/A' }}</span>
               </template>
              </Column>

              <!-- คอลัมน์จำเเนกขนาดบริษัท -->
              <Column field="company_size" header="ขนาดบริษัท" sortable style="min-width: 12rem">
               <template #body="slotProps">
                  <span>{{ slotProps.data.company_size || 'N/A' }}</span>
               </template>
              </Column>

              <!-- คอลั้มจำนวนงานที่เปิดรับสมัคร -->
              <Column field="count_jobs" header="จำนวนงาน" sortable style="min-width: 12rem"></Column>
              <Column field="verified" header="สถานะ" sortable style="min-width: 8rem">
                <template #body="slotProps">
                  <Tag :value="slotProps.data.verified === 1 ? 'ยืนยันแล้ว' : 'ยังไม่ยืนยัน'" 
                       :severity="slotProps.data.verified === 1 ? 'success' : 'danger'" />
                </template>
              </Column>
              
              <!-- แสดงเมื่อไม่พบข้อมูล -->
              <template #empty>
                <div class="text-center py-5">
                  <div class="mb-3"><i class="pi pi-inbox" style="font-size: 2rem"></i></div>
                  <div>ไม่พบข้อมูลบริษัท</div>
                </div>
              </template>

              <!-- แสดงสถานะกำลังโหลด -->
              <template #loading>
                <div class="text-center py-5">
                  <div class="mb-3"><i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i></div>
                  <div>กำลังโหลดข้อมูล...</div>
                </div>
              </template>
            </DataTable>
          </div>
        </div>

        <!-- เพื่มรายละเอียดบริษัท Company Dialog -->
        <Dialog v-model:visible="companyDialog" :style="{width: '600px'}" header="รายละเอียดบริษัท" :modal="true" class="p-fluid">     
          <Form @submit="insertCompany">
            <div class="row mb-3">
              <div class="field mb-3">
                <div class="row align-items-center">
                  <div class="col-sm-3">
                    <div class="d-flex align-items-center justify-content-between">
                      <label class="form-label fw-bold">
                        <span v-if="insertCompanySubmitted && !initialValues.name" class="text-danger">ชื่อบริษัท (จำเป็นต้องระบุ)</span>
                        <span v-else>ชื่อบริษัท <span class="text-danger">*</span></span>
                      </label>
                    </div>
                  </div>
                  <div class="col-sm-9">
                    <InputText v-model="initialValues.name" class="w-100" :invalid="insertCompanySubmitted && !initialValues.name" placeholder="ระบุชื่อของบริษัท"/>
                  </div>
                </div>
              </div>

              <div class="field mb-3">
                <div class="row align-items-center">
                  <div class="col-sm-3">
                    <label class="form-label fw-bold" for="short_name">ชื่อย่อ</label>
                  </div>
                  <div class="col-sm-9">
                    <InputText v-model="initialValues.short_name" name="short_name" class="w-100" placeholder="ระบุอักษรชื่อย่อของบริษัท" />
                  </div>
                </div>
              </div>

              <div class="field mb-3">
                <div class="row align-items-center">
                  <div class="col-sm-3">
                    <label class="form-label fw-bold" for="industry">อุตสาหกรรม</label>
                  </div>
                  <div class="col-sm-9"> 
                    <Select
                      v-model="initialValues.industry"  
                      name="industry"
                      :options="industries"
                      optionLabel="name"
                      placeholder="เลือกอุตสาหกรรม"
                      filter
                      :loading="industriesLoading" 
                      class="w-100"
                    />
                  </div>
                </div>
              </div>

              <div class="field mb-3">
                <div class="row align-items-center">
                  <div class="col-sm-3">
                    <label class="form-label fw-bold" for="company_size">ขนาดบริษัท</label>
                  </div>
                  <div class="col-sm-9">   
                    <Select
                      v-model="initialValues.company_size"   
                      name="company_size"
                      :options="companySizes"
                      optionLabel="name"
                      placeholder="เลือกขนาดบริษัท"
                      :loading="companySizesLoading"           
                      
                      class="w-100"
                    />
                  </div>
                </div>
              </div>

              <div class="field mb-3">
                <div class="row align-items-center">
                  <div class="col-sm-3">
                    <label class="form-label fw-bold" for="company_search_url">URL ค้นหาบริษัท</label>
                  </div>
                  <div class="col-sm-9">
                    <InputText v-model="initialValues.company_search_url" name="company_search_url" id="company_search_url" class="w-100" placeholder="ระบุชื่อ URL สำหรับค้นหาบริษัท"/>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end mt-4">
                <Button type="button" label="ยกเลิก" icon="pi pi-times" class="p-button-text" @click="closeCompanyDialog" />
                <Button type="submit" label="บันทึก" icon="pi pi-check" class="p-button-text" />
              </div>
            </div>
          </Form>
        </Dialog>

        <!-- Notification Dialog -->
        <Dialog v-model:visible="notificationDialog.visible" :style="{ width: '350px' }" :header="notificationDialog.header" :modal="true">
          <div class="d-flex align-items-center">
            <i :class="notificationDialog.icon" class="me-2" style="font-size: 1.5rem" />
            <span>{{ notificationDialog.message }}</span>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <Button label="ตกลง" @click="closeNotification" autofocus />
          </div>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import TheSidebar from "@/components/admin/TheSidebar.vue";
import axios from "axios";
import { ref, onMounted, reactive } from "vue";

// นำเข้า PrimeVue Components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';
import { FilterMatchMode } from "@primevue/core/api";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Select from 'primevue/select';
import { Form } from '@primevue/forms';
import Message from 'primevue/message';

export default {
  name: "TheCompany",
  components: {
    TheSidebar,
    DataTable,
    Column,
    Button,
    InputText,
    Dialog,
    Tag,
    IconField,
    InputIcon,
    Select,
    Form,
    Message,
  },

  setup() {
    // ข้อมูลบริษัท
    const company = ref([]);
    const companyLoading = ref(false);
    // ประเภทอุตสาหกรรม
    const industries = ref([]);
    const industriesLoading = ref(true);
    // ขนาดบริษัท
    const companySizes = ref([]);
    const companySizesLoading = ref(true);
    
    // ตัวเเปรสำหรับ Dialog เปิดเพิ่มข้อมูลบริษัท
    const companyDialog = ref(false);

    // ค่าเริ่มต้นสำหรับฟอร์ม PrimeVue
    const initialValues = ref({
      company_id: null,
      name: null,
      short_name: null,
      industry: null,
      verified: 0,
      company_search_url: null,
      company_size: null,
      registration_date: null
    });
    const insertCompanySubmitted = ref(false);
    
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    // ตัวแปรสำหรับ Notification Dialog
    const notificationDialog = reactive({
      visible: false,
      header: '',
      message: '',
      icon: '',
      callback: null // ฟังก์ชันที่จะเรียกหลังจากปิด notification
    });

    // resolver สำหรับตรวจสอบข้อมูล
    const resolver = ({ values }) => {
      const errors = {
        name: [],
      };

      // ตรวจสอบชื่อบริษัท
      if (!values.name || values.name.trim() === '') {
        errors.name.push({ type: 'required', message: 'กรุณาระบุชื่อบริษัท' });
      }

      return {
        values,
        errors
      };
    };

    // แสดง Notification แทน Toast
    const showNotification = (type, header, message, callback = null) => {
      notificationDialog.visible = true;
      notificationDialog.header = header;
      notificationDialog.message = message;
      notificationDialog.callback = callback;
      
      // กำหนด icon ตาม type
      switch (type) {
        case 'success':
          notificationDialog.icon = 'pi pi-check-circle text-success';
          break;
        case 'error':
          notificationDialog.icon = 'pi pi-times-circle text-danger';
          break;
        case 'warning':
          notificationDialog.icon = 'pi pi-exclamation-triangle text-warning';
          break;
        case 'info':
          notificationDialog.icon = 'pi pi-info-circle text-info';
          break;
        default:
          notificationDialog.icon = 'pi pi-info-circle';
      }
    };

    // ปิด Notification Dialog
    const closeNotification = () => {
      notificationDialog.visible = false;
      if (typeof notificationDialog.callback === 'function') {
        notificationDialog.callback();
      }
    };

    // ฟังก์ชันเรียกข้อมูลบริษัททั้งหมด
    const fetchCompany = async () => {
      companyLoading.value = true;
      try {
        const response = await axios.get('http://127.0.0.1:8000/company');
        if (response.data.status === 'success') {
          company.value = response.data.data;
          console.log('ข้อมูลบริษัท:', company.value);
        }
      } catch (error) {
        showNotification('error', 'เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลบริษัทได้');
        console.error('ไม่สามารถดึงข้อมูลบริษัทได้:', error);
      } finally {
        companyLoading.value = false;
      }
    };

    // ฟังก์ชันเรียกข้อมูลอุตสาหกรรม
    const fetchIndustries = async () => {
      industriesLoading.value = true;
      try {
        const response = await axios.get('http://127.0.0.1:8000/company/industry');
        if (response.data.status === 'success') {
          // industries.value = response.data.data;
          industries.value = response.data.data.map((item, index) => ({
            name: item.industry,
            code: `industry_${index}`
          }));
          console.log('อุตสาหกรรม:', industries.value);
        }
      } catch (error) {
        console.error('ไม่สามารถดึงข้อมูลอุตสาหกรรมได้:', error);
      } finally {
        industriesLoading.value = false;
      } 
    };

    // ฟังก์ชันเรียกข้อมูลขนาดบริษัท
    const fetchCompanySizes = async () => {
      companySizesLoading.value = true;
      try {
        const response = await axios.get('http://127.0.0.1:8000/company/company_size');
        if (response.data.status === 'success') {
          companySizes.value = response.data.data.map((item, index) => ({
            name: item.company_size,
            code: `company_size_${index}`
          }));
          console.log('ขนาดบริษัท:', companySizes.value);
        }
      } catch (error) {
        console.error('ไม่สามารถดุงข้อมูลขนาดบริษัทได้:', error);
      } finally {
        companySizesLoading.value = false;
      }
    };

    // เปิดไดอะล็อกเพิ่มบริษัทใหม่
    const openNewCompany = () => {
      initialValues.value = {
        company_id: null,
        name: null,
        short_name: null,
        industry: null,
        verified: 0,
        company_search_url: null,
        company_size: null,
        registration_date: null
      };

      companyDialog.value = true;
    };

    // ปิด Company Dialog
    const closeCompanyDialog = () => {
      companyDialog.value = false;
      insertCompanySubmitted.value = false;
    };

    // เพื่มข้อมูลบริษัท
    const insertCompany = async (event) => {
      insertCompanySubmitted.value = true;
      // ตรวจสอบว่าชื่อบริษัทว่างเปล่าหรือไม่
      if (!initialValues.value.name) {
        showNotification('warning', 'แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบ');
        return;
      }
      try {
        // เตรียมข้อมูลสำหรับ API
        const params = {
          "company_id": null,
          "name": initialValues.value.name,
          "short_name": initialValues.value.short_name || null,
          "industry": initialValues.value.industry ? initialValues.value.industry.industry : null,
          "verified": initialValues.value.verified ? 1 : 0,
          "company_search_url": initialValues.value.company_search_url || null,
          "company_size": initialValues.value.company_size ? initialValues.value.company_size.company_size : null,
          "registration_date": initialValues.value.registration_date || null
        };

        // ถ้าไม่มี company_id แสดงว่าเป็นการเพิ่มใหม่
        console.log('Insert company params:', params);
        const response = await axios.post('http://127.0.0.1:8000/company', params);
        console.log('Response insert company:', response.data);
        
        // ตรวจสอบการตอบกลับจาก API
        if (response.data.status === 'success') {
          // แสดงการแจ้งเตือนสำเร็จ
          showNotification('success', 'บันทึกสำเร็จ', 'เพิ่มข้อมูลบริษัทเรียบร้อยแล้ว');
          insertCompanySubmitted.value = false;
          
          // ซ่อนไดอะล็อก
          closeCompanyDialog();
          fetchCompany();
        } 
      } catch (error) {
        console.error('ไม่สามารถบันทึกข้อมูลได้:', error); 
        showNotification('error', 'เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้: ' + (error.response?.data?.message || error.message));
      }
    };

    onMounted(() => {
      fetchCompany();
      fetchIndustries();
      fetchCompanySizes();
    });

    return {
      // ตัวเเปรพารามิเตอร์,
      company,
      companyLoading,
      industries,
      industriesLoading,
      companySizes,
      companySizesLoading,
      companyDialog,
      initialValues,
      insertCompanySubmitted,
      filters,
      notificationDialog,

      // ฟังก์ชั่น
      resolver,
      showNotification,
      closeNotification,
      openNewCompany,
      closeCompanyDialog,
      insertCompany,
    };
  }
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.text-success {
  color: #198754;
}

.text-danger {
  color: #dc3545;
}

.text-warning {
  color: #ffc107;
}

.text-info {
  color: #0dcaf0;
}

/* กำหนดความสูงสูงสุดของ Dialog */
::v-deep(.p-dialog-content) {
  max-height: 80vh;
  overflow-y: auto;
}

/* ปรับขนาดและสีของข้อความแจ้งเตือน */
:deep(.p-message) {
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

:deep(.p-message .p-message-wrapper) {
  padding: 0.3rem 0.5rem;
}

:deep(.p-invalid) {
  border-color: #dc3545 !important;
}
</style>