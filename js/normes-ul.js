jQuery(document).ready(function(jQuery){

	// Gestion des langues
	if (jQuery('html[lang^="en"]').attr('lang')) {
		var texteLienRetour = "Back";
	} else {
		var texteLienRetour = "Retour"; // Défaut
	}

	// Rapatriement de l'arborescence de menu pour le menu mobile
	jQuery('.normes-ul-navigation-principale').first().children('div').children('ul').clone().addClass('nav-mobile-content').css('height',jQuery('.nav-mobile').height()).appendTo('.nav-mobile');

	// Ajout des classes nécessaires au fonctionnement du menu mobile
	jQuery('.nav-mobile-content li:has(ul)').addClass('has-children');
	jQuery('.nav-mobile-content ul:not(.nav-mobile-general ul)').addClass('is-hidden');
	jQuery('.nav-mobile-content > li:last-of-type').addClass('dernier-item-principal');

	// Ajout du menu général
	jQuery('.nav-mobile-content > li:last-of-type').after(jQuery('.navigation-generale li').clone().addClass("general"));

	// Si nécessaire, ajout du lien pour le changement de langue
	if(jQuery('.switch-langue').length > 0) {
		jQuery('.nav-mobile-content .general').first().before(jQuery('.switch-langue').clone());
		jQuery('.nav-mobile-content .switch-langue').wrap('<li class="langue"></li>');
	}

	// Ajout des liens de retour
	jQuery('.nav-mobile-content ul > li:first-of-type').each( function (){
		var page_parent = jQuery(this).parent().parent().parent().parent().children('a');
		var page_current = jQuery(this).parent().parent().children('a');
		if (jQuery(this).parent().parent().parent().attr('class') == 'nav-mobile-content') {
			jQuery(this).before('<li class="go-back"><a href="#0">' + texteLienRetour + '</a></li><li class="current"><a href="' + page_current.attr("href") + '">' + page_current.text() + '</a></li>');
		} else {
			jQuery(this).before('<li class="go-back"><a href="#0">' + texteLienRetour + '</a></li><li class="current"><a href="' + page_current.attr("href") + '">' + page_current.text() + '</a></li>');
		}
	});

	jQuery('.nav-mobile-trigger').on('click', function(){
		toggleNav();
		if (jQuery('.normes-ul-entete-ul .recherche').hasClass('ouvert')) {
			toggleRecherche();
		}
		return false;
	});

	jQuery('.nav-mobile .has-children').children('a').on('click', function(){
		var selected = jQuery(this);
		selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
		return false;
	});

	jQuery('.nav-mobile .go-back').on('click', function(){
		var selected = jQuery(this),
			visibleNav = jQuery(this).parent('ul').parent('.has-children').parent('ul');
		selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
		return false;
	});

	jQuery('.normes-ul-entete-ul .recherche').click(function() {
		if (jQuery('.nav-mobile').hasClass('dropdown-is-active')) {
			toggleNav();
		}
		toggleRecherche()
		return false;
	});

	// Met la navigation mobile à la même hauteur que la page
	var hauteurNavMobile = jQuery(document).height() - jQuery('.normes-ul-entete-ul').height();
	jQuery('.nav-mobile, .nav-mobile-content').css('height', hauteurNavMobile);

});

function toggleNav(){
  jQuery('.nav-mobile').toggleClass('dropdown-is-active');
  jQuery('.nav-mobile-trigger').toggleClass('dropdown-is-active');
  if (jQuery('.nav-mobile').hasClass('dropdown-is-active')) { // Si l'utilisateur a navigué passé le 1er niveau puis ferme le menu, s'il l'ouvre à nouveau, il revient au 1er au 1er niveau
      jQuery('.has-children ul').addClass('is-hidden');
      jQuery('.move-out').removeClass('move-out');
      jQuery('.is-active').removeClass('is-active');
  }
}

function toggleRecherche(){
  jQuery('.normes-ul-entete-ul .recherche').toggleClass('ouvert');
  jQuery('.normes-ul-entete-ul .icon-recherche').toggle();
  jQuery('.normes-ul-entete-ul .icon-close').toggle();
  
  var hauteurStrate = jQuery('#section-recherche').css("height").replace('px', '');
  
  // Animation jQuery au lieu de CSS parce qu'animer la hauteur, c'est compliqué (cascade) et faire un déplacement aussi, à cause des z-index.
  // On part l'animation à une hauteur de 14px, ce qui correspond à "l'overlap" entre l'entête et le menu. C'est cet "overlap" qui empêche d'utiliser slideToggle parce que ça créé un "flash" blanc.
  if (jQuery('.normes-ul-entete-ul .recherche').hasClass('ouvert')) {
    jQuery('#section-recherche').height(14);
    jQuery('#section-recherche').show();
    jQuery('#section-recherche').animate({height: hauteurStrate}, 100);
    jQuery('#section-recherche input').focus();
  } else {
    jQuery('#section-recherche').animate({height: 14}, 100, 'swing', function() {
      jQuery('#section-recherche').hide()
      jQuery('#section-recherche').height(hauteurStrate);
    });
  }
}
