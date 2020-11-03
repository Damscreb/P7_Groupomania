:computer: #groupomania

Création réseau social Groupomania

Les fonctionnalités importantes :

- Mise en ligne d'une image et d'un titre
- Répondre au post, le modifier et le supprimer
- Créer, identifier, modifier et supprimer un compte
- Créer un compte administrateur via MySQL

 
Tout d'abord il faut cloner le repo : https://github.com/Damscreb/P7_Groupomania

Puis entrons dans le dossier Groupomania grâce au terminal ou à l'invite de commande :

cd groupomania

______________________________________________


:arrow_right: Backend: 

Nous allons recréer la base de données.

Connectez vous à MySQL avec vos identifiants, puis:

Commande sql: 
``
CREATE DATABASE Groupomania;
``

______________________________________________

Création de la table users:

CREATE TABLE `users` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role` varchar(50) NOT NULL,
  `dateInscription` timestamp NOT NULL,
  `lastUpdate` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;

______________________________________________

Création de la table posts:

CREATE TABLE `posts` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `userId` smallint unsigned NOT NULL,
  `title` varchar(200) NOT NULL,
  `date` timestamp NOT NULL,
  `imageUrl` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`userId`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
 
______________________________________________

 
Création de la table commentaries:
 
CREATE TABLE `commentaries` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `userId` smallint unsigned NOT NULL,
  `postId` smallint unsigned NOT NULL,
  `date` timestamp NOT NULL,
  `comment` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_comm` (`userId`),
  KEY `fk_post_id_comm` (`postId`),
  CONSTRAINT `fk_post_id_comm` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_user_id_comm` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
 
 ______________________________________________

 
Création de la table likes:

CREATE TABLE `likes` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `userId` smallint unsigned NOT NULL,
  `postId` smallint unsigned NOT NULL,
  `type` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_like` (`userId`),
  KEY `fk_post_id_like` (`postId`),
  CONSTRAINT `fk_post_id_like` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_user_id_like` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8;
 
#########################################
 
Retournons sur le projet, dans le terminal nous sommes dans le dossier groupomania.
Lancer les commandes suivantes:
- cd backend
- npm install
    
Création d'un fichier .env :

DB_HOST=localhost

DB_USER="Votre username MySQL"

DB_PASS="Votre mot de passe MySQL"

DB_DATABASE=groupomania

TOKEN= "Créer votre propre Token"

Installer ensuite nodemon : 
- npm install -g nodemon

Et on lance le backend (dans le terminal toujours) :
- nodemon server
   

Votre backend est à présent opérationnel    
    
#########################################


:arrow_right: Frontend:

Dans un nouveau terminal ouvert depuis le dossier groupomania,
utiliser la commande suivante : 
- cd frontend

Puis :

- npm install

Et finalement :

- npm run serve

##########################

Pour créer un compte admin :

Il suffit de créer un compte grâce au site sur la page signup

Allez ensuite dans MySQL où il faut rentrer le code suivant :

``
UPDATE users
SET role = "admin"
WHERE id = "(l’id du compte à passer en admin)";
``

Par défaut le serveur client est accessible en local via le port 8080: http://localhost:8080/

Bonne navigation !