if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./../../serviceWorker.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered',err))
}


function takePicture() {
  const imageInput = document.getElementById('imageInput');
  const previewImage = document.getElementById('previewImage');

  // Vérifiez si l'API MediaDevices est disponible
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
              // Affichez le flux vidéo dans un élément video (optionnel)
              const video = document.createElement('video');
              document.body.appendChild(video);
              video.srcObject = stream;
              video.play();

              // Lorsque l'utilisateur clique sur le bouton, prenez une capture d'écran
              imageInput.addEventListener('change', function () {
                  const context = video.getContext('2d');
                  context.drawImage(video, 0, 0, video.width, video.height);

                  // Convertissez la capture d'écran en base64 pour l'afficher
                  previewImage.src = video.toDataURL('image/png');

                  // Arrêtez le flux vidéo et supprimez l'élément video (optionnel)
                  stream.getTracks().forEach(track => track.stop());
                  document.body.removeChild(video);

                  // Affichez l'élément image avec la photo capturée
                  previewImage.style.display = 'block';
              });
          })
          .catch(function (error) {
              console.error('Erreur lors de l\'accès à la caméra : ', error);
          });
  } else {
      console.error('L\'API MediaDevices n\'est pas disponible sur ce navigateur.');
  }
}

function selectFromGallery() {
    const galleryInput = document.getElementById('galleryInput');
    const previewImage = document.getElementById('previewImage');

    // Ajoutez un écouteur d'événements pour le changement de la sélection de fichiers
    galleryInput.addEventListener('change', function () {
        const selectedFile = galleryInput.files[0];

        if (selectedFile) {
            // Créez un objet URL pour prévisualiser l'image sélectionnée
            const imageUrl = URL.createObjectURL(selectedFile);
            
            // Affichez l'élément image avec l'image sélectionnée
            previewImage.src = imageUrl;
            previewImage.style.display = 'block';
        }
    });

    // Déclenchez le clic sur l'élément input pour ouvrir la boîte de dialogue de sélection de fichiers
    galleryInput.click();
}
