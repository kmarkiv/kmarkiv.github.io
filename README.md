## Hello!

I’m a postdoctoral fellow at **Saarland University**, advised by Prof. [Ingmar Weber](https://ingmarweber.de/). I work in **Human–Computer Interaction (HCI)** and its development-focused branches, **HCI4D** and **ICTD**. I call the result **Thoughtful AI**: practical, low-cost systems—many built on large language models (LLMs)—that support learning, reflection, and civic participation.

I am also a **KCRC Fellow** at the [Kigali Collaborative Research Centre](https://www.kcrc.rw/), a research community based at Carnegie Mellon University Africa in Kigali that supports practical research and innovation for Africa.

My current focus is **thoughtful AI**: building AI *with* people, adapting it to the realities of their lives, and asking what they remain able to do once the assistance ends.

I completed my **Ph.D. in Human–Computer Interaction** at Carnegie Mellon University, USA, advised by Prof. [Amy Ogan](https://www.amyogan.com/) and Prof. [Tim Brown](https://www.africa.engineering.cmu.edu/about/contact/directory/bios/brown-tim.html). My dissertation designed and evaluated **low-cost, chat-based teacher learning systems** that supported **400+ teachers and 10,000+ students** in rural Côte d’Ivoire. Here is the draft of my [thesis]({{ site.thesis_link }}).



## Research Interests

Three threads run through my work. Each one filters the publication list below.

- [**Conversational AI**](#selected-publications){:data-jump="conversational-ai" title="Filter to chatbot, LLM and voice work"} — chatbots, large language models (LLMs), interactive voice response, and microlearning
- [**Learning**](#selected-publications){:data-jump="learning" title="Filter to teacher learning work"} — teacher professional development, mentorship at scale, and teacher aspirations
- [**Global South**](#selected-publications){:data-jump="global-south" title="Filter to HCI4D and ICTD work"} — HCI4D and ICTD, asset-based design, and community access to health and education information


## Selected Publications
(see more on [Google Scholar](https://scholar.google.com/citations?user=HVuuUzwAAAAJ&hl=en))

{% assign cats = site.data.publications | map: "tag" | uniq | sort %}

<div class="pub-filter" role="group" aria-label="Filter publications by topic">
  <button type="button" class="pf is-on" data-filter="all" aria-pressed="true">All <span class="pf-n">{{ site.data.publications | size }}</span></button>
  {%- for c in cats %}{% assign n = site.data.publications | where: "tag", c | size %}
  <button type="button" class="pf" data-filter="{{ c | slugify }}" aria-pressed="false">{{ c }} <span class="pf-n">{{ n }}</span></button>
  {%- endfor %}
</div>
<p class="pub-filter-note" hidden>Showing <span data-count></span> of {{ site.data.publications | size }}.</p>
<p class="pub-topics">Topic pages: {% for c in cats %}<a href="{{ c | slugify | prepend: '/topics/' | append: '/' | relative_url }}" title="All {{ c }} publications">{{ c }}</a>{% unless forloop.last %} · {% endunless %}{% endfor %}</p>

<ul class="pubs">
{%- for p in site.data.publications %}
  <li data-cat="{{ p.tag | slugify }}">
    <a class="pub-title" href="{% if p.pdf %}{{ p.pdf }}{% elsif p.slug %}{{ p.slug | prepend: '/papers/' | append: '/' | relative_url }}{% else %}{{ p.url }}{% endif %}"{% if p.pdf %} target="_blank" rel="noopener" title="Read the PDF, opens in a new tab"{% else %} title="Abstract, keywords and BibTeX"{% endif %}>{{ p.title }}{% if p.pdf %}<span class="pdf-flag" aria-hidden="true"> PDF</span><span class="visually-hidden"> (PDF, opens in a new tab)</span>{% endif %}</a>
    <span class="pub-meta">{{ p.authors | replace: 'Vikram Kamath Cannanure', '<b class="me">Vikram Kamath Cannanure</b>' }}. <em>{{ p.venue }}</em>, {{ p.year }}.</span>
    {%- if p.keywords %}
    <span class="pub-kw">
      {%- for k in p.keywords %} <span class="kw kw-{{ p.tag | slugify }}{% if forloop.first %} kw-primary{% endif %}">{{ k }}</span>{% endfor -%}
    </span>
    {%- endif %}
    <span class="pub-links">
      {%- if p.pdf %} <a href="{{ p.pdf }}" target="_blank" rel="noopener" title="Read the PDF, opens in a new tab" aria-label="PDF: {{ p.title | escape }}">PDF</a>{% endif -%}
      {%- if p.preprint and p.preprint != p.url %} <a href="{{ p.preprint }}" target="_blank" rel="noopener" title="Open-access preprint, opens in a new tab" aria-label="Preprint: {{ p.title | escape }}">Preprint</a>{% endif -%}
      {%- if p.doi %} <a href="https://doi.org/{{ p.doi }}" target="_blank" rel="noopener" title="Publisher version at the DOI, opens in a new tab" aria-label="DOI, publisher version: {{ p.title | escape }}">DOI</a>{% endif -%}
      {%- if p.slug %} <a href="{{ p.slug | prepend: '/papers/' | append: '/' | relative_url }}" title="Abstract, keywords and BibTeX" aria-label="Details, abstract and BibTeX: {{ p.title | escape }}">Details</a>{% endif -%}
    </span>
    <details class="cite">
      <summary>Cite</summary>
      <div class="cite-box">
        <button class="cite-copy" type="button" aria-live="polite">Copy</button>
        <pre>{{ p.bibtex | strip | escape }}</pre>
      </div>
    </details>
  </li>
{%- endfor %}
</ul>


## News
- **2026** – Serving as **Papers Chair for ACM COMPASS 2026**.
- **2026** – Paper at **ACM FAccT 2026** on designing safe, accountable GenAI learning companions with women banned from formal education.
- **Oct 2025** – Teaching: **AI & the Global South** (lead instructor).
- **Feb 2025** – Papers accepted to **CUI 2025** (LLM survey design; reflection with a voting advice application) and **COMPASS 2025** (online learning & GenAI for Afghan women).
- **Oct 2023** – Started my postdoc in Saarbrücken.
- **Aug 2023** – Defended PhD at CMU 🎓


## Service

- **Co-Organizer & Community Lead**, HCI Across Borders (CHI ’20–’25; COMPASS ’23/’24).
- **Papers Chair**, ACM COMPASS 2026.
- **Program Committees**, COMPASS 2025 and AfriCHI 2025.
- **Reviewer**, CHI, CSCW, COMPASS, ICTD, CHI Extended Abstracts, and CHI Case Studies.
- **Fundraising**, raised over $20,000 for social causes in India.
- **Kannada language teacher** (volunteer), S.V. Temple, Pittsburgh.


## Swimming

I’m a long-distance swimmer and have raised funds for NGOs in India.<br>
Stories on my [blog](https://kmarkiv.wordpress.com/2017/06/21/swimming-10-miles-from-elephanta-island-to-gateway-of-india-for-acid-attack/).  

Selected swims:  
- Elephanta → Gateway of India  
- Swim Miami 2016 & 2021  
- Lake Muhazi, Rwanda  


## Software & Making Things

I’ve built systems for **web, Android, desktop, iOS**, and **hardware**.<br>
Selected projects include scalable **Flask APIs** (4M+ users), a **WebGL 3D viewer**, **Learn Kannada** (10K+ downloads), and **Jedi Mouse** (gesture + EEG cursor control).


## Contact

**Email:** [vica001@teams.uni-saarland.de](mailto:vica001@teams.uni-saarland.de)<br>
**Meet:** [Schedule a meeting]({{ site.calendar }}){:target="_blank" rel="noopener" title="Book a meeting with Vikram Kamath Cannanure"}<br>
**Twitter:** [@kmarkiv](https://twitter.com/kmarkiv)<br>
**Blog:** [kmarkiv.wordpress.com](https://kmarkiv.wordpress.com/){:target="_blank" rel="noopener"} 
