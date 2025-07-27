<?php
define('ROOT_PATH', __DIR__);
include(ROOT_PATH . "/includes/header.php"); ?>

<main class="container my-4">
  <?php include(ROOT_PATH . "/includes/section_intro.php"); ?>
  <?php include(ROOT_PATH . "/includes/section_fonctions.php"); ?>
  <?php include(ROOT_PATH . "/includes/section_debats.php"); ?>
  <?php include(ROOT_PATH . "/includes/section_participer.php"); ?>
  <?php include(ROOT_PATH . "/includes/section_charte.php"); ?>
  <?php include(ROOT_PATH . "/includes/section_amendements.php"); ?>
</main>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<?php include(ROOT_PATH . "/includes/footer.php"); ?>