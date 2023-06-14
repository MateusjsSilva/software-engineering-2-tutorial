<template>
    <div class="container">
      <div class="file-upload">
        <div class="button-group">
          <input ref="fileInput" class="file-upload-input" type="file" @change="handleFileChange" accept="image/*" />
  
          <button v-if="previewImage" type="button" @click="confirmUpload" class="confirm-upload">Confirm</button>
        </div>
  
        <div class="file-upload-content">
          <div v-if="previewImage" class="selected-image">
            <img :src="previewImage" alt="Uploaded Image" class="thumbnail" @click="showImage(previewImage)" />
          </div>
          <div v-if="showAlert" class="alert alert-success" role="alert">
            Sucesso!
          </div>
        </div>
      </div>
  
      <div v-if="imageList.length" class="image-list">
        <h2>Imagens Cadastradas</h2>
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Data de Upload</th>
              <th>Hora de Upload</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="image in sortedImageList" :key="image.id">
              <td>
                <img :src="getImageUrl(image.image)" alt="Uploaded Image" class="thumbnail"
                  @click="showImage(getImageUrl(image.image))" />
              </td>
              <td>{{ formatDate(image.created) }}</td>
              <td>{{ formatTime(image.created) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  const urlBase = `${window.location.protocol}//${window.location.hostname}:8000`;
  
  export default {
    data() {
      return {
        previewImage: null,
        imageList: [],
        showAlert: false,
      };
    },
    methods: {
      openFileInput() {
        this.$refs.fileInput.click();
      },
      handleFileChange(event) {
        const file = event.target.files[0];
        this.previewImage = URL.createObjectURL(file);
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      },
      formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString();
      },
      getImageUrl(imagePath) {
        return `${urlBase}${imagePath}`;
      },
      showImage(imageUrl) {
        window.open(imageUrl, "_blank");
      },
      confirmUpload() {
        if (this.previewImage) {
          const fileInput = this.$refs.fileInput;
          const file = fileInput.files[0];
  
          const formData = new FormData();
          formData.append("image", file, "image.jpg");
  
          axios
            .post(`${urlBase}/api/images/`, formData)
            .then(response => {
              console.log("Upload successful");
              this.imageList.push(response.data);
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
              }, 3000);
            })
            .catch(error => {
              console.error("Error uploading image:", error);
            });
        }
      },
      fetchImages() {
        axios
          .get(`${urlBase}/api/images/`)
          .then(response => {
            this.imageList = response.data;
          })
          .catch(error => {
            console.error("Error fetching images:", error);
          });
      },
    },
    computed: {
      sortedImageList() {
        return this.imageList.sort((a, b) => new Date(b.created) - new Date(a.created));
      },
    },
    mounted() {
      this.fetchImages();
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .file-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .button-group {
    display: flex;
    margin-bottom: 10px;
  }
  
  .button-group button {
    margin-left: 30px;
  }
  
  .thumbnail {
    width: 50px;
    height: auto;
    cursor: pointer;
  }
  
  .preview-thumbnail {
    max-width: 100px;
    height: auto;
    margin-top: 10px;
  }
  
  .image-list {
    margin-top: 20px;
    width: 100%;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
  }
  
  th,
  td {
    padding: 8px;
    text-align: left;
  }
  
  .preview-image {
    margin-top: 20px;
    text-align: center;
  }
  
  .preview-image img {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
  }
  </style>