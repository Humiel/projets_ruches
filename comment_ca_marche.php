<?php include('includes/head.php'); ?>
<body>
  <style>
    header {
      position: relative;
      background-image: url('/img/ciel_bleu.png');
      background-size: cover;
      background-position: center;
      color: #ffffff;
      padding: 2rem;
      text-align: center;
      overflow: hidden;
      max-width: 100%;
      box-sizing: border-box;
    }
    header::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(65, 103, 217, 0.3);
      z-index: 1;
    }
    header > * {
      position: relative;
      z-index: 2;
    }
  </style>
  <?php include('includes/header.php'); ?>
  <?php include('includes/menu.php'); ?>

  <main>
    <section>
      <h2>Pourquoi agir&nbsp;?</h2>
      <p>
        Le logement est un droit fondamental. Pourtant, l’accès à la propriété est de plus en plus difficile. <strong>Accession Citoyenne</strong> propose un modèle simple : permettre à chacun de devenir propriétaire progressivement, par l’effort, l’épargne, et sans spéculation.
      </p>
    </section>

    <section>
      <h2>Notre vision</h2>
      <ul>
        <li>Accéder par le travail et l’épargne, sans dette massive.</li>
        <li>Protéger l’épargne et sécuriser les parcours de vie.</li>
        <li>Valoriser le travail réel, refuser la rente passive.</li>
      </ul>
    </section>

    <section>
      <h2>Le parcours en 3 étapes</h2>
      <ol>
        <li><strong>S’accorder :</strong> un contrat clair entre propriétaire et occupant.</li>
        <li><strong>Construire :</strong> usage + épargne mensuelle = propriété progressive.</li>
        <li><strong>Accéder :</strong> propriété totale au terme du parcours.</li>
      </ol>
    </section>

    <section id="soutenir">
      <h2>Rejoindre le mouvement</h2>
      <p>Envie de soutenir ou de rejoindre <strong>Accession Citoyenne</strong>&nbsp;?</p>
      <ul>
        <li>Signer la pétition.</li>
        <li>Partager autour de vous.</li>
        <li>Participer à nos projets pilotes.</li>
      </ul>
    </section>
      <section>
      <h2>Comment ça marche&nbsp;?</h2>
      <ol style="padding-left: 1.5rem; line-height: 1.6;">
        <li><strong>Vous êtes locataire</strong> et vous cherchez à vous installer durablement sans vous endetter auprès d'une banque.</li>
        <li><strong>Un propriétaire</strong> accepte de signer un contrat d’<strong>Accession Citoyenne</strong> avec vous. Le prix est fixé, le contrat est clair.</li>
        <li><strong>Chaque mois</strong>, vous payez un montant qui couvre à la fois l’usage du logement (loyer) et une épargne versée pour devenir progressivement propriétaire.</li>
        <li><strong>Votre épargne est protégée</strong> et vous pouvez suivre l'évolution de votre part de propriété dans le bien.</li>
        <li><strong>Au terme du contrat</strong>, vous devenez pleinement propriétaire, sans crédit, à la seule force de votre usage et de votre épargne.</li>
      </ol>
    </section>

  </main>

  <?php include('includes/footer.php'); ?>
</body>
</html>
