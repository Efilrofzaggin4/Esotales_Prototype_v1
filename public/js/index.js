// Sélectionner tous les boutons de suppression avec la classe "js-remove-post-button"
const deleteActuButtons = document.querySelectorAll('.js-remove-actu-button');

// Parcourir les boutons de suppression et ajouter un gestionnaire d'événements clic
deleteActuButtons.forEach(button => {
  button.addEventListener('click', () => {
    const actuId = button.getAttribute('data-id');
    // Appeler la fonction deletePost avec l'ID de l'article
    deleteActu(actuId);
  });
});

// Fonction deletePost pour envoyer une requête de suppression à votre backend
function deleteActu(actuId) {
  // Effectuer une requête Ajax ou une requête fetch pour appeler votre endpoint de suppression
  // en passant l'ID de l'article
  // fetch :
  fetch(`/admin/actualites/${actuId}`, {method: 'DELETE'})
    .then(response => {
      if (response.ok) {
        const deletedRow = document.querySelector(`tr[data-id="${actuId}"]`);
        if (deletedRow) {
          deletedRow.remove(); // Supprimer la ligne du tableau correspondant à l'article supprimé
        }} else {
          throw new Error('Erreur lors de la suppression de l\'article');
        }
    })
    .catch(error => {
      console.error(error);
      //gestion d'erreur
    });
}

