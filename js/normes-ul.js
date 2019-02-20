/* global $ */
$(document).ready(function ($) {
  // Ajout des classes nécessaires au fonctionnement du menu mobile
  $('.nav-mobile-content li:has(ul)').addClass('has-children')
  $('.nav-mobile-content ul:not(.nav-mobile-general ul)').addClass('is-hidden')
  $('.nav-mobile-content > li:last-of-type').addClass('dernier-item-principal')

  $('.nav-mobile-trigger').on('click', function () {
    toggleNav()
    if ($('.normes-ul-entete .recherche').hasClass('ouvert')) {
      toggleRecherche()
    }
    return false
  })

  $('.nav-mobile .has-children').children('a').on('click', function () {
    $(this).next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out')
    return false
  })

  $('.nav-mobile .go-back').on('click', function () {
    $(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out')
    return false
  })

  $('.normes-ul-entete .recherche').click(function () {
    if ($('.nav-mobile').hasClass('dropdown-is-active')) {
      toggleNav()
    }
    toggleRecherche()
    return false
  })

  // Met la navigation mobile à la même hauteur que la page
  var hauteurNavMobile = $(document).height() - $('.normes-ul-entete').height()
  $('.nav-mobile, .nav-mobile-content').css('height', hauteurNavMobile)
})

function toggleNav () {
  $('.nav-mobile').toggleClass('dropdown-is-active')
  $('.nav-mobile-trigger').toggleClass('dropdown-is-active')
  if ($('.nav-mobile').hasClass('dropdown-is-active')) { // Si l'utilisateur a navigué passé le 1er niveau puis ferme le menu, s'il l'ouvre à nouveau, il revient au 1er au 1er niveau
    $('.has-children ul').addClass('is-hidden')
    $('.move-out').removeClass('move-out')
    $('.is-active').removeClass('is-active')
  }
}

function toggleRecherche () {
  $('.normes-ul-entete .recherche').toggleClass('ouvert')
  $('.normes-ul-entete .icon-recherche').toggle()
  $('.normes-ul-entete .icon-close').toggle()

  var hauteurStrate = $('#section-recherche').css('height').replace('px', '')

  // Animation $ au lieu de CSS parce qu'animer la hauteur, c'est compliqué (cascade) et faire un déplacement aussi, à cause des z-index.
  // On part l'animation à une hauteur de 14px, ce qui correspond à "l'overlap" entre l'entête et le menu. C'est cet "overlap" qui empêche d'utiliser slideToggle parce que ça créé un "flash" blanc.
  if ($('.normes-ul-entete .recherche').hasClass('ouvert')) {
    $('#section-recherche').height(14)
    $('#section-recherche').show()
    $('#section-recherche').animate({ height: hauteurStrate }, 100)
    $('#section-recherche input').focus()
  } else {
    $('#section-recherche').animate({ height: 14 }, 100, 'swing', function () {
      $('#section-recherche').hide()
      $('#section-recherche').height(hauteurStrate)
    })
  }
}
