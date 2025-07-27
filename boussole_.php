<?php
define('ROOT_PATH', __DIR__);
include(ROOT_PATH . "/includes/header.php");
?>
<main class="container my-4">
  <h2 class="h5">Ma Boussole Citoyenne</h2>
  <p class="mb-4">Ce questionnaire vous aide à situer votre sensibilité politique en dehors des étiquettes habituelles.</p>

  <form>
    <section class="bg-section p-4 rounded shadow-soft mb-4">
      <!-- Bloc 1 — Rapport au pouvoir -->
      <div class="mb-3">
        <h5>🧭 Bloc 1 — Rapport au pouvoir</h5>

        <label class="form-label fw-bold">Que préférez-vous ?</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question1" id="q1_o0">
          <label class="form-check-label" for="q1_o0">Un leader fort</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question1" id="q1_o1">
          <label class="form-check-label" for="q1_o1">Des décisions partagées</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">La démocratie représentative est :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question2" id="q2_o0">
          <label class="form-check-label" for="q2_o0">Un mal nécessaire</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question2" id="q2_o1">
          <label class="form-check-label" for="q2_o1">Un système dépassé</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Les citoyens doivent pouvoir révoquer leurs élus :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question3" id="q3_o0">
          <label class="form-check-label" for="q3_o0">Oui, à tout moment</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question3" id="q3_o1">
          <label class="form-check-label" for="q3_o1">Non, uniquement par les urnes</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Une démocratie efficace doit :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question4" id="q4_o0">
          <label class="form-check-label" for="q4_o0">Décider vite</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question4" id="q4_o1">
          <label class="form-check-label" for="q4_o1">Prendre le temps de délibérer</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Le vote obligatoire serait :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question5" id="q5_o0">
          <label class="form-check-label" for="q5_o0">Une bonne mesure</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question5" id="q5_o1">
          <label class="form-check-label" for="q5_o1">Une atteinte à la liberté individuelle</label>
        </div>
      </div>
    </section>

    <section class="bg-section p-4 rounded shadow-soft mb-4">

      <!-- Bloc 2 — Rapport à la loi et aux institutions -->
      <div class="mb-3">
        <h5>🧭 Bloc 2 — Rapport à la loi et aux institutions</h5>

        <label class="form-label fw-bold">La Constitution doit être :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question6" id="q6_o0">
          <label class="form-check-label" for="q6_o0">Intouchable, stable</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question6" id="q6_o1">
          <label class="form-check-label" for="q6_o1">Adaptée régulièrement</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Les juges doivent pouvoir censurer les lois votées :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question7" id="q7_o0">
          <label class="form-check-label" for="q7_o0">Oui, pour défendre les droits</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question7" id="q7_o1">
          <label class="form-check-label" for="q7_o1">Non, c’est au peuple de décider</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Les citoyens doivent pouvoir proposer des lois :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question8" id="q8_o0">
          <label class="form-check-label" for="q8_o0">Oui, par référendum d’initiative citoyenne</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question8" id="q8_o1">
          <label class="form-check-label" for="q8_o1">Non, cela doit rester aux élus</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Une assemblée tirée au sort peut être utile :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question9" id="q9_o0">
          <label class="form-check-label" for="q9_o0">Oui, pour éviter les intérêts partisans</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question9" id="q9_o1">
          <label class="form-check-label" for="q9_o1">Non, seule l’élection garantit la légitimité</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Les corps intermédiaires (syndicats, ONG, etc.) doivent :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question10" id="q10_o0">
          <label class="form-check-label" for="q10_o0">Être associés aux décisions</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question10" id="q10_o1">
          <label class="form-check-label" for="q10_o1">Se cantonner à leur rôle consultatif</label>
        </div>
      </div>
    </section>

    <section class="bg-section p-4 rounded shadow-soft mb-4">

      <!-- Bloc 3 — Économie et solidarité -->
      <div class="mb-3">
        <h5>🧭 Bloc 3 — Économie et solidarité</h5>

        <label class="form-label fw-bold">Le rôle de l’État est de :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question11" id="q11_o0">
          <label class="form-check-label" for="q11_o0">Garantir l’égalité</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question11" id="q11_o1">
          <label class="form-check-label" for="q11_o1">Protéger les libertés individuelles</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Les impôts sont :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question12" id="q12_o0">
          <label class="form-check-label" for="q12_o0">Un outil de justice sociale</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question12" id="q12_o1">
          <label class="form-check-label" for="q12_o1">Un fardeau à limiter</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">La sécurité sociale doit :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question13" id="q13_o0">
          <label class="form-check-label" for="q13_o0">Être universelle et renforcée</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question13" id="q13_o1">
          <label class="form-check-label" for="q13_o1">Être ciblée sur les plus fragiles</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">L’économie doit :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question14" id="q14_o0">
          <label class="form-check-label" for="q14_o0">Être planifiée pour les besoins essentiels</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question14" id="q14_o1">
          <label class="form-check-label" for="q14_o1">Rester largement libérale</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Le travail doit être :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question15" id="q15_o0">
          <label class="form-check-label" for="q15_o0">Un droit et un devoir</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question15" id="q15_o1">
          <label class="form-check-label" for="q15_o1">Une option parmi d’autres formes d’activité</label>
        </div>
      </div>
    </section>

    <section class="bg-section p-4 rounded shadow-soft mb-4">
      <!-- Bloc 4 — Environnement, territoire, culture -->
      <div class="mb-3">
        <h5>🧭 Bloc 4 — Environnement, territoire, culture</h5>

        <label class="form-label fw-bold">La transition écologique impose :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question16" id="q16_o0">
          <label class="form-check-label" for="q16_o0">Des décisions contraignantes</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question16" id="q16_o1">
          <label class="form-check-label" for="q16_o1">Des incitations individuelles</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Le développement local doit :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question17" id="q17_o0">
          <label class="form-check-label" for="q17_o0">Être décidé par les habitants</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question17" id="q17_o1">
          <label class="form-check-label" for="q17_o1">Être cadré par l’État</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">La culture doit :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question18" id="q18_o0">
          <label class="form-check-label" for="q18_o0">Être subventionnée pour tous</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question18" id="q18_o1">
          <label class="form-check-label" for="q18_o1">Être laissée au marché libre</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Les médias doivent :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question19" id="q19_o0">
          <label class="form-check-label" for="q19_o0">Être encadrés pour garantir l’éthique</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question19" id="q19_o1">
          <label class="form-check-label" for="q19_o1">Rester totalement libres</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">L’école doit :</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question20" id="q20_o0">
          <label class="form-check-label" for="q20_o0">Former des citoyens engagés</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question20" id="q20_o1">
          <label class="form-check-label" for="q20_o1">Former des individus autonomes</label>
        </div>
      </div>
    </section>

    <!-- Bouton final -->
    <button type="submit" class="btn btn-secondary w-100" disabled>Résultat bientôt disponible</button>
  </form>


  <div class="placeholder mt-4">
    Une version interactive de cette boussole sera bientôt disponible.
  </div>
  </section>
</main>

<?php include(ROOT_PATH . "/includes/footer.php"); ?>