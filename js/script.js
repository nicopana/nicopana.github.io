/*********************************************************************
                 ==redimensionnement du fond et des images
*********************************************************************/
/**
 * Redimensionne le div contenant l'image de fond à la taille de cette image
 * et met le div contenant le texte à 100% de son contenant, incluant le padding et les borudres
 * @return {[type]} [description]
 */
function redimensionnement() {
    // donne la taille de l'image de fond au main et le centre
    var $image = $('#fond');
    var image_width = $image.width();
    var image_height = $image.height();
    var gauche = ($(window).width() - image_width) / 2;
    // Si gauche<0, on ne met pas de marge => gauche =0
    gauche = (gauche > 0) ? gauche : 0;

    $('#main').css({
        'width': image_width + 'px',
        'height': image_height + 'px',
        'left': gauche + 'px'
    });


    //ajuste la largeur du texte au container : tient compte des bordures et marges
    //le outerWidth ne fonctionnait pas bien
    var barre = 0;
    var txtWidth = $('#nuage_container').width();
    txtWidth = txtWidth - parseInt($('#nuage_txt').css("padding-left"), 10) - parseInt($('#nuage_txt').css("padding-right"), 10);
    txtWidth = txtWidth - parseInt($('#nuage_txt').css("borderLeftWidth"), 10) - parseInt($('#nuage_txt').css("borderRightWidth"), 10);
    txtWidth = txtWidth + barre;
    $('#nuage_txt').css({
        'width': txtWidth + "px"
    });
    var txtHeigth = $('#nuage_container').height();
    txtHeigth = txtHeigth - parseInt($('#nuage_txt').css("padding-top"), 10) - parseInt($('#nuage_txt').css("padding-bottom"), 10);
    txtHeigth = txtHeigth - (2 * parseInt($('#nuage_txt').css("borderTopWidth"), 10));
    $('#nuage_txt').css({
        'height': txtHeigth + "px"
    });
    //centre les affiches de film dans le container
    var margeGauche = $('#nuage_container').width() - $('#films').width();
    margeGauche = margeGauche / 2;
    $('#films').css({
        'left': margeGauche + 'px'
    })
};
//EVENEMENTS
// Redimensionne qd TOUT (bibli et images) est chargé
$(window).load(function() {
redimensionnement();
});

$(document).ready(function() {
    // En cas de redimensionnement de la fenêtre
    $(window).resize(function() {
        $('#main').css({
            'width': '100%',
            'height': '100%'
        });
        redimensionnement();
    });
});
/*********************************************************************
                 ==fonction affichage films
*********************************************************************/

/**
 * [fonduEnchaine efface une image pendant que ça affiche une autre image]
 * @method fonduEnchaine
 * @param  {[type]}      $elt1 [image à afficher]
 * @param  {[type]}      $elt2 [image à effacer]
 * @return {[type]}            [description]
 */
function fonduEnchaine($elt1, $elt2) {
    $elt1.removeClass('transparent').addClass('opaque');
    $elt2.removeClass('opaque').addClass('transparent');
}

function enleveFilms() {
    var flag = $('.box_image').hasClass('transparent')
    if (flag) {
        $('#films').css('z-index', 4);
        fonduEnchaine($('.box_image'), $('#films'));
        setTimeout(function() {
            $('#films').css('z-index', 1)
        }, (500));
    }
    return flag;
};
/*********************************************************************
                 ==fonction affichage texte
*********************************************************************/
/**
 * [ferme le nuage dans lequel le texte s'est affiché]
 * @return {[type]} [description]
 */
function fermeNuage() {
    $('#nuage_container').find('.left').animate({
        right: 0
    }, {
        queue: false,
        duration: 300
    });
    $('#nuage_container').find('.right').animate({
        left: 0
    }, {
        queue: false,
        duration: 300
    });
};

/**
 * Replie et fait disparaitre le texte du nuage.
 * @return {[type]} [description]
 */
function fadeTxt() {
    //si il n'y a pas de texte, ne fait rien!
    // if ($('#nuage_txt').html() != "") {
    if (ItemClic != "none") {
        var mon_texte = "";
        //recupere la hauteur du panneau  de texte (nuage_txt)
        var height = $('#nuage_txt').outerHeight() + 40;
        //fait descendre le panneau de texte
        $('#nuage_txt').animate({
            top: height
        }, {
            queue: false,
            duration: 500,
        });
        //vide le contenu de nuage_txt
        $('#nuage_txt').html(mon_texte);
        setTimeout(function() {
            $('#nuage_txt').removeClass()
        }, 350);
    }
};

/**
 * ouvre le nuage pour faire apparaitre du texte ou autre chose
 * @return {[type]} [description]
 */
