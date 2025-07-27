<?php
$csvFile = __DIR__ . '/data/signatures.csv';
$errors = [];
$success = false;

// Traitement du formulaire
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $comment = trim($_POST['comment'] ?? '');

    if (!$name) $errors[] = "Le nom est obligatoire.";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Adresse email invalide.";

    if (empty($errors)) {
        $row = [$name, $email, $comment, date('Y-m-d H:i:s')];
        $fp = fopen($csvFile, 'a');
        if ($fp) {
            // Ajout du paramètre $escape pour PHP 8.1+
            fputcsv($fp, $row, ',', '"', '\\');
            fclose($fp);
            $success = true;
        } else {
            $errors[] = "Impossible d'enregistrer la signature.";
        }
    }
}

// Lecture des signatures
$signatures = [];
if (file_exists($csvFile)) {
    $lines = array_reverse(array_slice(file($csvFile), -100)); // 100 dernières
    foreach ($lines as $line) {
        $cols = str_getcsv($line, ',', '"', '\\'); // Ajout du $escape param
        if (count($cols) >= 4) {
            $signatures[] = $cols;
        }
    }
}
?>

<?php include('includes/head.php'); ?>
<body id="top">
    <?php include('includes/header.php'); ?>
    <?php include('includes/menu.php'); ?>

    <main>
        <h1>Je signe pour l’accession citoyenne</h1>

        <?php if ($success): ?>
            <p class="success">Merci pour votre signature !</p>
        <?php endif; ?>

        <?php foreach ($errors as $e): ?>
            <p class="error"><?= htmlspecialchars($e) ?></p>
        <?php endforeach; ?>

        <form method="post">
            <input type="text" name="name" placeholder="Votre nom" required>
            <input type="email" name="email" placeholder="Votre email" required>
            <textarea name="comment" placeholder="Votre message (optionnel)"></textarea>
            <button type="submit">Signer la pétition</button>
        </form>

        <!-- <div class="signature-list">
            <h2>Les dernières signatures :</h2>
            <?php foreach ($signatures as $cols): ?>
                <div class="signature">
                    <strong><?= htmlspecialchars($cols[0]) ?></strong><br>
                    <em><?= date('Y-m-d H:i', strtotime($cols[3])) ?></em><br>
                    <?php if (!empty($cols[2])): ?>
                        <small><?= nl2br(htmlspecialchars($cols[2])) ?></small>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div> -->
    </main>

    <?php include('includes/footer.php'); ?>
</body>
</html>
