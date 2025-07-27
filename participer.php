<?php
  define('ROOT_PATH', __DIR__);
  include(ROOT_PATH . "/includes/header.php");
?>


<main class="container my-4">
  <section class="bg-section p-4 rounded shadow-soft mb-4">
    <h2 class="h5">Participer au projet</h2>
    <p class="mb-3">Voici différentes façons de t’impliquer dans la Constitution Partagée :</p>

    <ul class="list-unstyled ps-3">
      <li class="mb-2">📝 Proposer un amendement à un article existant</li>
      <li class="mb-2">📍 Rejoindre ou créer un Conseil citoyen local</li>
      <li class="mb-2">📢 Organiser un atelier de lecture collective</li>
      <li class="mb-2">📬 S'inscrire à la lettre d'information</li>
    </ul>

    <a href="amendements.php" class="btn btn-primary-custom mt-3">Je propose un amendement</a>
  </section>
</main>

<?php include(ROOT_PATH . "/includes/footer.php"); ?>
