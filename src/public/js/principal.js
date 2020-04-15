let constraintObj = {
    // audio: true,
    video: true
}

if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.getUserMedia = function(constraintObj) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia no está implementado en este navegador'));
        }
        return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
    }
} else {
    console.log('----> Mis dispositivos conectados son: ');
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            devices.forEach(device => {
                console.log(device.kind.toUpperCase(), device.label);
                //, device.deviceId
            })
            console.log('----------------------------------');
        })
        .catch(err => {
            console.log(err.name, err.message);
        })
}

// async function openCamera() {
//     const constraints = {
// 'audio': {'echoCancellation': true},
// 'video': true
// {
// 'deviceId': cameraId,
// 'width': {'min': minWidth},
// 'height': {'min': minHeight}
// }
//     }

//     return await navigator.mediaDevices.getUserMedia(constraints);
// }

async function playVideoFromCamera() {
    try {
        console.log('playVideoFromCamera');
        const constraints = { 'video': true, 'audio': true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.querySelector('video#videoLocal');
        videoElement.srcObject = stream;
    } catch (error) {
        // alert('Error opening video camera.', error);
        alert(error);

    }
}

$('#btnIniciar').click(function() {
    console.log('Presionó iniciar');
    playVideoFromCamera();
    // const stream = openCamera();
});