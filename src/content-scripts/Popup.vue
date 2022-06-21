<template>
  <div class="screen-record-extension-buttons">
    <div class="screen-record-extension-button" slot="" id="record">
      <svg
        v-if="!isRecording"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="red"
        class="bi bi-record-btn"
        viewBox="0 0 16 16"
      >
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path
          d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
        />
      </svg>
      <svg
        v-if="isRecording"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="red"
        class="bi bi-pause-btn"
        viewBox="0 0 16 16"
      >
        <path
          d="M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"
        />
        <path
          d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
        />
      </svg>
    </div>
    <div v-show="isCapturing" class="screen-record-extension-button" id="end">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="green"
        viewBox="0 0 512 512"
      >
        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  data: () => ({
    visible: false,
    isRecording: false,
    isCapturing: false,
  }),
});
</script>

<style scoped>
.screen-record-extension-buttons {
  z-index: 9999;
  position: fixed;
  top: 5%;
  left: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-self: center;
  margin: 0 auto !important;
}

.screen-record-extension-button {
  cursor: pointer;
  height: 50px;
  width: 50px;
  color: #333;
  border-radius: 10px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;

  margin: 5px;
  transition: 1s;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
