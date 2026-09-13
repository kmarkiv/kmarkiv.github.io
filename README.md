## Hello!

I’m a postdoctoral fellow at **Saarland University**, advised by Prof. [Ingmar Weber](https://ingmarweber.de/). My research brings together **Human–Computer Interaction (HCI)**, **HCI for development (HCI4D)**, and **information and communication technologies for development (ICTD)**.

I design **Thoughtful AI**: low-cost systems built *with* people to support learning, reflection, and participation in their communities. A question guides this work: what can people still do when the AI assistance ends?

I am also a **KCRC Fellow** at the [Kigali Collaborative Research Centre](https://www.kcrc.rw/). Based at Carnegie Mellon University Africa in Kigali, it brings researchers together to work on practical challenges across Africa.

I completed my **Ph.D. in Human–Computer Interaction** at Carnegie Mellon University, USA, advised by Prof. [Amy Ogan](https://www.amyogan.com/) and Prof. [Tim Brown](https://www.africa.engineering.cmu.edu/about/contact/directory/bios/brown-tim.html).



## Research Interests

My work spans three areas. Select one to see related publications below.

- [**Conversational AI**](#selected-publications){:data-jump="conversational-ai" title="Filter to chatbot, LLM and voice work"} — chatbots, large language models (LLMs), interactive voice systems, and short learning activities
- [**Learning**](#selected-publications){:data-jump="learning" title="Filter to teacher learning work"} — teacher professional development, wider access to mentoring, and teachers’ aspirations
- [**Global South**](#selected-publications){:data-jump="global-south" title="Filter to HCI4D and ICTD work"} — HCI4D and ICTD for social impact, building on community strengths in health, education, and conservation

### LLMs for HCI4D, ICTD and Social Impact

My work applies LLMs to education, health, and civic learning. In India, I collaborate with [Gram Vaani](https://gramvaani.org/){:title="Gram Vaani, a social technology organisation working with rural communities in India"}, a social technology organisation. Together, we study AI for sensitive health questions and WhatsApp tools that help communities learn about caring for land and water.

For my PhD, I designed and evaluated **low-cost, chat-based teacher learning systems** that supported **400+ teachers and 10,000+ students** in rural Côte d’Ivoire. Read my [thesis draft]({{ site.thesis_link }}){:title="DIA: Supporting Teacher Professional Development in Low-Infrastructure Settings (PhD thesis, CMU)"}.


## Selected Publications

See my full publication record on [Google Scholar](https://scholar.google.com/citations?user=HVuuUzwAAAAJ&hl=en).

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

I’m a long-distance swimmer and have raised funds for NGOs in India. Read about my swims on my [blog](https://kmarkiv.wordpress.com/2017/06/21/swimming-10-miles-from-elephanta-island-to-gateway-of-india-for-acid-attack/).

Selected swims:  
- Elephanta → Gateway of India  
- Swim Miami 2016 & 2021  
- Lake Muhazi, Rwanda  


## Software & Making Things

I’ve built **web, Android, iOS, and desktop software**, as well as **hardware**. My projects include **Flask APIs** serving over 4 million users, a **WebGL 3D viewer**, **Learn Kannada** with over 10,000 downloads, and **Jedi Mouse**, which lets people control a cursor using gestures and EEG signals.


## Contact

**Email:** [vica001@teams.uni-saarland.de](mailto:vica001@teams.uni-saarland.de)<br>
**Meet:** [Schedule a meeting]({{ site.calendar }}){:target="_blank" rel="noopener" title="Book a meeting with Vikram Kamath Cannanure"}<br>
**Twitter:** [@kmarkiv](https://twitter.com/kmarkiv)<br>
**Blog:** [kmarkiv.wordpress.com](https://kmarkiv.wordpress.com/){:target="_blank" rel="noopener"} 
