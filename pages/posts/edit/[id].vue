<script setup>
useHead({
  title: "Halaman Edit",
});


const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
import { onMounted } from 'vue';

const { data: posts } = await useAsyncData("posts", () => $fetch(`${config.public.baseUrl}/api/konten/${useRoute().params.id}`));

console.log(`${config.public.baseUrl}/uploads/konten/${posts.value.foto}`);

// definisikan konten post
const konten = ref(posts.value.konten);
const link = ref(posts.value.foto);
const foto = ref("");

const handlefilechange = (event) => {
  foto.value = event.target.files[0];
};

const updateKonten = async () => {
  let formData = new FormData();

  // add data
  formData.append("konten", konten.value);
  formData.append("foto", foto.value);

  await $fetch(`${config.public.baseUrl}/api/konten/${route.params.id}`, {
    method: "POST",
    body: formData,
  }).then(() => {
    router.push({ path: "/" });
  });
};


onMounted(() => {
  Swal.fire("SweetAlert2 is working!");
});

</script>

<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">Status Indicator</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateKonten()" class="row">
          <div class="form-group col-md-6">
            <label for="konten">konten</label>
            <input type="text" class="form-control" id="konten" placeholder="konten" v-model="konten" />
          </div>
          <div class="form-group col-md-6">
            <label for="file">file</label>
            <input type="file" class="form-control" id="file" placeholder="file" @change="handlefilechange($event)" />
            <div class="form-group col-md-6 d-flex flex-column align-items-center">
              <label for="foto">Foto Sebelumnya</label>
              <img :src="`${config.public.baseUrl}/uploads/konten/${link}`" width="200" class="rounded-3" alt="" style="object-fit: cover" />
            </div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
