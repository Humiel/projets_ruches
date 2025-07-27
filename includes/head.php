<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Accession Citoyenne</title>
  <link rel="icon" type="image/x-icon" href="img/favicon.ico">
  <!-- <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" /> -->
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
  <link href="node_modules/remixicon/fonts/remixicon.css" rel="stylesheet">
  <style>
    :root {
      --bleu-fonce: #084F8C;
      --bleu-clair: #79BAF2;
      --vert: #0F7BA6;
      --vert-fonce: #284021;
      --vert-pastel: #ACE5F2;
    }

    body {
      font-family: 'Montserrat', sans-serif;
      /* font-family: 'Inter', sans-serif; */
      margin: 0;
      padding: 0;
      background-color: #ACE5F231;
      color: #333;
    }

    header {
      position: relative;
      top: 0em;
      background-image: url('img/ciel_bleu.avif');
      background-size: cover;
      background-position: center calc(50% - 17em);
      background-attachment: fixed;
      color: #ffffff;
      padding: 2em;
      text-align: center;
      overflow: hidden;
      box-sizing: border-box;
    }

    header::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(8, 79, 140, 0.31);
      /* voile coloré */
      z-index: 1;
    }

    header>* {
      position: relative;
      z-index: 2;
      text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
      /* ombre sur texte */
    }


    header img {
      width: 6em;
      vertical-align: middle;
    }

    nav {
      background: var(--bleu-fonce);
      display: flex;
      justify-content: center;
      gap: 1rem;
      padding: 1rem 0;
    }

    nav a {
      color: #ffffff;
      text-decoration: none;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      transition: background 0.3s;
    }

    nav a:hover {
      background: var(--vert-pastel);
      color: var(--vert);
    }

    nav a.active {
      background: #fff;
      color: var(--bleu-fonce);
    }

    .menu li.dropdown>a {
      background-color: var(---bleu-fonce);
      color: var(--bleu-fonce);
      border-radius: 1em;
      padding: 1rem 1rem;
      transition: background 0.3s;
    }

    .menu li.dropdown:hover>a {
      background-color: var(--vert);
      color: #fff;
    }

    /* Sous-menu caché par défaut */
    .submenu {
      display: none;
      position: absolute;
      background-color: var(--bleu-clair);
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      top: 100%;
      left: 0;
      z-index: 1000;
    }

    .back-to-top {
      position: fixed;
      bottom: 1.4em;
      right: 1em;
      background: var(--bleu-fonce);
      color: white;
      font-size: 1.5rem;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      transition: opacity 0.3s ease, visibility 0.3s ease;
      opacity: 0;
      visibility: hidden;
      z-index: 100;
      opacity: .5;
    }

    .back-to-top.show {
      opacity: 1;
      visibility: visible;
    }

    .back-to-top:hover {
      background-color: var(--vert-pastel);
      color: var(--vert);
    }

    li {
      line-height: 2em;
    }

    p {
      line-height: 1.6em;
    }


    /* Desktop : afficher au survol */
    @media (min-width: 769px) {
      .dropdown:hover .submenu {
        display: block;
      }
    }

    /* Mobile : afficher si .open est actif */
    @media (max-width: 768px) {
      .dropdown.open .submenu {
        display: block;
        position: relative;
        box-shadow: none;
        margin-left: 1rem;
        border-radius: 0;
      }
    }


    .submenu a {
      padding: 0.6rem 1rem;
      color: #fff;
    }

    .submenu a:hover {
      background: var(--bleu-primaire);
    }

    main {
      max-width: 960px;
      margin: auto;
      padding: 3rem 2rem;
    }

    section {
      margin-bottom: 3rem;
    }

    section h2 {
      color: var(--bleu-fonce);
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    .manifeste p {
      text-align: center;
      padding-bottom: 1em;
    }

    .manifeste h2 {
      text-align: center;
      padding-bottom: 1em;
    }

    footer {
      background: var(--bleu-fonce);
      color: white;
      text-align: center;
      padding: 2rem;
      font-size: 0.9rem;
      margin-top: 3rem;
      line-height: 2em;
      /* bottom: 0;
      position: absolute; */
    }

    form {
      margin-top: 1rem;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.8rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    button {
      background: var(--bleu-fonce);
      color: #FFF;
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 30px;
      font-weight: 600;
    }

    button:hover {
      background-color: var(--vert-pastel);
      color: var(--vert);
    }

    .success {
      color: green;
    }

    .error {
      color: red;
    }

    .signature-list {
      margin-top: 2rem;
    }

    .signature {
      padding: 0.5rem 0;
      border-bottom: 1px solid #ddd;
    }
  </style>
</head>