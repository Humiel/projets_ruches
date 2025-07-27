<?php 
@include_once("config.php");
if (!isset($mysqli) || !($mysqli instanceof mysqli)) {
    echo "<div class='warning'><small>⚠️ Base de données non connectée : les propositions ne peuvent pas être enregistrées.</small></div>";
    return;
}
?>

<section id="amendements">
  <h2>Proposer un amendement</h2>

  <form method="post" action="#amendements">
    <label>Article concerné :</label>
    <input type="text" name="article" required><br><br>

    <label>Votre proposition :</label><br>
    <textarea name="proposition" rows="6" cols="60" required></textarea><br><br>

    <label>Votre prénom (facultatif) :</label>
    <input type="text" name="auteur"><br><br>

    <button type="submit">Soumettre l'amendement</button>
  </form>

  <?php
  if ($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST['article']) && !empty($_POST['proposition'])) {
      $stmt = $mysqli->prepare("INSERT INTO amendements (article, proposition, auteur) VALUES (?, ?, ?)");
      $stmt->bind_param("sss", $_POST['article'], $_POST['proposition'], $_POST['auteur']);
      $stmt->execute();
      echo "<p style='color:green'>✅ Proposition enregistrée avec succès.</p>";
  }

  echo "<h3>Amendements proposés :</h3>";
  $result = $mysqli->query("SELECT * FROM amendements ORDER BY date_submitted DESC");
  while ($row = $result->fetch_assoc()) {
      echo "<div style='margin-bottom:1em; border-left:3px solid #003366; padding-left:10px;'>";
      echo "<strong>Article :</strong> " . htmlspecialchars($row['article']) . "<br>";
      echo "<strong>Proposition :</strong><br><pre>" . htmlspecialchars($row['proposition']) . "</pre>";
      if (!empty($row['auteur'])) {
          echo "<strong>Proposé par :</strong> " . htmlspecialchars($row['auteur']) . "<br>";
      }
      echo "<em>Soumis le : " . $row['date_submitted'] . "</em>";
      echo "</div>";
  }
  ?>
</section>
