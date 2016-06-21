var imgSepia= "../image/desktop/sepia/";
var imgCouleur= "../image/desktop/couleur/";
var txtAffiche ="none"; //contient le nom du texte en cours d'affichage
var mesTextes = new Object();   // contient mes différents textes avec leur nom en tant que clé


mesTextes.bac= "<h1>Baccalauréat</h1><h2>18 ans. </h2>Je veux comprendre, savoir comment ça marche, comment on fonctionne. \
Je prépare un <span>bac scientifique (D)</span> que j'obtiens avec <span>mention Assez Bien</span>.\
<h2>Vers les études</h2>Je m'inscris alors à l'université en biologie.\
Je pars à la grande ville : Caen, capitale Bas-Normande!";

mesTextes.biochimie="<h1>Université</h1><h2>Biologie </h2>Je sors du bac, toujours interessé par la science\
 et le fonctionnement la vie je m'inscris en <span>DEUG de biologie </span> à l'université de Caen.\
 J'y découvre la biochimie\
<h2>Biochimie</h2>Je continue alors en licence de biochimie. \
<p>Je suis parti pour être un grand chercheur au service du public ! En maîtrise, en pénétrant dans les laboratoires \
je cotoie de plus près mes professeurs et découvre l'envers du décor</p>\
J'abandonne ";

mesTextes.graduat= "<h1>Formation continue</h1><h2>Graduat</h2><p>En 2001 je suis <span>major de promotion</span> d'un Graduat d'<span>informatique de Gestion</span>\
<h2>Motivations</h2><p>Après quelques boulots plus\
  ou moins interessants pendant lesquels j'ai redécouvert l'informatique, je décide de m'y former.</p>\
  <h2>Où et comment?</h2><p>Pendant 3 ans j'irais 4 soirs/semaine après le boulot à l'école de commerce\
   de Wavre suivre un Graduat d'informatique de Gestion</p>\
   <h2>contenu</h2>\
   <ul>\
    <li>Programmation :\
      <ul><li>C, C++</li>\
          <li>java</li>\
      </ul>\
    </li>\
    <li>Base de données :\
      <ul><li>SQL,</li>\
        <li>analyse Meurise</li>\
        <li>Oracle</li>\
      </ul>\
    </li>\
    <li>Réseau</li>\
    <li>bases linux</li>\
    </ul>";

    mesTextes.mos= "<h1>Formation continue</h1><h2>MancheOpen School</h2>\
    <p>En avril 2016 je débute une formation de <span>référent numérique</span> à la MOS</p> \
    <h2>Motivations</h2><p>Après quelques temps de formateur vacataire je souhaitais m'installer\
     à mon compte en tant que <span>consultant informatique</span> pour artisans, commerçants, TPE..<br/>\
     Après quelques temps sans être sur le terrain je souhaitais me mettre à niveau sur les nouvelles\
      pratiques et rafraichie mes connaissances</p>\
      <h2>Où et comment?</h2>\
      <p>Cette formation est dispensée à Saint-Lô pendant 6 mois 5 jours/semaine  et suivie de 2 mois de stage.</p>\
       <h2>contenu</h2>";

       formateur95="formateur95 à remplir";
       magasinnier="magasinnier à remplir";
       abapeur="abapeur à remplir";
       responsable="responsable à remplir";
       formateur_info="formateur_info à remplir";
mesTextes.contact="<h1>En savoir plus?</h1>\
            <h2>Me contacter</h2>\
            <form class='contacts' action='traitement.php' method='post'>\
                <p> Les champs marqués d'un astérisque sont obligatoires</p>\
                <fieldset id='coordo'>\
                    <legend>Vos coordonnées</legend>\
                    <label for='nom'>Nom <span>*</span></label>\
                    <input type='text' class='trait' name='nom' id='nom' placeholder='votre nom' autofocus required/></br>\
                    <label for='prenom'>Prénom</label>\
                    <input type='text' class='trait' name='prenom' id='prenom' placeholder='prénom' /></br>\
                    <label for='entreprise'>Entreprise</label>\
                    <input type='text' class='trait' name='entreprise' id='entreprise' placeholder='entreprise' /></br>\
                    <label for='email'>E mail <span>*</span></label>\
                    <input type='email' class='trait' name='email' id='email' placeholder='nom@domaine.com' required/></br>\
                    <label for='tel'>Télephone></label>\
                    <input type='tel' class='trait' name='tel' id='tel' /></br>\
                </fieldset>\
                <fieldset id ='msg'>\
                    <legend>N'hesitez pas à me dire ce que vous voulez</legend>\
                    <textarea name='demande' id='demande'>Tapez votre message ici</textarea>\
                </fieldset>\
                <input type='submit' value='Envoyer' />\
            </form>\
            <h2>Me retrouver?</h2>\
            <a href='#' class='social'><i class='fa fa-twitter fa-2x' aria-hidden='true'>twitter</i></a>\
            <a href='#' class='social'><i class='fa fa-linkedin fa-2x' aria-hidden='true'>link</i></a>"
