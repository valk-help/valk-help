(function () {
  var sectionKey = document.body.dataset.dmaSection;
  var data = window.DMA_SECTION_DATA && window.DMA_SECTION_DATA[sectionKey];
  var root = document.getElementById("dma-section-root");

  if (!data || !root) return;

  var storageKey = "valk-dma-progress-" + sectionKey;
  var completedSteps = loadProgress();
  var totalSteps = countSteps(data.groups);
  var renderedStepIndex = 0;
  var countNode = null;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function countSteps(groups) {
    var total = 0;
    (groups || []).forEach(function (group) {
      total += (group.steps || []).length;
    });
    return total;
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch (error) {
      return {};
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(completedSteps));
    } catch (error) {
      return;
    }
  }

  function getCompletedCount() {
    var count = 0;
    for (var i = 1; i <= totalSteps; i += 1) {
      if (completedSteps["step-" + i]) count += 1;
    }
    return count;
  }

  function updateProgressCount() {
    if (countNode) {
      countNode.textContent = getCompletedCount() + "/" + totalSteps;
    }
  }

  function renderLinks(items) {
    if (!items || !items.length) return null;
    var wrap = el("div", "resource-grid");
    items.forEach(function (item) {
      var link = el("a", "resource-card");
      link.href = item.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.appendChild(el("strong", "", item.label));
      link.appendChild(el("small", "", item.detail));
      wrap.appendChild(link);
    });
    return wrap;
  }

  function renderImage(src, alt) {
    var figure = el("figure", "step-image");
    var image = document.createElement("img");
    image.src = src;
    image.alt = alt || "";
    image.loading = "eager";
    figure.appendChild(image);
    return figure;
  }

  function renderCard(card) {
    var node = el("article", "info-card");
    node.appendChild(el("h3", "", card.title));
    var list = el("ul", "glow-list");
    (card.items || []).forEach(function (item) {
      list.appendChild(el("li", "", item));
    });
    node.appendChild(list);
    return node;
  }

  function renderStep(step, stepId) {
    var node = el("article", "step-card");
    var number = el("div", "step-number", step.number || "");
    var body = el("div", "step-body");
    var heading = el("div", "step-heading");
    var title = el("h3", "", step.title);
    var check = el("button", "step-check", "✓");
    var isComplete = Boolean(completedSteps[stepId]);

    check.type = "button";
    check.setAttribute("aria-label", "Mark " + step.title + " complete");
    check.setAttribute("aria-pressed", isComplete ? "true" : "false");
    heading.appendChild(title);
    heading.appendChild(check);
    body.appendChild(heading);

    if (isComplete) {
      node.classList.add("is-complete");
    }

    check.addEventListener("click", function () {
      var next = !completedSteps[stepId];
      completedSteps[stepId] = next;
      if (!next) delete completedSteps[stepId];
      node.classList.toggle("is-complete", next);
      check.setAttribute("aria-pressed", next ? "true" : "false");
      saveProgress();
      updateProgressCount();
    });

    (step.text || []).forEach(function (line) {
      body.appendChild(el("p", "", line));
    });

    if (step.images && step.images.length) {
      var images = el("div", "step-images");
      step.images.forEach(function (src) {
        images.appendChild(renderImage(src, step.title));
      });
      body.appendChild(images);
    }

    node.appendChild(number);
    node.appendChild(body);
    return node;
  }

  function renderGroup(group) {
    var section = el("section", "section-group");
    section.appendChild(el("h2", "", group.title));
    if (group.intro) section.appendChild(el("p", "group-intro", group.intro));

    if (group.cards && group.cards.length) {
      var cards = el("div", "info-grid");
      group.cards.forEach(function (card) {
        cards.appendChild(renderCard(card));
      });
      section.appendChild(cards);
    }

    if (group.steps && group.steps.length) {
      var steps = el("div", "steps-list");
      group.steps.forEach(function (step) {
        renderedStepIndex += 1;
        steps.appendChild(renderStep(step, "step-" + renderedStepIndex));
      });
      section.appendChild(steps);
    }

    return section;
  }

  document.title = data.title + " - ValkDMA Guide";

  var hero = el("div", "section-hero");
  var copy = el("div");
  copy.appendChild(el("p", "eyebrow", "ValkDMA guide"));
  copy.appendChild(el("h1", "guide-title", data.title));
  if (totalSteps) {
    countNode = el("div", "section-count");
    copy.appendChild(countNode);
  } else if (data.count) {
    copy.appendChild(el("div", "section-count", data.count));
  }
  copy.appendChild(el("p", "lead", data.description));
  hero.appendChild(copy);
  if (data.heroImage) hero.appendChild(renderImage(data.heroImage, data.title));
  root.appendChild(hero);
  updateProgressCount();

  if (data.notes && data.notes.length) {
    var notes = el("div", "section-notes");
    data.notes.forEach(function (note) {
      notes.appendChild(el("p", "", note));
    });
    root.appendChild(notes);
  }

  var links = renderLinks(data.resources);
  if (links) root.appendChild(links);

  (data.groups || []).forEach(function (group) {
    root.appendChild(renderGroup(group));
  });

  document.querySelectorAll("[data-dma-link]").forEach(function (link) {
    if (link.dataset.dmaLink === sectionKey) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
})();
