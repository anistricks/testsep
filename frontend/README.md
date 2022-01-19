# Création d’une SPA pour une pizzeria : Step 4 : Formulaire d’ajout de pizzas consommant l’opération d’ajout de la RESTful API de la pizzeria protégée par JWT auths

## Démarrage de la RESTful API
- Pour rappel, les steps 1 à 6 du tutorial restful-api-essentials doivent avoir été faits (`/demo/backend-restful-api/restful-api-essentials`).
- Dans un premier temps, la Restful API du step 6 doit avoir été démarré : https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/step6/.
## How to ? Création d'une page pour l'ajout de pizzas et gestion de JWT
- `AddPizzaPage` (`/Components/Pages/AddPizzaPage.js`) a été créée.  Suite à l'appel de la méthode `getSessionObject` de `/utils/session.js` permettant de désérialiser (ou parser) les données de session se trouvant (ou pas) dans le browser,  le username et le token sont récupérés s'ils existent.
- `AddPizzaPage` ne peut être affichée que pour un utilisateur authentifié. Dès lors, si un utilisateur non authentifié tente d'accéder à cette page via l'URL, `AddPizzaPage` provoquera une redirection vers `LoginPage`. 
- Lors du "submit" du formulaire d'ajout de pizza, le token de l'utilisateur est envoyé dans le `Authorization` header de la méthode `fetch` appelée au sein de `/Components/Pages/AddPizzaPage.js`. Notons qui si le token n'est pas joint à la requête, la RESTful n'autorisera pas l'opération d'ajout d'une pizza et un code d'erreur sera renvoyé au frontend.

## How to ? Mise à jour de la barre de navigation et de la configuration du router
- Afin de pouvoir afficher la nouvelle page, nous devons ajouter un lien à la `Navbar` (`/Components/Navbar/Navbar.js`).
- Il faut aussi ajouter une entrée au tableau `routes` dans le `Router` fournissant un lien entre AddPizzaPage et l'URI associé `/pizza/add`.

## Et si les données de session étaient sauvegardées dans un cookie ?
- Veuillez stopper la RESTful API du step 6.
- Veuillez démarrer la Restful API du step 8 qui prépare des cookies contenant les données de session à sauver côté client : https://github.com/e-vinci/js-demos/tree/main/backend-restful-api/restful-api-essentials/step8/.
- Avant de redémarrer votre frontend, l'application développée à ce Step 4, assurez vous de bien effacer les données de session se trouvant dans le localStorage de votre browser. Par exemple, sous Chrome, passez en mode développeur via `F12`, Clic sur `Application`, `Local Storage`, et là, sous `Local Storage`, faite un clic droit et `clear`.
- Veuillez redémarrer votre frontend une fois le Local Storage nettoyé.
- Que se passe-t-il ? Pourquoi ?

# Conclusion
- Nous avons une SPA qui commence à ressembler à un site que l'on pourrait déployer pour un client.
- Quelles sont les faiblesses actuelles ? 
    - **La gestion des droits**. Ici, seul un admin a le droit d'ajouter une pizza. Comme on utilise le username côté API pour déterminer si c'est l'utilisateur "admin" qui a fait la requête, ça n'est pas souple. On ne pourrait pas avoir plusieurs utilisateurs ayant les privilèges d'admin. 
    => L'API pourrait être améliorée en permettant la gesion des privilèges des utilisateurs. Par exemple, Luigi pourrait avoir le privilège d'admin, alors que Mario aurait le privilège de simple utilisateur.
    - On n'affiche **pas de message d'erreur** à l'utilisateur lorsque la réponse d'une API renvoie une erreur.    
    - Au niveau de la **structure du code pour vérifier l'authentification** : on pourrait améliorer les composants fonctionnels qui nécessitent une authentification avant de pouvoir être rendus (AddPizzaPage ici, mais plus tard, il pourrait y avoir de nombreuses pages nécessitant une authentification pour pouvoir être affichées).
    - Le **workflow d'authentification, s'il y a des données de session, n'interroge pas l'API pour savoir si le token est valide** avant de considérer l'utilisateur authentifié ; notons que ça n'est pas si grave, car si le token n'est pas valide, lors d'un appel à une opération nécessitant une autorisation JWT, l'API renverra un code d'erreur (et n'autorisera donc pas l'opération).
    - Bien sûr, il **manque des opérations sur les ressources** : on ne peut pas encore mettre à jour les pizza, les supprimer...
# Resources
- photo de : https://unsplash.com/ (Sahand Hoseini)
- musique de : https://freemusicarchive.org/music/Infecticide : Infecticide - Chansons Tristes - 11. Infecticide - Pizza Spinoza