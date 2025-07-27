<section id="fonctions" class="bg-white p-4 rounded shadow-soft mb-4">
  <h2 class="h5 mb-3">Fonctions citoyennes</h2>
  <div class="row g-3">

    <div class="col-md-6 col-lg-3">
      <div class="d-flex flex-column justify-content-between p-3 bg-white border-start border-primary border-4 rounded h-100 shadow-sm">
        <div>
          <h6>🧠 Délibération assistée</h6>
          <p class="mb-2 small text-muted">Discutez avec l'IA pour clarifier vos idées.</p>
        </div>
        <div class="text-end">
          <a href="#" class="comment-ca-marche text-primary" data-bs-toggle="modal" data-bs-target="#modalDeliberation">Comment ça marche ? →</a>
        </div>
      </div>
    </div>

    <div class="col-md-6 col-lg-3">
      <div class="d-flex flex-column justify-content-between p-3 bg-white border-start border-secondary border-4 rounded h-100 shadow-sm">
        <div>
          <h6>🧩 Constitution interactive</h6>
          <p class="mb-2 small text-muted">Explorez chaque article avec ses débats associés.</p>
        </div>
        <div class="text-end">
          <a href="#" class="comment-ca-marche text-primary" data-bs-toggle="modal" data-bs-target="#modalConstitution">Comment ça marche ? →</a>
        </div>
      </div>
    </div>

    <div class="col-md-6 col-lg-3">
      <div class="d-flex flex-column justify-content-between p-3 bg-white border-start border-info border-4 rounded h-100 shadow-sm">
        <div>
          <h6>🧭 Boussole citoyenne</h6>
          <p class="mb-2 small text-muted">Testez votre sensibilité politique.</p>
        </div>
        <div class="text-end">
          <a href="#" class="comment-ca-marche text-primary" data-bs-toggle="modal" data-bs-target="#modalBoussole">Comment ça marche ? →</a>
        </div>
      </div>
    </div>

    <div class="col-md-6 col-lg-3">
      <div class="d-flex flex-column justify-content-between p-3 bg-white border-start border-dark border-4 rounded h-100 shadow-sm">
        <div>
          <h6>🧰 Analyseur de texte</h6>
          <p class="mb-2 small text-muted">Affinez vos propositions pour plus de clarté.</p>
        </div>
        <div class="text-end">
          <a href="#" class="comment-ca-marche text-primary" data-bs-toggle="modal" data-bs-target="#modalAnalyseur">Comment ça marche ? →</a>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- Modal Délibération -->
<div class="modal fade" id="modalDeliberation" tabindex="-1" aria-labelledby="modalDeliberationLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalDeliberationLabel">🧠 Délibération assistée</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
      </div>
      <div class="modal-body">
        <p><strong>Ce que permet cette fonction :</strong> discuter librement avec une IA pour structurer vos idées.</p>
        <p><strong>Pourquoi elle est utile :</strong> clarifier une intuition, tester une idée, structurer une proposition.</p>
        <p><strong>Comment ça marche :</strong></p>
        <ul>
          <li>Écrivez simplement votre idée ou votre question.</li>
          <li>L'IA vous aide à affiner, questionner, reformuler.</li>
          <li>Vous repartez avec un texte prêt à être débattu.</li>
        </ul>
        <p><strong>Conseil :</strong> utilisez l’IA comme un miroir critique, pas comme une autorité.</p>
      </div>
    </div>
  </div>
</div>

<!-- Modal Constitution interactive -->
<div class="modal fade" id="modalConstitution" tabindex="-1" aria-labelledby="modalConstitutionLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalConstitutionLabel">📜 Constitution interactive</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
      </div>
      <div class="modal-body">
        <p><strong>Ce que permet cette fonction :</strong> naviguer dans chaque article avec accès aux débats, variantes, et contributions.</p>
        <p><strong>Pourquoi elle est utile :</strong> comprendre les enjeux, proposer des alternatives, enrichir le texte commun.</p>
        <ul>
          <li>Sélectionnez un article pour voir son contenu et ses débats.</li>
          <li>Ajoutez vos idées ou objections, ou votez sur celles déjà proposées.</li>
        </ul>
        <p><strong>Conseil :</strong> restez synthétique et constructif, même en désaccord.</p>
      </div>
    </div>
  </div>
</div>

<!-- Modal Boussole -->
<div class="modal fade" id="modalBoussole" tabindex="-1" aria-labelledby="modalBoussoleLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalBoussoleLabel">🧭 Boussole citoyenne</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
      </div>
      <div class="modal-body">
        <p><strong>Ce que permet cette fonction :</strong> identifier votre sensibilité politique sans étiquette partisane.</p>
        <p><strong>Pourquoi elle est utile :</strong> se situer pour mieux participer au débat constitutionnel.</p>
        <ul>
          <li>Vous répondez à un court questionnaire.</li>
          <li>Vous découvrez votre profil selon plusieurs axes de valeurs.</li>
        </ul>
        <p><strong>Conseil :</strong> refaites le test après avoir exploré les débats : vos idées évoluent !</p>
      </div>
    </div>
  </div>
</div>

<!-- Modal Analyseur -->
<div class="modal fade" id="modalAnalyseur" tabindex="-1" aria-labelledby="modalAnalyseurLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalAnalyseurLabel">🧰 Analyseur de texte</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
      </div>
      <div class="modal-body">
        <p><strong>Ce que permet cette fonction :</strong> tester la clarté, la rigueur et la cohérence de votre contribution avant de la publier.</p>
        <p><strong>Pourquoi elle est utile :</strong> maximiser votre impact dans les débats en évitant flou et malentendus.</p>
        <ul>
          <li>Copiez-collez votre texte dans le champ prévu.</li>
          <li>L’IA vous donne un retour immédiat : clarté, ton, suggestions.</li>
        </ul>
        <p><strong>Conseil :</strong> gardez votre style personnel, l’analyseur est là pour renforcer votre expression, pas la formater.</p>
      </div>
    </div>
  </div>
</div>

