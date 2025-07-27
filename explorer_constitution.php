<?php
define('ROOT_PATH', __DIR__);
include(ROOT_PATH . "/includes/header.php");
?>

<main class="container my-4">
  <section class="bg-section p-4 rounded shadow-soft mb-4">
    <h2 class="h5">Explorer la Constitution</h2>
    <p>Voici une sélection d'articles de la CartoClivages, en cours de rédaction collaborative.</p>

    <article class="bg-white p-3 border-start border-primary border-4 rounded mb-3">
      <h3 class="h6 mb-1">Article 1 : La République Commune</h3>
      <p class="mb-0">
        La République est une communauté souveraine. Elle reconnaît la pluralité des visions du monde et organise leur coexistence équitable.
      </p>
    </article>

    <article class="bg-white p-3 border-start border-primary border-4 rounded mb-3">
      <h3 class="h6 mb-1">Article 2 : Le pouvoir du peuple</h3>
      <p class="mb-0">
        Tout pouvoir découle du consentement éclairé des citoyens. Ce consentement ne peut être délégué sans droit de contrôle et de révocation.
      </p>
    </article>

    <div class="placeholder mt-4">
      Les autres articles seront publiés au fil de la participation citoyenne.
    </div>
  </section>
</main>

<?php include(ROOT_PATH . "/includes/footer.php"); ?>
