/* global $, event */
$(document).ready(function ($) {
  $('.declencheur-menu').click(function () {
    $('.navigations').slideToggle()
    $(this).toggleClass('ouvert')
    event.preventDefault()
  })
  // Le label est sous le champ pour donner un effet de placeholder, tout en restant accessible. On le fait disparaitre en Javascript quand le focus tombe dans le champ.
  $('#chercher-champ').focus(function () {
    $('.chercher .chercher-etiquette').addClass('visually-hidden')
  })
  $('#chercher-champ').focusout(function () {
    if ($(this).val() === '') {
      $('.chercher .chercher-etiquette').removeClass('visually-hidden')
    }
  })
  // Comme l'étiquette est sous le champ, le clic sur le champ est normalement intercepté avant, sauf lors d'un clic en déplacement, comme pour sélectionner le texte.
  $('.chercher .chercher-etiquette').click(function () {
    $('#chercher-champ').focus()
  })
})
