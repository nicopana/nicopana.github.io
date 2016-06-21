/*********************************************************************
                 ==redimensionnement du fond et des images
*********************************************************************/
/**
 * Redimensionne le div contenant l'image de fond à la taille de cette image
 * et met le div contenant le texte à 100% de son contenant, incluant le padding et les borudres
 * @return {[type]} [description]
 */
function redimensionnement() {
    var $image = $('#fond');
    var image_width = $image.width();
    var image_height = $image.height();
    // console.log('image de fond:' + image_width + ' X ' + image_height);
    $('#main').css({
        'width': image_width + 'px',
        'height': image_height + 'px'
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
$(document).ready(function() {
    // Au chargement initial
    redimensionnement();
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

function fonduEnchaine($elt1, $elt2) {
    $elt1.removeClass('transparent').addClass('opaque');
    $elt2.removeClass('opaque').addClass('transparent');
}

function enleveFilms() {
  var flag = $('.box_image').hasClass('transparent')
    if (flag) {
        fonduEnchaine($('.box_image'), $('#films'));
    }
    return flag;
};
/*********************************************************************
                 ==fonction affichage texte
*********************************************************************/

/**
 * remet le panneau texte au &er plan, a uliisé une fois que le texte est affiché
 * le but étant de laisser le texte sous le nuage pdt l'ouverture
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 * NE MARCHE PAS JE NE COMPREND PAS POURQUOI!!!!!!!!!!!!!
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
function textePremierplan() {
    $('nuage_txt').zIndex("4");
};

function texteSecondPlan() {
    $('nuage_txt').css({
        'z-index': 1
    });
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
 * [ferme le nuage dans lequel le texte s'est affiché]
 * @return {[type]} [description]
 */
function fermeNuage() {
    texteSecondPlan();
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
      if (txtAffiche!="none") {
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
        }, 450);
    }
    txtAffiche="none";
};

/**
 * Remplit le texte du nuage, enlève la classe,
 * met le nom de la clé mesTextes ds la variable txtAffiche
 * @param  {[string]} mon_texte [clé de la variable texte à afficher (tableau mesTextes)]
 * @return {[type]}           [description]
 */
function giveTxt(mon_texte) {
  txtAffiche=mon_texte;
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
function afficheTableau(mon_texte, ma_classe) {
  // alert("nuage_txt:" + $('#nuage_txt').html()+ "mon_texte:" + mon_texte );
  // if ($('#nuage_txt').html() == mon_texte) {
  if (txtAffiche == mon_texte) {
      return false;}

    enleveFilms();
    var attente = 10; // temps d'attente pour charger le texte dépend si il ouvre le nuage ou pas.
    //si il n'y a pas de texte affiché => ouvre le nuage
    // if ($('#nuage_txt').html() == "") {
      if (txtAffiche == "none") {
        ouvreNuage();
        //sinon enlève l'ancien texte
    } else {
        fadeTxt();
        attente = 450;
    }
    setTimeout(function() {
        giveTxt(mon_texte)
    }, attente);
    if (ma_classe != null) {
        setTimeout(function() {
            $('#nuage_txt').addClass(ma_classe)
        }, attente);
    }
    setTimeout(function() {
        textePremierplan()
    }, attente);
};



// Clic sur le fond : affiche comme au départ
$(function() {
    $('#fond').click(function() {
        enleveFilms();
        fadeTxt();
        fermeNuage();
    })
});

// Affiche bac
$(function() {
    $('#bac').click(function() {
        afficheTableau("bac", null);
    });
});


// affiche  biochimie
$(function() {
    $('#biochimie').click(function() {
        afficheTableau("biochimie", null);
    });
});
// Affiche graduat
$(function() {
    $('#graduat').click(function() {
        afficheTableau("graduat", 'SF');
    });
});
// Affiche mos
$(function() {
    $('#mos').click(function() {
        afficheTableau("mos", 'SF');
    });
});
// Affiche formateur95
$(function() {
    $('#formateur95').click(function() {
        afficheTableau(formateur95, null);
    });
});
// Affiche magasinnier
$(function() {
    $('#magasinnier').click(function() {
        afficheTableau(magasinnier, null);
    });
});
// Affiche abapeur
$(function() {
    $('#abapeur').click(function() {
        afficheTableau(abapeur, null);
    });
});
// Affiche responsable formateur_info
$(function() {
    $('#responsable').click(function() {
        afficheTableau(responsable, null);
    });
});
// Affiche formateur_info
$(function() {
    $('#formateur_info').click(function() {
        afficheTableau(formateur_info, null);
    });
});
// Affiche contact
$(function() {
    $('#contact').click(function() {
        afficheTableau("contact", null);
    });
});

$(function() {
    $('#silo_film').click(function() {
        fadeTxt();
        fonduEnchaine($('#films'), $('.box_image'));
    });
});
