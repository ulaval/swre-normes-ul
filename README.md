# Normes d'entête et de pied de page web de l'Université Laval (PIV)

Ces fichiers (CSS, JavaScript et images) sont nécessaires à l’implantation des normes d'entête et de pied de page web de l'Université Laval.

Le HTML qui servira à créer les gabarits dans votre CMS peut-être généré en remplissant le formulaire suivant :
http://ressourcesweb.ulaval.ca/normes-institutionnelles/generateur-de-code/

Il n’est pas recommandé de modifier les fichiers sources. Si des ajustements sont nécessaires, ces derniers devraient être faits dans du code surchargeant celui des normes afin de faciliter la maintenance.

## Style de code

"Adopting standard style means ranking the importance of code clarity and community conventions higher than personal style."
https://standardjs.com/#why-should-i-use-javascript-standard-style

L'indentation devrait être gérée par le fichier .editorconfig. Voir https://editorconfig.org pour les éditeurs ou modules compatibles.

Le linter Stylelint est utilisé pour gérer le style des CSS. On utilise les règles stylelint-config-standard (https://github.com/stylelint/stylelint-config-standard) plus quelques règles maisons et les modules nécessaires. Voir .stylelintrc et package.json pour les configurations.

"JavaScript Standard Style" (https://standardjs.com) est utilisé pour gérer le style du JavaScript.

La commande "grunt serve" exécutera standard (JS) et stylelint (voir Gruntfile.js). Standard et stylelint ont un CLI en plus des modules Grunt. Il est donc possible de réparer les erreurs automatiquement.

## Version

Voir le tag dans le log git.

## Auteur

Nicolas Pelletier pour le
Bureau des services Web de l'Université Laval
https://ressourcesweb.ulaval.ca/
web@bsw.ulaval.ca
