<!-- src\components\admin\TheAddJobposting.vue -->

<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
        <TheSidebar />
      </div>
      <!-- ส่วนของเนื้อหา -->
      <div class="col py-3">
        <h1 class="fw-bold h1 mb-3" style="color: #2A2D65;">เพิ่มประกาศรับสมัครงาน</h1>

        <div class="card p-4 mb-4">
          <h4 class="mb-3">ดึงข้อความจากรูปภาพ</h4>
            <Select 
                v-model="selectedImagetotextModel" 
                name="imagetotextModel" 
                :options="imagetotextModel" 
                optionLabel="name" 
                placeholder="เลือกโมเดล" 
                class="mb-3 w-30"
            />

            <FileUpload 
                name="files" 
                :customUpload="true"
                @uploader="onAdvancedUpload"  
                :multiple="true" 
                accept="image/*" 
                :maxFileSize="1000000"
                :auto="false"
            >
                <template #empty>
                    <span>Drag and drop files to here to upload.</span>
                </template>
            </FileUpload>
        </div>
    
        <Form @submit="onFormSubmit">
          <div class="card p-4 mb-4">
            <h4 class="mb-3">ข้อมูลพื้นฐาน</h4>
            
            <div class="row mb-3">
              <div class="col-md-12" >
                <label class="form-label">ตำแหน่งงาน<span class="text-danger">*</span></label>
                <div>
                  <InputText v-model="jobtitle" name="jobtitle" class="w-100" type="text" placeholder="ระบุตำแหน่งงาน" required/>
                </div>
                
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">หมวดหมู่หลัก<span class="text-danger">*</span></label>
                <Select v-model="selectedMaincategory" name="selectedMaincategory" :options="maincategory" optionLabel="name" 
                  placeholder="เลือกหมวดหมู่หลัก" class="w-100" required/>
              </div>
              <div class="col-md-6">
                <label class="form-label">หมวดหมู่ย่อย<span class="text-danger">*</span></label>
                <Select v-model="selectedSubcategory" filter name="selectedSubcategory" :options="subcategory" optionLabel="name" 
                  placeholder="เลือกหมวดหมู่ย่อย" class="w-100" required/>
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-md-12">
                <label class="form-label">รายละเอียดงาน<span class="text-danger">*</span></label>
                <Textarea v-model="jobcontent" name="jobcontent" class="w-100" rows="5" placeholder="ระบุรายละเอียดงาน" required/>
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-md-12">
                <label class="form-label">แหล่งที่มา</label>
                <InputText v-model="jobshareLink" name="jobshareLink" class="w-100" type="text" placeholder="ระบุแหล่งที่มาหรือลิงก์"/>
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">วันที่ประกาศรับสมัคร<span class="text-danger">*</span></label>
                <DatePicker v-model="postedDate" name="postedDate" showIcon class="w-100" :showOnFocus="false" inputId="postedDate" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">วันที่ปิดรับสมัคร<span class="text-danger">*</span></label>
                <DatePicker v-model="expiryDate" name="expiryDate" showIcon class="w-100" :showOnFocus="false" inputId="expiryDate" required />
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-md-12">
                <label class="form-label">บริษัท<span class="text-danger">*</span></label>
                <Select v-model="selectedCompany" name="selectedCompany" :options="companies" filter optionLabel="name" 
                  placeholder="เลือกบริษัท" :virtualScrollerOptions="{ itemSize: 38 }" class="w-100" required/>
              </div>
            </div>
          </div>
          
          <div class="card p-4 mb-4">
            <h4 class="mb-3">สถานที่ทำงาน</h4>
            
            <div class="row mb-3">
              <div class="col-md-4">
                <label class="form-label">พื้นที่ทำงาน</label>
                <AutoComplete v-model="selectedArea" name="selectedArea" :suggestions="filteredAreas" 
                  @complete="searchArea" @focus="onFocus" optionLabel="area"
                  class="w-100" :dropdown="true" :forceSelection="false"/>
              </div>
              <div class="col-md-4">
                <label class="form-label">เมือง</label>
                <AutoComplete v-model="selectedCity" name="selectedCity" :suggestions="filteredCitys" 
                  @complete="searchCity" @focus="onFocus" optionLabel="city"
                  class="w-100" :dropdown="true" :forceSelection="false"/>
              </div>
              <div class="col-md-4">
                <label class="form-label">ประเทศ</label>
                <AutoComplete v-model="selectedCountry" name="selectedCountry" :suggestions="filteredCountry" 
                  @complete="searchCountry" @focus="onFocus" optionLabel="country"
                  class="w-100" :dropdown="true" :forceSelection="false"/>
              </div>
            </div>
          </div>
          
          <div class="card p-4 mb-4">
            <h4 class="mb-3">ข้อมูลเงินเดือนและการจ้างงาน</h4>
            
            <div class="row mb-3">
              <div class="col-md-4">
                <label class="form-label">สกุลเงิน<span class="text-danger">*</span></label>
                <Select v-model="selectedCurrency" name="selectedCurrency" :options="currency" optionLabel="currency" 
                  placeholder="เลือกสกุลเงิน" class="w-100" required/>
              </div>
              <div class="col-md-4">
                <label class="form-label">เงินเดือนต่ำสุด<span class="text-danger">*</span></label>
                <InputNumber v-model="min_salary" name="min_salary" class="w-100" placeholder="ระบุเงินเดือนต่ำสุด" required/>
              </div>
              <div class="col-md-4">
                <label class="form-label">เงินเดือนสูงสุด<span class="text-danger">*</span></label>
                <InputNumber v-model="max_salary" name="max_salary" class="w-100" placeholder="ระบุเงินเดือนสูงสุด" required/>
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-md-4">
                <label class="form-label">งวดการจ่าย<span class="text-danger">*</span></label>
                <Select v-model="selectedPeriod" name="selectedPeriod" :options="period" optionLabel="period" 
                  placeholder="เลือกงวดการจ่าย" class="w-100" required/>
              </div>
              <div class="col-md-4">
                <label class="form-label">ประเภทสัญญาจ้าง<span class="text-danger">*</span></label>
                <Select v-model="selectedJobType" name="selectedJobType" :options="jobtypes" optionLabel="type" 
                  placeholder="เลือกประเภทสัญญาจ้าง" class="w-100" required/>
              </div>
            </div>
          </div>
        
          <div class="d-flex justify-content-end mt-4">
            <Button :loading="loading" type="submit" label="บันทึก" class="p-button-success" icon="pi pi-save" />
          </div>
          
        </Form>
      </div>

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
</template>

