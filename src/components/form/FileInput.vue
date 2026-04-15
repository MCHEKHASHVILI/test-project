<script setup>
import { ref, nextTick, watch } from 'vue';
import vueFilePond, { setOptions } from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';

const FilePond = (vueFilePond.default || vueFilePond)(FilePondPluginFileValidateType);
const props = defineProps(['label', 'idle_component']);

const pond = ref(null);
const isPondReady = ref(false);
const uploadedFile = ref(null); // Store single file for the circle view

const handlePondInit = () => {
    nextTick(() => { isPondReady.value = true; });
};

const myFile = ref([])
const emit = defineEmits(['update:modelValue']);

const handleFileAdded = (error, item) => {
    if (error) return
    uploadedFile.value = {
        id: item.id,
        name: item.filename,
        size: formatFileSize(item.fileSize),
        previewUrl: URL.createObjectURL(item.file)
    }
};

const handleFileRemoved = () => {
    uploadedFile.value = null;
};

const triggerBrowse = () => {
    // Removes current and opens file browser
    if (uploadedFile.value) {
        pond.value.removeFile(uploadedFile.value.id);
    }
    pond.value.browse();
};

setOptions({
    instantUpload: false,
    allowMultiple: false // Assuming circle profile style is single-file
})

function formatFileSize(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
function handleUpdateFiles(files) {
    // files is an array of FilePond file items
    // To handle a single file, you can take the first item
    myFile.value = files.map(fileItem => fileItem.file);

    // Now myFile.value[0] contains your actual File object
    console.log('Current file:', myFile.value[0]);
}

watch(myFile, () => {
    emit('update:modelValue', myFile.value[0])
}, { deep: true })

</script>

<template>
    <div class="field-container input-group">
        <label v-if="label" class="field-label">{{ label }}</label>

        <div class="pond-wrapper">
            <!-- Show FilePond only if no file is uploaded -->
            <file-pond v-show="!uploadedFile" ref="pond" v-bind="$attrs" :credits="[]" label-idle=""
                @init="handlePondInit" @addfile="handleFileAdded" @removefile="handleFileRemoved"
                @updatefiles="handleUpdateFiles" />

            <!-- Custom Circle Preview (Inside the same wrapper) -->
            <div v-if="uploadedFile" class="custom-circle-view">
                <div class="circle-container">
                    <img :src="uploadedFile.previewUrl" alt="preview" />
                </div>
                <div class="file-details flex flex-col items-start justify-start">
                    <span class="file-name self-start">{{ uploadedFile.name }}</span>
                    <span class="file-size self-start">{{ uploadedFile.size }}</span>
                    <button type="button" @click="triggerBrowse" class="change-link self-start">
                        Change
                    </button>
                </div>
            </div>

            <!-- Idle Slot (Only show when empty) -->
            <Teleport v-if="isPondReady && !uploadedFile" to=".filepond--drop-label">
                <div class="custom-content-overlay">
                    <slot v-if="!props.idle_component" name="idle" />
                    <component v-else :is="props.idle_component" />
                </div>
            </Teleport>
        </div>
    </div>
</template>

<style scoped>
/* Keep your existing wrapper/panel styles */
.pond-wrapper {
    position: relative;
    width: 100%;
}

:deep(.filepond--panel-root) {
    background-color: var(--color-grayscale-50);
    border: 1.5px solid var(--color-grayscale-200);
    border-radius: 12px;
}

:deep(.filepond--drop-label) {
    min-height: 180px;
    padding: 50px;
}

/* New Circle Preview Styles */
.custom-circle-view {
    min-height: 180px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 12px;
    border: 1.5px solid var(--color-grayscale-200);
    border-radius: 12px;
    background-color: var(--color-grayscale-50);
    padding: 30px;
}

.circle-container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.circle-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.file-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.file-name {
    font-weight: 500;
    font-size: 14px;
    color: var(--color-grayscale-900);
}

.change-link {
    background: none;
    border: none;
    color: var(--color-primary-500, #3b82f6);
    text-decoration: underline;
    font-size: 13px;
    cursor: pointer;
    padding: 0;
}

.change-link:hover {
    color: var(--color-primary-600, #2563eb);
}

/* Hide default FilePond items always */
:deep(.filepond--item) {
    display: none;
}
</style>
