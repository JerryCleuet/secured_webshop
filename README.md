# Secured webshop

Ce repository est utilisé dans le cadre du projet secured_webshop pour le cours 183 - Sécurité des applications

## Démarrer le projet

Voici un petit guide de démarrage pour tester mon projet secured_webshop

- Avoir un container docker pour la BD, avec l'id spécifié dans app/db/db.js
- Je recommande d'utiliser le script SQL db_users.sql présent dans le dossier /SQL de ce repo pour créer la DB, sa structure et y insérer des données de base pour user et admin.
- Le login de l'utilisateur de base est : user, 12345678
- Le login du compte admin de base est : admin, 12345678

Il est bien evidemment possible de commencer sans données d'utilisateurs et de les créer soi-même via la page /signup.

## Page de démarrage

https://localhost:3000/signup