<script>
import TheSidebar from "@/components/admin/TheSidebar.vue";
import axios from "axios";
import { ref, onMounted, reactive } from "vue";

// นำเข้า PrimeVue Components
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import ToggleButton from 'primevue/togglebutton';
import Select from 'primevue/select';
import AutoComplete from 'primevue/autocomplete';
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/datepicker';
import { Form } from '@primevue/forms';
import Message from 'primevue/message';
import FileUpload from 'primevue/fileupload';


export default {
  name: 'TheAddJobposting',
  components: {
    TheSidebar,
    Button,
    InputText,
    InputNumber,
    Dialog,
    ToggleButton,
    Select,
    AutoComplete,
    Textarea,
    DatePicker,
    Form,
    Message,
    FileUpload,
  },

  setup() {
    
    // ข้อมูลพื้นฐาน
    const jobtitle = ref(null);  // ชื่อประกาศรับสมัครงาน
    const jobcontent = ref(null); // รายละเอียดประกาศรับสมัครงาน
    const jobshareLink = ref(null); // แหล่งที่มา
    const postedDate = ref(null); // วันที่เปิดรับสมัครงาน
    const expiryDate = ref(null); // วันที่ปิดรับสมัครงาน
    const companies = ref([]); // บริษัท
    const selectedCompany = ref(null);
    const isActive = ref(true); // สถานะประกาศ

    // ประเภทสัญญาจ้าง
    const jobtypes = ref([]);
    const selectedJobType = ref(null);

    // สถานที่ทำงาน
    const area = ref([]);
    const selectedArea = ref(null);
    const filteredAreas = ref([]);
     
    const city = ref([]);
    const selectedCity = ref(null);
    const filteredCitys = ref([]);

    const country = ref([]); 
    const selectedCountry = ref(null);
    const filteredCountry = ref([]);

    // เงินเดือน
    const currency = ref([]);
    const selectedCurrency = ref(null);

    const period = ref([]); 
    const selectedPeriod = ref(null);

    const max_salary = ref(null); 
    const min_salary = ref(null); 

    // ประเภทงาน
    const subcategory = ref([]);
    const selectedSubcategory = ref(null);

    const maincategory = ref([]);
    const selectedMaincategory = ref(null);

    // ตัวแปรสำหรับ Notification Dialog
    const notificationDialog = reactive({
      visible: false,
      header: '',
      message: '',
      icon: '',
      callback: null // ฟังก์ชันที่จะเรียกหลังจากปิด notification
    });

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
    const loading = ref(false);
    

    const onFormSubmit = async (event) => {
      try {
        loading.value = true;

        // เตรียมข้อมูลสำหรับส่งไปยัง API
        const formData = {
          basicInfo: {
            title: jobtitle.value,
            type: selectedJobType.value ? selectedJobType.value.type : null,
            status: isActive.value ? "Active" : "Inactive",
            postedDate: postedDate.value,
            expiryDate: expiryDate.value
          },
          salary: {
            min_salary: min_salary.value,
            max_salary: max_salary.value,
            currency: selectedCurrency.value ? selectedCurrency.value.currency : "THB",
            period: selectedPeriod.value ? selectedPeriod.value.period : "monthly",
            has_salary_info: !!(min_salary.value && max_salary.value)
          },
          classification: {
            mainCategory: selectedMaincategory.value ? {
              id: selectedMaincategory.value.main_category_id,
              name: selectedMaincategory.value.name
            } : null,
            subCategory: selectedSubcategory.value ? {
              id: selectedSubcategory.value.sub_category_id,
              name: selectedSubcategory.value.name
            } : null
          },
          location: {
            // รองรับทั้งกรณีเลือกจากรายการที่มีอยู่ และพิมพ์ข้อมูลใหม่เอง
            area: selectedArea.value?.area ?? selectedArea.value ?? null,
            city: selectedCity.value?.city ?? selectedCity.value ?? null,
            country: selectedCountry.value?.country ?? selectedCountry.value ?? null
          },
          company: selectedCompany.value ? {
            id: selectedCompany.value.company_id,
            name: selectedCompany.value.name
          } : null,
          content: jobcontent.value,
          shareLink: jobshareLink.value
        };

        console.log('Form Data:', formData);

        const response = await axios.post('http://127.0.0.1:8000/jobs/jobpostings', formData);
        if (response.data.status === 'success') {
          showNotification('success', 'สำเร็จ', 'บันทึกข้อมูลเรียบร้อยแล้ว');
          // อาจจะเพิ่มการล้างฟอร์มหลังจากบันทึกสำเร็จ
          resetForm();
        }
      } catch (error) {
        console.error('Error creating job posting:', error);
        showNotification('error', 'เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้: ' + (error.response?.data?.message || error.message));
      } finally {
        loading.value = false;
      }
    };

    // เพิ่มฟังก์ชันล้างฟอร์ม
    const resetForm = () => {
      jobtitle.value = '';
      jobcontent.value = '';
      jobshareLink.value = '';
      postedDate.value = null;
      expiryDate.value = null;
      selectedCompany.value = null;
      selectedJobType.value = null;
      selectedArea.value = null;
      selectedCity.value = null;
      selectedCountry.value = null;
      selectedCurrency.value = null;
      selectedPeriod.value = null;
      min_salary.value = null;
      max_salary.value = null;
      selectedMaincategory.value = null;
      selectedSubcategory.value = null;
    };

    // ฟังก์ชันค้นหาสำหรับ AutoComplete พื้นที่
    const searchArea = (event) => {
      const query = event.query.toLowerCase();
      filteredAreas.value = area.value.filter(item => 
        item.area.toLowerCase().includes(query)
      );
    };

    // ฟังก์ชันค้นหาสำหรับ AutoComplete เมือง
    const searchCity = (event) => {
      const query = event.query.toLowerCase();
      filteredCitys.value = city.value.filter(item => 
        item.city.toLowerCase().includes(query)
      );
    };

    // ฟังก์ชันค้นหาสำหรับ AutoComplete ประเทศ
    const searchCountry = (event) => {
      const query = event.query.toLowerCase();
      filteredCountry.value = country.value.filter(item => 
        item.country.toLowerCase().includes(query)
      );
    };

    // ฟังก์ชันที่ทำงานเมื่อ focus
    const onFocus = (event) => {
      const fieldName = event.target.getAttribute('aria-owns')?.split('-')[0];
      
      if (fieldName?.includes('area')) {
        filteredAreas.value = [...area.value];
      } else if (fieldName?.includes('city')) {
        filteredCitys.value = [...city.value];
      } else if (fieldName?.includes('country')) {
        filteredCountry.value = [...country.value];
      }
    };
    
    // ฟังก์ชันเรียกประเภทสัญญาจ้าง
    const fetchType = async () => {
      try {
        loading.value = true;
        const response = await axios.get('http://127.0.0.1:8000/basicinfo/type');
        if (response.data.status === 'success') {
          jobtypes.value = response.data.data;
          console.log('jobtypes:', jobtypes.value);
        }
      } catch (error) {
        console.error('Error fetching jobtypes:', error);
      } finally {
        loading.value = false;
      }
    };

    // ฟังก์ชันเรียกสถานที่ทำงาน
    const fetchArea = async () => {
      try {
        loading.value = true;
        const response = await axios.get('http://127.0.0.1:8000/location/area');
        if (response.data.status === 'success') {
          area.value = response.data.data;
          console.log('area:', area.value);
        }
      } catch (error) {
        console.error('Error fetching area:', error);
      } finally {
        loading.value = false;
      }
    };

    const fetchCity = async () => {
      try {
        loading.value = true;
        const response = await axios.get('http://127.0.0.1:8000/location/city');
        if (response.data.status === 'success') {
          city.value = response.data.data;
          console.log('city:', city.value);
        }
      } catch (error) {
        console.error('Error fetching city:', error);
      } finally {
        loading.value = false;
      }
    };

    const fetchCountry = async () => {
      try {
        loading.value = true;
        const response = await axios.get('http://127.0.0.1:8000/location/country');
        if (response.data.status === 'success') {
          country.value = response.data.data;
          console.log('country:', country.value);
        }
      } catch (error) {
        console.error('Error fetching country:', error);
      } finally {
        loading.value = false;
      }
    };
    
    // ฟังก์ชันเรียกเงินเดือน
    const fetchCurrency = async () => {
      try {
        loading.value = true;
        const response = await axios.get('http://127.0.0.1:8000/salary/currency');
        if (response.data.status === 'success') {
          currency.value = response.data.data;
          console.log('currency:', currency.value);
        }
      } catch (error) {
        console.error('Error fetching currency:', error);
      } finally {
        loading.value = false;
      }
    };

    const fetchPeriod = async () => {
      try {
        loading.value = true;
        const response = await axios.get('http://127.0.0.1:8000/salary/period');
        if (response.data.status === 'success') {
          period.value = response.data.data;
          console.log('period:', period.value);
        }
      } catch (error) {
        console.error('Error fetching period:', error);
      } finally {
        loading.value = false;
      }
    };

    const fetchCompanies = async () => {
      try {
        loading.value = true;
        const response = await axios.get('http://127.0.0.1:8000/company');
        if (response.data.status === 'success') {
          companies.value = response.data.data;
          console.log('companies:', companies.value);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        loading.value = false;
      }
    };

    const fetchMaincategory = async () => {
      try {
        loading.value = true;
        const response = await axios.get('http://127.0.0.1:8000/maincategory');
        if (response.data.status === 'success') {
          maincategory.value = response.data.data;
          console.log('maincategory:', maincategory.value);
        }
      } catch (error) {
        console.error('Error fetching maincategory:', error);
      } finally {
        loading.value = false;
      }
    };

    const fetchSubcategory = async () => {
      try {
        loading.value = true;
        const response = await axios.get('http://127.0.0.1:8000/subcategory');
        if (response.data.status === 'success') {
          subcategory.value = response.data.data;
          console.log('subcategory:', subcategory.value);
        }
      } catch (error) {
        console.error('Error fetching subcategory:', error);
      } finally {
        loading.value = false;
      }
    };

    const selectedImagetotextModel = ref(null);
    const imagetotextModel = ref([
        { name: 'Gemini', model: 'gemini'},
        { name: 'Google vision and OpenAI', model: 'google_openai' },
    ]);

    const onAdvancedUpload = async (event) => {
      try {
        // ตรวจสอบว่ามีการเลือกเครื่องมือหรือไม่
        if (!selectedImagetotextModel.value) {
          showNotification('error', 'ข้อผิดพลาด', 'กรุณาเลือกโมเดลก่อนอัปโหลดไฟล์');
          return;
        }
        
        // ได้รับไฟล์จาก event.files
        const files = event.files;
        
        if (!files || files.length === 0) {
          showNotification('error', 'ข้อผิดพลาด', 'กรุณาเลือกไฟล์รูปภาพอย่างน้อย 1 ไฟล์');
          return;
        }
        
        // สร้าง FormData สำหรับส่งไปยัง backend
        const formData = new FormData();
        
        // เพิ่มข้อมูลเครื่องมือที่เลือก
        formData.append('model', selectedImagetotextModel.value.model);
        
        // เพิ่มไฟล์ทั้งหมดด้วยชื่อฟิลด์เดียวกัน
        files.forEach((file) => {
          formData.append('files', file);
          console.log("Adding file:", file.name);
        });
        
        // แสดง notification ให้ผู้ใช้ทราบว่ากำลังประมวลผล
        showNotification('info', 'โปรดรอสักครู่', 'กำลังประมวลผลและดึงข้อมูลจากรูปภาพ...');
        
        // ส่งข้อมูลไปยัง API
        const response = await axios.post('http://127.0.0.1:8000/imagetotext', formData);
        
        console.log("API Response:", response.data);
        
        if (response.data.status === 'success') {
          const extractedData = response.data.data;
          console.log("Extracted Data:", extractedData);
          
          // ข้อมูลพื้นฐาน
          if (extractedData.basicInfo?.title) jobtitle.value = extractedData.basicInfo.title;
          
          // ข้อมูลเงินเดือน
          if (extractedData.salary?.min_salary) min_salary.value = parseFloat(extractedData.salary.min_salary);
          if (extractedData.salary?.max_salary) max_salary.value = parseFloat(extractedData.salary.max_salary);
          
          // ข้อมูลสถานที่ - เขียนแบบสั้นตามที่คุณต้องการ
          if (extractedData.location?.area) selectedArea.value = area.value.find(a => a.area.toLowerCase() === extractedData.location.area.toLowerCase()) || extractedData.location.area;
          if (extractedData.location?.city) selectedCity.value = city.value.find(c => c.city.toLowerCase() === extractedData.location.city.toLowerCase()) || extractedData.location.city;
          if (extractedData.location?.country) selectedCountry.value = country.value.find(c => c.country.toLowerCase() === extractedData.location.country.toLowerCase()) || extractedData.location.country;
          
          // รายละเอียดงาน
          if (extractedData.content) jobcontent.value = extractedData.content;

          
          // หากมีข้อมูลอื่นๆ ที่ต้องการเติม ให้เพิ่มที่นี่

          showNotification('success', 'สำเร็จ', 'ดึงข้อความจากรูปภาพและเติมข้อมูลในฟอร์มสำเร็จ');
        } else {
          showNotification('error', 'ข้อผิดพลาด', 'ไม่สามารถดึงข้อความจากรูปภาพได้');
        }
        
      } catch (error) {
        console.error("Error during upload:", error);
        showNotification('error', 'ข้อผิดพลาด', `เกิดข้อผิดพลาด: ${error.message}`);
      }
    };

    onMounted(() => {
      fetchType();
      fetchArea();
      fetchCity();
      fetchCountry();
      fetchCurrency();
      fetchPeriod();
      fetchCompanies();
      fetchMaincategory();
      fetchSubcategory();
    });

    return {
      // ข้อมูลพื้นฐาน
      jobtitle,
      jobcontent,
      jobshareLink,
      postedDate,
      expiryDate,
      companies,
      selectedCompany,
      isActive,

      // ประเภทงาน
      subcategory,
      selectedSubcategory,
      maincategory,
      selectedMaincategory,

      // ข้อมูลการจ้างงาน
      jobtypes,
      selectedJobType,
      currency,
      selectedCurrency,
      period,
      selectedPeriod,
      min_salary,
      max_salary,

      // สถานที่ทำงาน
      area,
      selectedArea,
      filteredAreas,
      city,
      selectedCity,
      filteredCitys,
      country,
      selectedCountry,
      filteredCountry,

      // เงินเดือน
      currency,
      selectedCurrency,
      period,
      selectedPeriod,
      min_salary,
      max_salary,

      // ตัวแปรสำหรับ Notification Dialog
      notificationDialog,
      showNotification,
      closeNotification,

      //loading
      loading,

      // ฟังก์ชั่นส่งค่าจากฟอร์มเพื่อบันทึกข้อมูล
      onFormSubmit,
      resetForm,

      // ฟังก์ชั่นค้นหาข้อมูล 
      searchArea,
      searchCity,
      searchCountry,
      onFocus,

      // ฟังก์ชั่นดึงข้อมูลจาก API
      fetchType,
      fetchArea,
      fetchCity,
      fetchCountry,
      fetchCurrency,
      fetchPeriod,
      fetchCompanies,
      fetchMaincategory,
      fetchSubcategory,

      // ตัวแปรสำหรับ Upload รูปภาพ
      selectedImagetotextModel,
      imagetotextModel,
      onAdvancedUpload
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

.form-label {
  font-weight: 500;
  color: #2A2D65;
  margin-bottom: 0.5rem;
}

.p-button {
  padding: 0.5rem 1.5rem;
}

/* สำหรับ InputNumber */
:deep(.p-inputnumber) {
  width: 100%;
}

:deep(.p-inputnumber-input) {
  width: 100%;
}

/* สำหรับ ToggleButton */
:deep(.p-togglebutton.p-button) {
  background: #f8f9fa;
  border: 1px solid #ced4da;
  color: #495057;
}

:deep(.p-togglebutton.p-button.p-highlight) {
  background: #28a745;
  border-color: #28a745;
  color: #ffffff;
}
</style>