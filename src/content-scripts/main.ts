
import { createApp, DefineComponent } from "vue";
import Popup from "./Popup.vue";

const MOUNT_EL_ID = "screen-recorder";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
    mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);
const vm = createApp(Popup).mount(mountEl);


const recordButton = <HTMLElement>document.getElementById('record');
const endButton = <HTMLElement>document.getElementById('end');

var z = document.createElement('a');

let stream: MediaStream;
let audioStream: MediaStream;

let mediaRecorder: MediaRecorder;

let isCapturing: boolean = false;
let isRecording: boolean = false;


recordButton.onclick = async () => {
    if (!isRecording && !isCapturing) {
        // Start recording and capturing
        try {
            audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
            audioStream.getAudioTracks()[0].enabled = true;
            stream.addTrack(audioStream.getAudioTracks()[0]);
            createRecorder(stream, 'video/webm');
            isCapturing = true;
            isRecording = true;
            (vm as any).isRecording = isRecording;
            (vm as any).isCapturing = isCapturing;
        } catch (error) {
            alert(error);
        }
    } else if (isCapturing && !isRecording) {
        // Continue record
        mediaRecorder.resume();
        isRecording = true;
        (vm as any).isRecording = isRecording;
    } else if (isCapturing && isRecording) {
        //Pause record
        mediaRecorder.pause();
        isRecording = false;
        (vm as any).isRecording = isRecording;
    }


}

endButton.onclick = () => {
    mediaRecorder.stop();
}

document.onclick = async (e) => {

    if (isRecording) {
        let span = document.createElement('span');
        span.setAttribute("id", 'click');
        span.style.top = `${e.pageY}px`;
        span.style.left = `${e.pageX}px`;

        document.body.appendChild(span);

        setTimeout(() => {
            span.remove();
        }, 1000);
    }



}
async function finishCapture(blob: Blob) {
    try {
        // stop recording 
        stream.getTracks().forEach(track => track.stop()); // stop capturing

        let downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `screen-capture-${Date.now()}.webm`;

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
    } catch (error) {
        console.log(error)
    }
}


function createRecorder(stream: MediaStream, mimetype: string) {

    let recordedChunks: any[] = [];

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();

    mediaRecorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
        }
    };
    mediaRecorder.onstop = function () {
        const blob = new Blob(recordedChunks, {
            type: mimetype
        }); // chunks to video
        recordedChunks = [];
        stopCapturing();
        finishCapture(blob);
    };

    return mediaRecorder;
}


const stopCapturing = () => {
    isCapturing = false;
    isRecording = false;
    stream.getTracks().forEach(track => track.stop());
    (vm as any).isRecording = isRecording;
    (vm as any).isCapturing = isCapturing;
}