function ouvreNuage() {
    //... we get the width of the div and split it by 2  ...
    var width = $('.image_holder').outerWidth() / 2;
    /*... and using that width we move the left "part" of the image to left and right "part"
    to right by changing it's indent from left side or right side... '*/
    $('#nuage_container').find('.left').animate({
        right: width
    }, {
        queue: false,
        duration: 300
    });
    $('#nuage_container').find('.right').animate({
        left: width
    }, {
        queue: false,
        duration: 300
    });
};

/**
 * Remplit le texte du nuage, enlève la classe,
 * met le nom de la clé mesTextes ds la variable txtAffiche
 * @param  {[string]} mon_texte [clé de la variable texte à afficher (tableau mesTextes)]
 * @return {[type]}           [description]
 */
function giveTxt(mon_texte) {
    $('#nuage_txt').html(mesTextes[mon_texte]);
    var height = $('#nuage_txt').outerHeight();
    //place le texte au-dessus du nuage
    $('#nuage_txt').css({
            'top': -height + 'px'
        })
        //fait descendre le texte
    $('#nuage_txt').animate({
        top: 0
    }, {
        queue: false,
        duration: 500
    });
};

/**
 * [affiche le tableau contenant les infos idoines, fait descendre le tableau
 * précédent ou fait fondre les films ]
 * @param  {[texte]} mon_texte [clè du tableau mesTextes du texte à afficher]
 * @param  {[texte]} ma_classe [classe à affecter, si pas de classe : null]
 * @return {[type]}           [description]
 */
function afficheTableau(item, ma_classe) {
    if (ItemClic == "silo_film") {
        enleveFilms();
        ouvreNuage();
    };
    var attente = 10; // temps d'attente pour charger le texte dépend si il ouvre le nuage ou pas.
    //si il n'y a pas de texte affiché => ouvre le nuage
    if (ItemClic == "none") {
        ouvreNuage();
        //sinon enlève l'ancien texte
    } else {
        fadeTxt();
        attente = 400;
    }
    setTimeout(function() {
        giveTxt(item)
    }, attente);
    if (ma_classe != null) {
        setTimeout(function() {
            $('#nuage_txt').addClass(ma_classe)
        }, attente);
    }
};

/*********************************************************************
                 ==Navigation
*********************************************************************/
/**
 * afficheInit remet l'affichage comme au début:
 * vide le texte, enleve les films, ferme le nuage, remet ItemClic à "none"
 * @method afficheInit
 * @return {[type]}    [description]
 */
function afficheInit() {
    if (ItemClic == 'silo_film') {
        enleveFilms();
    }
    if ($('#' + ItemClic).hasClass('texte')) {
        fadeTxt();
    }
    fermeNuage();
    ItemClic = "none";
};

/**
 * [clicItem affiche du texte ou une photo en fonction de l'élément cliqué.]
 * @param  {[objet du DOM]} $item    [ : image cliquée]
 * @param  {[String]} maClasse [Classe du texte à afficher, si pas de classe mettre NULL]
 * @return {[type]}          [description]
 */
function clicItem($item, maClasse) {
    //item reçoit le (id) de l'objet cliqué au format string.
    var item = $item.attr('id');

    // ItemClic (var globale) contient l'id du dernier item cliqué et activé.
    // si on reclique sur le même : affichage comme au début et remise à "none" de ItemClic
    if (ItemClic == item) {
        afficheInit();
        //remet l'image en sepia
        $item.css('background-image', "url('" + imgSepia + item + ".png')");
        //si on ne clique pas sur le même élément : affiche ce qui doit etre affiché!
    } else {
        if ($item.hasClass('texte')) {
            afficheTableau(item, maClasse);
        } else if (item == "silo_film") {
            // Affiche films
            // met la photo des films en avant
            $('#films').css('z-index', 4);
            fonduEnchaine($('#films'), $('.box_image'));
            // fadeTxt();
            setTimeout(function() {
                fadeTxt()
            }, (00));
        }
        //met l'image en couleur
        $item.css('background-image', "url('" + imgCouleur + item + ".png')");
        //remet le dernier cliqué en sepia
        $("#" + ItemClic).css('background-image', "url('" + imgSepia + ItemClic + ".png')");
        // met à jour l'id de l'item cliqué
        ItemClic = item;
    }
};
/*********************************************************************
                 ==interactions
*********************************************************************/

$(function() {

    // Clic sur le fond : affiche comme au départ
    $('#fond').click(function() {
        //remet le dernier cliqué en sepia
        $("#" + ItemClic).css('background-image', "url('" + imgSepia + ItemClic + ".png')");
        afficheInit();
    });
    // Affiche texte mise en forme handwriting
    $('.ImgHandwriting').click(function() {
        clicItem($(this), null);
    });
    // Affiche texte mise en forme SF
    $('.ImgSF').click(function() {
        clicItem($(this), "SF");
    });

    // Affiche films
    $('#silo_film').click(function() {
        clicItem($(this), null);
    });
});
