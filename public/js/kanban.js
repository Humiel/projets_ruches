// public/js/kanban.js

document.addEventListener('DOMContentLoaded', async () => {
    console.log("✅ kanban.js connecté à MongoDB");

    const columns = document.querySelectorAll('.column');
    if (columns.length === 0) {
        console.warn("⚠️ Aucune colonne trouvée !");
    }

    // 1. Charger les cartes depuis l’API
    let cartes = [];
    try {
        const res = await fetch(`${basePath}/api/kanban`);
        if (!res.ok) throw new Error(`❌ Erreur API /api/kanban : ${res.status}`);
        cartes = await res.json();
    } catch (e) {
        console.error("❌ Impossible de charger les propositions :", e);
        return;
    }

    // 2. Créer et insérer chaque carte dans sa colonne
    cartes.forEach(carte => {
        if (!carte._id) return console.warn("⛔ Proposition sans ID MongoDB, ignorée.");
        const colonneEl = document.querySelector(`.column[data-colonne="${carte.colonne}"]`);
        const cardList = colonneEl?.querySelector('.card-list');
        if (cardList) {
            cardList.appendChild(createCardElement(carte));
        }
    });

    columns.forEach(col => {
        const colonne = col.dataset.colonne;
        const cardList = col.querySelector('.card-list');

        const header = document.createElement('div');
        header.className = 'kanban-header';

        const title = document.createElement('h2');
        title.textContent = colonne;

        const addBtn = document.createElement('button');
        addBtn.className = 'add-btn btn btn-secondary round btn-sm';
        addBtn.title = "Ajouter une proposition";
        addBtn.innerHTML = '<i class="ri-lightbulb-flash-line"></i>';
        addBtn.onclick = () => ajouterCarte(cardList);

        header.appendChild(title);
        header.appendChild(addBtn);

        col.prepend(header);

        initBootstrapTooltip(addBtn);

        new Sortable(cardList, {
            group: {
                name: 'kanban',
                pull: false,
                put: false
            },
            animation: 150,
            ghostClass: 'ghost',
            dragClass: 'dragging',
            touchStartThreshold: 5,
            onEnd: async function (evt) {
                const cartes = Array.from(evt.to.querySelectorAll('.card'));
                await Promise.all(cartes.map((el, index) => {
                    const id = el.dataset.id;
                    if (!id) return;
                    return fetch(`${basePath}/api/kanban/${id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            colonne: evt.to.closest('.column').dataset.colonne,
                            ordre: index
                        })
                    });
                }));
                console.log(`🔁 Proposition déplacée vers ${evt.to.closest('.column').dataset.colonne}`);
            }
        });
    });

    function ouvrirTimeline(id) {
        console.log("🟡 ouvrirTimeline appelé avec id :", id);

        fetch(`${basePath}/api/kanban/carte/${id}`)
            .then(async res => {
                if (!res.ok) {
                    const msg = await res.text();
                    throw new Error(`HTTP ${res.status} - ${msg}`);
                }
                return res.json();
            })
            .then(carte => {
                console.log("🟢 Carte chargée :", carte);
                openTimelineEditor(carte); // ✅ corriger ce nom
            })
            .catch(err => {
                console.error("❌ Erreur chargement carte :", err);
                alert("Impossible de charger la proposition.");
            });
    }

    // 5. Création DOM d’une carte
    function createCardElement(carte) {
        const el = document.createElement('div');
        el.classList.add('card');
        el.dataset.id = carte._id;

        const titre = carte.titre || carte.contenu || '[Sans titre]';
        const isDemo = /^test\s*\/\s*démo\b/i.test(titre);

        if (isDemo) el.classList.add('demo-card');

        el.innerHTML = `
        <span class="card-content"></span>
        <div class="card-actions">
            <button class="timeline-btn" title="Voir ou modifier la proposition" data-id="${carte._id}">
                <i class="ri-file-edit-line"></i>
            </button>
            <button class="delete-btn" title="Supprimer la proposition">
                <i class="ri-delete-bin-line"></i>
            </button>
        </div>`;

        el.querySelectorAll('button').forEach(btn => {
            initBootstrapTooltip(btn);
        });

        // ✅ Contenu de la carte (avec badge si test/démo)
        el.querySelector('.card-content').innerHTML = isDemo
            ? `<span class="badge bg-warning text-dark me-1">Démo</span>${titre}`
            : titre;

        // 🧠 Clics
        el.addEventListener('click', (e) => {
            if (e.target.closest('button')) return;
            ouvrirTimeline(carte._id);
        });

        const btnEdit = el.querySelector('.timeline-btn');
        if (btnEdit) {
            btnEdit.addEventListener('click', (e) => {
                e.stopPropagation();
                ouvrirTimeline(carte._id);
            });
        }

        if (!carte._id) {
            console.warn("⛔ Carte sans ID :", carte);
            return;
        }

        return el;
    }

    // 6. Ajouter une carte
    async function ajouterCarte(colonneEl) {
        const colonne = colonneEl.closest('.column').dataset.colonne;
        const el = document.createElement('div');
        el.classList.add('card', 'new-card');

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        input.placeholder = "Titre de la proposition...";
        el.appendChild(input);
        colonneEl.appendChild(el);
        input.focus();

        let saving = false;
        const onBlur = () => validerSaisie();

        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur();             // déclenche un seul chemin
            }
        });
        input.addEventListener('blur', onBlur);

        async function validerSaisie() {
            if (saving) return;
            saving = true;
            input.removeEventListener('blur', onBlur);

            const titre = input.value.trim();
            if (!titre) { el.remove(); return; }

            try {
                const res = await fetch(`${basePath}/api/kanban`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ titre, contenu: titre, colonne })
                });
                if (!res.ok) throw new Error(await res.text());

                const carte = await res.json();
                const nouvelleCarte = createCardElement(carte);

                // Remplacement safe
                if (el.parentNode) el.parentNode.replaceChild(nouvelleCarte, el);
            } catch (e) {
                console.error('❌ Erreur création', e);
                if (el.parentNode) el.remove();
            }
        }
    }

    // 7. Actions modifier / supprimer / ouvrir la timeline
    document.body.addEventListener('click', async function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        // ⛔ Ignore tous les boutons dans la modale timeline
        if (btn.closest('#timeline-editor')) return;

        const card = btn.closest('.card');
        if (!card || !card.dataset.id) {
            // dev-only : commente cette ligne si tu veux silence radio
            // console.warn("⛔ Action sur élément sans ID MongoDB :", card);
            return;
        }

        const id = card.dataset.id;

        if (btn.classList.contains('delete-btn')) {
            const idToDelete = id;
            const cardToDelete = card;

            const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
            modal.show();

            // Nettoyage de tout handler précédent
            const confirmBtn = document.getElementById('confirmDeleteBtn');
            confirmBtn.onclick = async () => {
                try {
                    await fetch(`${basePath}/api/kanban/${idToDelete}`, {
                        method: 'DELETE'
                    });

                    cardToDelete.remove();
                    console.log("🗑 Carte supprimée");
                } catch (err) {
                    console.error("❌ Échec suppression :", err);
                } finally {
                    modal.hide();
                }
            };
        }

        if (btn.classList.contains('timeline-btn')) {
            const res = await fetch(`${basePath}/api/kanban/carte/${id}`);
            const carte = await res.json();
            openTimelineEditor(carte);
        }
    });


});

document.querySelectorAll('.card:not([data-id])').forEach(card => {
    console.warn("🧹 Suppression proposition DOM sans _id :", card);
    card.remove();
});

function openTimelineEditor(carte) {
    const container = document.getElementById('timeline-editor');

    const typesEtapes = [
        "À soumettre", "À clarifier", "En discussion", "À prioriser",
        "À transformer", "À tester", "En validation",
        "Adopté (v1)", "Validé (vX)"
    ];

    const couleursParColonne = {
        "À soumettre": "#F8F8F8",
        "À clarifier": "#F0F0F0",
        "En discussion": "#FFFBE2",
        "À prioriser": "#FFF8D4",
        "À transformer": "#EDF7FD",
        "À tester": "#DFF1FA",
        "En validation": "#E3F7EB",
        "Adopté (v1)": "#D1F0E2",
        "Validé (vX)": "#C3EBD7"
    };

    function renderEtapeBloc(etape = {}, index = 0) {
        const colonneSelect = typesEtapes.map(type =>
            `<option value="${type}" ${etape.colonne === type ? 'selected' : ''}>${type}</option>`
        ).join('');

        const couleurFond = couleursParColonne[etape.colonne] || '#f8f9fa';
        const isNew = etape.nouvelle === true;
        const classe = `etape-bloc border p-3 mb-3 rounded ${isNew ? 'nouvelle-carte' : ''}`;

        return `
            <div class="${classe}" style="background-color: ${couleurFond};" data-index="${index}"
                data-colonne="${etape.colonne || ''}">
                <div class="mb-2">
                    <label class="form-label">Étape :</label>
                    <select class="form-select etape-colonne-select" data-field="colonne">
                        ${colonneSelect}
                    </select>
                </div>
                <div class="mb-2">
                    <label class="form-label">Nom de l'action :</label>
                    <div class="scrollable-x editable-input" contenteditable="true" data-field="nom"
                        data-placeholder="Ex : Délibération citoyenne">
                        ${etape.nom || ''}
                    </div>
                </div>
                <div class="mb-2">
                    <label class="form-label">Date :</label>
                    <input type="date" class="form-control" value="${etape.date || ''}" data-field="date">
                </div>
                <div class="mb-2">
                    <label class="form-label">Description :</label>
                    <textarea class="form-control" rows="4" data-field="description">${etape.description || ''}</textarea>
                </div>
                <div class="etape-actions mt-2 d-flex gap-2">
                    <button class="btn btn-sm btn-outline-secondary etape-left" title="Déplacer vers la gauche"
                        data-bs-toggle="tooltip" data-bs-offset="0,4" data-bs-placement="top" data-bs-html="true"
                        data-bs-original-title="Déplacer vers la gauche"><i class="ri-arrow-left-s-line"></i></button>
                    <button class="btn btn-sm btn-outline-secondary etape-right" title="Déplacer vers la droite"><i
                            class="ri-arrow-right-s-line"></i></button>
                    <button class="btn btn-sm btn-outline-danger etape-delete" title="Supprimer"><i
                            class="ri-delete-bin-6-line"></i></button>
                </div>
            </div>
        `;
    }

    const colonneActive = carte.colonne || typesEtapes[0];
    const accId = `accDecision-${carte._id}`;
    const accRootId = `acc-${carte._id}`;
    const accDecId = `accDecision-${carte._id}`;
    const accActId = `accActions-${carte._id}`;

    container.innerHTML = `
                <div class="modal show d-block" tabindex="-1"
                    style="background: rgba(0,0,0,0.4); position: fixed; inset: 0; z-index: 1050;">
                    <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-dialog modal-dialog-scrollable" style="width: 100vw; height: 100vh; margin: 0;">
                        <div class="modal-content position-relative">
                        <button type="button" class="btn-close position-absolute top-0 end-0 m-3 z-3" aria-label="Fermer"
                            onclick="document.getElementById('timeline-editor').innerHTML = ''"></button>
                        <div class="modal-body">
                            <h3 class="mb-4">
                            <i class="ri-file-edit-line"></i> Modifier la proposition
                            <br><small class="text-muted">...et y ajouter des actions</small>
                            </h3>

                            <div class="mb-3">
                            <label for="titre" class="form-label">Titre :</label>
                            <div class="scrollable-x editable-input" id="titre" contenteditable="true">
                                ${carte.titre || carte.contenu || ''}
                            </div>
                            </div>

                            <div class="mb-3">
                            <label for="intro" class="form-label">Intro</label>
                            <textarea id="intro" class="form-control" rows="3"
                                placeholder="Courte introduction...">${(carte.intro || '').replace(/</g, '&lt;')}</textarea>
                            </div>

                            <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea id="description" class="form-control" rows="8"
                                placeholder="Description détaillée...">${(carte.description || '').replace(/</g, '&lt;')}</textarea>
                            </div>

                            <!-- Accordéon Décision + Actions (ouverts par défaut) -->
                            <div class="accordion mb-4" id="${accId}">

                            <!-- Item Décision / Consentement -->
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="${accId}-decision-head">
                                <button class="accordion-button" type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#${accId}-decision-body"
                                        aria-expanded="true"
                                        aria-controls="${accId}-decision-body">
                                    Décision / Consentement
                                </button>
                                </h2>
                                <div id="${accId}-decision-body" class="accordion-collapse collapse show"
                                    aria-labelledby="${accId}-decision-head">
                                <div class="accordion-body">
                                    <div class="decision-module p-0 border-0">
                                    <div class="row g-3 align-items-center">
                                        <div class="col-sm-6">
                                        <label class="form-label mb-1" for="decision-statut">Statut</label>
                                        <select id="decision-statut" class="form-select form-select-sm">
                                            <option value="discussion">En discussion</option>
                                            <option value="vote">Vote en cours</option>
                                            <option value="adoptee">Adoptée</option>
                                            <option value="retravailler">À retravailler</option>
                                            <option value="rejetee">Rejetée</option>
                                        </select>
                                        </div>
                                        <div class="col-sm-6">
                                        <label class="form-label mb-1" for="decision-deadline">Date limite</label>
                                        <input id="decision-deadline" type="date" class="form-control form-control-sm">
                                        </div>
                                    </div>

                                    <!-- Commentaire rapide -->
                                    <div class="mt-3 mb-2" id="zone-vote-commentaire">
                                        <label for="commentaire" class="form-label text-muted">
                                        Commentaire (obligatoire si
                                        <i class="ri-alert-line text-warning"></i> ou
                                        <i class="ri-close-circle-line text-danger"></i>)
                                        </label>
                                        <textarea class="form-control" id="commentaire" rows="2"
                                                placeholder="Ajoutez votre commentaire..."></textarea>
                                    </div>

                                    <!-- Liste des commentaires existants -->
                                    <div id="liste-commentaires" class="mt-3">
                                        <h6 class="mb-2">Commentaires des participants :</h6>
                                        <ul id="comments-list" class="list-group small"></ul>
                                    </div>

                                    <div class="d-flex flex-wrap gap-2 mt-3">
                                        <button type="button" class="btn btn-sm btn-outline-success" data-position="accord">
                                        <i class="ri-check-double-line"></i> D’accord
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-warning" data-position="reserve">
                                        <i class="ri-alert-line"></i> Réserve mineure
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-danger" data-position="objection">
                                        <i class="ri-close-circle-line"></i> Objection
                                        </button>
                                        <div class="ms-auto d-flex align-items-center gap-2">
                                        <div class="consent-bar" title="Répartition des positions">
                                            <span class="seg seg-accord" style="width:0%"></span>
                                            <span class="seg seg-reserve" style="width:0%"></span>
                                            <span class="seg seg-objection" style="width:0%"></span>
                                        </div>
                                        <span class="small text-muted" id="consent-percent">0 %</span>
                                        </div>
                                    </div>
                                    </div>
                                </div> <!-- /accordion-body -->
                                </div> <!-- /collapse -->
                            </div> <!-- /accordion-item -->

                            <!-- Item Actions -->
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="${accId}-actions-head">
                                <button class="accordion-button" type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#${accId}-actions-body"
                                        aria-expanded="true"
                                        aria-controls="${accId}-actions-body">
                                    Actions
                                </button>
                                </h2>
                                <div id="${accId}-actions-body" class="accordion-collapse collapse show"
                                    aria-labelledby="${accId}-actions-head">
                                <div class="accordion-body">
                                    <div class="mb-3">
                                    <label class="form-label">Actions :</label>
                                    <div class="etapes-timeline-scrollable d-flex overflow-auto gap-3 px-2" id="etapes-container">
                                        ${(carte.etapes || []).map((etape, i) => renderEtapeBloc(etape, i)).join('') || '<small class="no-etape text-muted"><em>Aucune action définie.</em></small>'}
                                    </div>
                                    </div>
                                    <div class="timeline-toolbar d-flex justify-content-between align-items-center px-3 py-2 border-top bg-white">
                                    <button class="btn btn-outline-primary btn-sm" data-action="add-etape" type="button">
                                        <i class="ri-add-line"></i> Ajouter une action
                                    </button>
                                    <button id="save-timeline" class="btn btn-primary" type="button">Enregistrer</button>
                                    </div>
                                </div> <!-- /accordion-body -->
                                </div> <!-- /collapse -->
                            </div> <!-- /accordion-item -->

                            </div> <!-- /accordion -->

                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true"></div>
                </div>
                `;

    // load comments for this card
    chargerCommentaires(carte._id);


    // —— Helpers consentement
    function computeStats(positions = []) {
        const total = positions.length || 0;
        const acc = positions.filter(p => p.position === 'accord').length;
        const res = positions.filter(p => p.position === 'reserve').length;
        const obj = positions.filter(p => p.position === 'objection').length;
        const pct = total ? Math.round((acc / total) * 100) : 0;
        return { total, acc, res, obj, pct };
    }

    function hydrateDecisionUI(carte) {
        const statutSel = document.getElementById('decision-statut');
        const deadline = document.getElementById('decision-deadline');

        // valeurs initiales
        const mapInit = {
            discussion: !carte.decisionOpen && !['adoptee', 'retravailler', 'rejetee'].includes(carte.decisionStatut || ''),
            vote: carte.decisionOpen === true,
            adoptee: carte.decisionStatut === 'adoptee',
            retravailler: carte.decisionStatut === 'retravailler',
            rejetee: carte.decisionStatut === 'rejetee'
        };
        const initialKey = Object.entries(mapInit).find(([, v]) => v)?.[0] || 'discussion';
        statutSel.value = initialKey;

        if (carte.decisionDeadline) {
            const d = new Date(carte.decisionDeadline);
            deadline.value = d.toISOString().slice(0, 10);
        }

        // stats
        const { total, acc, res, obj, pct } = computeStats(carte.positions || []);
        const segA = document.querySelector('.consent-bar .seg-accord');
        const segR = document.querySelector('.consent-bar .seg-reserve');
        const segO = document.querySelector('.consent-bar .seg-objection');
        const txt = document.getElementById('consent-percent');

        const wA = total ? (acc / total) * 100 : 0;
        const wR = total ? (res / total) * 100 : 0;
        const wO = total ? (obj / total) * 100 : 0;
        segA.style.width = `${wA}%`;
        segR.style.width = `${wR}%`;
        segO.style.width = `${wO}%`;
        txt.textContent = `${pct} %`;

        // événements — on ne persiste qu'au "Enregistrer" (cohérent avec ta modale)
        statutSel.addEventListener('change', () => {
            const v = statutSel.value;
            carte.decisionOpen = (v === 'vote');
            carte.decisionStatut = (v === 'vote' || v === 'discussion') ? null : v;
        });

        deadline.addEventListener('change', () => {
            carte.decisionDeadline = deadline.value ? new Date(deadline.value).toISOString() : null;
        });

        // votes (enregistrement immédiat + refresh statique)
        document.querySelectorAll('[data-position]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const position = btn.dataset.position;

                // ✅ textarea uniquement dans la modale ouverte
                const textarea = document.querySelector('#timeline-editor .modal.show #commentaire');
                const comment = (textarea && typeof textarea.value === 'string') ? textarea.value.trim() : '';

                if ((position === 'reserve' || position === 'objection') && !comment) {
                    textarea?.focus();
                    return;
                }

                const body = { position, comment };
                console.log('[vote->POST body]', body);

                try {
                    const res = await fetch(`${basePath}/api/kanban/carte/${carte._id}/position`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body)
                    });
                    const txt = await res.text();                 // pour voir l’erreur éventuelle
                    if (!res.ok) throw new Error(txt);

                    const positionsMaj = JSON.parse(txt);
                    carte.positions = positionsMaj;

                    const s = computeStats(carte.positions);
                    segA.style.width = `${(s.acc / (s.total || 1)) * 100}%`;
                    segR.style.width = `${(s.res / (s.total || 1)) * 100}%`;
                    segO.style.width = `${(s.obj / (s.total || 1)) * 100}%`;
                    txt.textContent = `${s.pct} %`;

                    if (textarea) textarea.value = '';
                    await chargerCommentaires(carte._id);         // 🔄 rafraîchir la liste
                } catch (e) {
                    console.error('Vote échoué', e);
                }
            });
        });
    }

    // Appel après avoir injecté le HTML
    hydrateDecisionUI(carte);

    // Désactive les boutons de vote si pas de décision ouverte
    initVoteButtonsState();

    // Initialiser les tooltips sur tous les boutons dynamiques

    document.querySelectorAll('.etape-actions button').forEach(btn => {
        initBootstrapTooltip(btn);
    });

    function attachEtapeActionListeners() {
        document.querySelectorAll('.etape-bloc').forEach(bloc => {
            const select = bloc.querySelector('[data-field="colonne"]');
            if (select) {
                select.addEventListener('change', () => {
                    bloc.dataset.colonne = select.value;
                    bloc.style.backgroundColor = couleursParColonne[select.value] || '#f8f9fa';
                });
            }
            bloc.querySelector('.etape-left')?.addEventListener('click', () => {
                const prev = bloc.previousElementSibling;
                if (prev?.classList.contains('etape-bloc')) {
                    bloc.parentNode.insertBefore(bloc, prev);
                    scrollEtapeDansLeCentre(bloc); // 🔁 centrage après déplacement
                }
            });

            bloc.querySelector('.etape-right')?.addEventListener('click', () => {
                const next = bloc.nextElementSibling;
                if (next?.classList.contains('etape-bloc')) {
                    bloc.parentNode.insertBefore(next, bloc);
                    scrollEtapeDansLeCentre(bloc); // 🔁 centrage après déplacement
                }
            });

            bloc.querySelector('.etape-delete')?.addEventListener('click', () => bloc.remove());
        });
    }

    attachEtapeActionListeners();

    function scrollEtapeDansLeCentre(bloc) {
        const container = document.getElementById('etapes-container'); // 🟡 adapte l’ID si besoin
        const blocRect = bloc.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const offset = blocRect.left - containerRect.left - (container.clientWidth / 2) + (bloc.clientWidth / 2);
        container.scrollBy({ left: offset, behavior: 'smooth' });
    }


    document.querySelector('[data-action="add-etape"]').addEventListener('click', (e) => {
        e.preventDefault();
        const index = document.querySelectorAll('#etapes-container .etape-bloc').length;
        document.getElementById('etapes-container').insertAdjacentHTML('beforeend', renderEtapeBloc({ nouvelle: true }, index));
        attachEtapeActionListeners();

        // Scroll centré sur la nouvelle carte
        setTimeout(() => {
            const container = document.getElementById('etapes-container');
            const nouvelleCarte = container.querySelector('.nouvelle-carte');
            if (!nouvelleCarte) return;

            const offsetLeft = nouvelleCarte.offsetLeft;
            const carteWidth = nouvelleCarte.offsetWidth;
            const containerWidth = container.offsetWidth;

            container.scrollTo({
                left: offsetLeft - (containerWidth / 2) + (carteWidth / 2),
                behavior: 'smooth'
            });

            nouvelleCarte.classList.remove('nouvelle-carte');
        }, 50);

    });

    // Scroll automatique à droite
    setTimeout(() => {
        const container = document.getElementById('etapes-container');
        container.scrollTo({
            left: container.scrollWidth,
            behavior: 'smooth'
        });
    }, 300);

    document.getElementById('save-timeline').addEventListener('click', async () => {
        const titre = document.getElementById('titre').innerText.trim();

        // ✅ nouveaux champs
        const intro = document.getElementById('intro')?.value?.trim() ?? '';
        const description = document.getElementById('description')?.value?.trim() ?? '';

        const etapesDOM = document.querySelectorAll('.etape-bloc');
        const etapes = [...etapesDOM].map(bloc => ({
            nom: (bloc.querySelector('[data-field="nom"]')?.innerText || '').trim(),
            date: bloc.querySelector('[data-field="date"]')?.value || '',
            description: bloc.querySelector('[data-field="description"]')?.value || '',
            colonne: bloc.dataset.colonne || ''
        }));

        const ancienneColonne = carte.colonne;
        const colonnesAvecActions = etapes.map(e => e.colonne).filter(Boolean);
        let nouvelleColonne = colonnesAvecActions.at(-1) || ancienneColonne;
        let colonneForcee = nouvelleColonne !== ancienneColonne;
        carte.colonne = nouvelleColonne;

        const res = await fetch(`${basePath}/api/kanban/carte/${carte._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titre,
                intro,                // 👈
                description,          // 👈
                etapes,
                colonne: carte.colonne,
                decisionOpen: !!carte.decisionOpen,
                decisionDeadline: carte.decisionDeadline || null,
                decisionStatut: carte.decisionStatut || null
            })
        });
        if (!res.ok) {
            console.error('❌ Échec PUT carte', await res.text());
            return;
        }

        // MAJ visuelle de la tuile
        const carteEl = document.querySelector(`.card[data-id="${carte._id}"]`);
        if (carteEl) {
            const titleSpan = carteEl.querySelector('.card-content');
            const isDemo = /^test\s*\/\s*démo\b/i.test(titre);
            if (titleSpan) {
                titleSpan.innerHTML = isDemo
                    ? `<span class="badge bg-warning text-dark me-1">Démo</span>${titre}`
                    : titre;
            }
            carteEl.classList.toggle('demo-card', isDemo);

            if (colonneForcee) {
                const nouvelleColonneEl = document.querySelector(`.column[data-colonne="${carte.colonne}"] .card-list`);
                if (nouvelleColonneEl) {
                    nouvelleColonneEl.appendChild(carteEl);
                    carteEl.classList.add('moved');
                    carteEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                    setTimeout(() => carteEl.classList.remove('moved'), 1500);
                }
            }
        }

        // petit toast de confirmation
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-bg-success border-0 show position-fixed bottom-0 end-0 m-3';
        toast.innerHTML = `<div class="d-flex"><div class="toast-body">Modifications enregistrées</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);

        // fermer la modale
        document.getElementById('timeline-editor').innerHTML = '';
    });

}

async function chargerCommentaires(carteId) {
    try {
        const res = await fetch(`${basePath}/api/kanban/carte/${carteId}/commentaires`);
        if (!res.ok) throw new Error('Erreur API commentaires');
        const data = await res.json();

        const list = document.getElementById('comments-list');
        list.innerHTML = '';

        data.forEach(c => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-start';

            const badge =
                c.position === 'accord' ? 'bg-success' :
                    c.position === 'reserve' ? 'bg-warning text-dark' :
                        'bg-danger';

            const icon =
                c.position === 'accord'
                    ? '<i class="ri-check-double-line text-success"></i>'
                    : c.position === 'reserve'
                        ? '<i class="ri-alert-line text-warning"></i>'
                        : '<i class="ri-close-circle-line text-danger"></i>';

            li.innerHTML = `
    <div>
      <span class="badge rounded-pill ${badge}">${icon}</span>
      <strong>${c.userName || 'Membre'}</strong> : ${c.comment || ''}
    </div>
    <small class="text-muted">${new Date(c.at).toLocaleString()}</small>
  `;
            list.appendChild(li);
        });

    } catch (e) {
        console.error(e);
    }
}

function initVoteButtonsState() {
    const modal = document.querySelector('#timeline-editor .modal.show');
    if (!modal) return;

    const textarea = modal.querySelector('#commentaire');
    const btnRes = modal.querySelector('[data-position="reserve"]');
    const btnObj = modal.querySelector('[data-position="objection"]');

    if (!textarea || !btnRes || !btnObj) return;

    // état initial : désactivés
    btnRes.disabled = true;
    btnObj.disabled = true;

    // réactiver dès qu'il y a du texte (trim)
    const toggle = () => {
        const hasText = textarea.value.trim().length > 0;
        btnRes.disabled = !hasText;
        btnObj.disabled = !hasText;
    };

    textarea.addEventListener('input', toggle);
    toggle(); // au cas où le champ serait prérempli
}

function initBootstrapTooltip(el) {
    return new bootstrap.Tooltip(el, {
        trigger: 'hover focus',
        delay: { show: 200, hide: 100 },
        container: 'body',
        boundary: 'window' // ← limite l'overflow + évite certains bugs dans les modales
    });
}
