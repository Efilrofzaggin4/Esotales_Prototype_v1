// Sélectionner tous les boutons de suppression avec la classe "js-remove-post-button"
const deleteActuButtons = document.querySelectorAll('.js-remove-actu-button');

// Parcourir les boutons de suppression et ajouter un gestionnaire d'événements clic
deleteActuButtons.forEach(button => {
  button.addEventListener('click', () => {
    const actuId = button.getAttribute('data-id');
    // Appeler la fonction deleteActu avec l'ID de l'article
    deleteActu(actuId);
  });
});

// Fonction deletePost pour envoyer une requête de suppression à votre backend
function deleteActu(actuId) {
 //requête fetch 
  // en passant l'ID de l'article
  // fetch :
  fetch(`/admin/actualites/${actuId}`, {method: 'DELETE'})
    .then(response => {
      if (response.ok) {
        const deletedRow = document.querySelector(`tr[data-id="${actuId}"]`);
        if (deletedRow) {
          deletedRow.remove(); // Supprimer la ligne du tableau correspondant à l'actu supprimé
        }} else {
          throw new Error('Erreur lors de la suppression de l\'article');
        }
    })
    .catch(error => {
      console.error(error);
      //gestion d'erreur
    });
}

const deleteVideoButton = document.querySelectorAll(".js-remove-video-button");


deleteVideoButton.forEach(button => {
  button.addEventListener('click', () => {
    const videoId = button.getAttribute('data-id');
    
    deleteVideo(videoId);
  });
});

function deleteVideo(videoId) {
  fetch(`/admin/videos/${videoId}`, {method: 'DELETE'})
    .then(response => {
      if (response.ok) {
        const deletedRow = document.querySelector(`tr[data-id="${videoId}"]`);
        if (deletedRow) {
          deletedRow.remove(); // Supprimer la ligne du tableau correspondant à la video supprimée
        }} else {
          throw new Error('Erreur lors de la suppression de la video');
        }
    })
    .catch(error => {
      console.error(error);
      //gestion d'erreur
    });
  }

  const deleteImageButton = document.querySelectorAll(".js-remove-image-button");


deleteImageButton.forEach(button => {
  button.addEventListener('click', () => {
    const imageId = button.getAttribute('data-id');
    
    deleteImage(imageId);
  });
});

function deleteImage(imageId) {
  fetch(`/admin/images/${imageId}`, {method: 'DELETE'})
    .then(response => {
      if (response.ok) {
        const deletedRow = document.querySelector(`tr[data-id="${imageId}"]`);
        if (deletedRow) {
          deletedRow.remove(); // Supprimer la ligne du tableau correspondant à l'image supprimée
        }} else {
          throw new Error("Erreur lors de la suppression de l'image");
        }
    })
    .catch(error => {
      console.error(error);
      //gestion d'erreur
    });
  }

const deleteClassesButton = document.querySelectorAll(".js-remove-classes-button");


deleteClassesButton.forEach(button => {
  button.addEventListener('click', () => {
    const classesId = button.getAttribute('data-id');
    
    deleteClasses(classesId);
  });
});

function deleteClasses(classesId) {
  fetch(`/admin/classes/${classesId}`, {method: 'DELETE'})
    .then(response => {
      if (response.ok) {
        const deletedRow = document.querySelector(`tr[data-id="${classesId}"]`);
        if (deletedRow) {
          deletedRow.remove(); // Supprimer la ligne du tableau correspondant à la classe supprimée
        }} else {
          throw new Error("Erreur lors de la suppression de la classes");
        }
    })
    .catch(error => {
      console.error(error);
      //gestion d'erreur
    });
}

/****************Mode dyslexique **********************/



document.addEventListener('DOMContentLoaded', () => {
  let modeDyslexiqueActif = localStorage.getItem('etatModeDyslexique') === 'true';
  let boutonDyslexique = document.getElementById('modeDyslexique');

  boutonDyslexique.classList.toggle('actif', modeDyslexiqueActif);
  document.body.classList.toggle('dyslexique', modeDyslexiqueActif);

  boutonDyslexique.addEventListener('click', () => {
    modeDyslexiqueActif = !modeDyslexiqueActif;
    boutonDyslexique.classList.toggle('actif', modeDyslexiqueActif);
    document.body.classList.toggle('dyslexique', modeDyslexiqueActif);
    localStorage.setItem('etatModeDyslexique', modeDyslexiqueActif.toString());
  });
});





