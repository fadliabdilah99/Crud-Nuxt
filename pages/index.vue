<script setup>
useHead({
  title: "Halaman Utama",
});

import { onMounted } from "vue";

onMounted(() => {
  const role = localStorage.getItem("role");
  if (role !== "admin" && role !== "user") {
    navigateTo("/login");
  }
});

const config = useRuntimeConfig();
const router = useRouter();

const { data: posts } = await useAsyncData("posts", () => $fetch(`${config.public.baseUrl}/api/konten`));

// definisikan konten post
const konten = ref("");
const foto = ref("");

// upload foto
const handlefilechange = (event) => {
  foto.value = event.target.files[0];
};

const postKonten = async () => {
  let formData = new FormData();

  // add data
  formData.append("konten", konten.value);
  formData.append("foto", foto.value);

  await $fetch(`${config.public.baseUrl}/api/konten`, {
    method: "POST",
    body: formData,
  }).then(() => {
    router.push({ path: "/" });
  });
};

async function deleteKonten(id) {
  const result = await Swal.fire({
    title: "Hapus Data?",
    text: "Data akan dihapus permanen!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus!",
  });
  if (result.isConfirmed) {
    await $fetch(`${config.public.baseUrl}/api/konten/${id}`, {
      method: "DELETE",
    });
    refreshNuxtData("posts");
  }
}
</script>
<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <div class="d-flex align-items-center">
          <h4 class="card-title">Add Row</h4>
          <button class="btn btn-primary btn-round ms-auto" data-bs-toggle="modal" data-bs-target="#addRowModal">
            <i class="fa fa-plus"></i>
            Add Row
          </button>
        </div>
        <div v-if="response" class="alert alert-success alert-dismissible fade show" role="alert">
          {{ response.message }}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
      <div class="card-body">
        <!-- Modal -->
        <div class="modal fade" id="addRowModal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header border-0">
                <h5 class="modal-title">
                  <span class="fw-mediumbold"> New</span>
                  <span class="fw-light"> Row </span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p class="small">Create a new row using this form, make sure you fill them all</p>
                <form @submit.prevent="postKonten()">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group form-group-default">
                        <label>konten</label>
                        <input id="konten" type="text" v-model="konten" class="form-control" placeholder="fill name" />
                      </div>
                    </div>
                    <div class="col-md-6 pe-0">
                      <div class="form-group form-group-default">
                        <label>Position</label>
                        <input id="addPosition" type="file" @change="handlefilechange($event)" class="form-control" />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer border-0">
                    <button type="submit" id="addRowButton" class="btn btn-primary">Add</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table id="add-row" class="display table table-striped table-hover">
            <thead>
              <tr>
                <th>konten</th>
                <th>Position</th>
                <th style="width: 10%">Action</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>konten</th>
                <th>img</th>
                <th>Action</th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="(post, index) in posts" :key="index">
                <td>{{ post.konten }}</td>
                <td><img :src="`${config.public.baseUrl}/uploads/konten/${post.foto}`" width="200" class="rounded-3" alt="" /></td>
                <td>
                  <div class="form-button-action">
                    <NuxtLink :to="`/posts/edit/${post.id}`" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                      <i class="fa fa-edit"></i>
                    </NuxtLink>

                    <!-- <NuxtLink :to="`/posts/edit/${post.id}`" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</NuxtLink> -->

                    <button type="button" @click="deleteKonten(post.id)" data-bs-toggle="tooltip" title="" class="btn btn-link btn-danger" data-original-title="Remove">
                      <i class="fa fa-times"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>