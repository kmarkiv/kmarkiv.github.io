## Hello!

I’m a postdoctoral fellow at **Saarland University**, advised by Prof. [Ingmar Weber](https://ingmarweber.de/). I work at the intersection of **Human–Computer Interaction**, **ICTD**, and **Thoughtful AI**—practical, low-cost AI that supports learning, reflection, and civic participation.

I am also a **KCRC Fellow** at the [Kigali Collaborative Research Centre](https://www.kcrc.rw/), a research community based at Carnegie Mellon University Africa in Kigali that supports practical research and innovation for Africa.

My current focus is **thoughtful AI**: building AI *with* people, adapting it to the realities of their lives, and asking what they remain able to do once the assistance ends.

I completed my **Ph.D. in Human–Computer Interaction** at Carnegie Mellon University, USA, advised by Prof. [Amy Ogan](https://www.amyogan.com/) and Prof. [Tim Brown](https://www.africa.engineering.cmu.edu/about/contact/directory/bios/brown-tim.html). My dissertation designed and evaluated **low-cost, chat-based teacher learning systems** that supported **400+ teachers and 10,000+ students** in rural Côte d’Ivoire. Here is the draft of my [thesis]({{ site.thesis_link }}).



## Research Interests

- **ICTD** – aspirations, asset-based design, local innovation  
- **Human-Centered AI** – chatbots, IVR, microlearning, reflective practice  
- **Education & Health** – teacher PD, community health information access  


## News
- **2026** – Serving as **Papers Chair for ACM COMPASS 2026**.
- **2026** – Paper at **ACM FAccT 2026** on designing safe, accountable GenAI learning companions with women banned from formal education.
- **Oct 2025** – Teaching: **AI & the Global South** (lead instructor).
- **Feb 2025** – Papers accepted to **CUI 2025** (LLM survey design; VAA reflection) and **COMPASS 2025** (online learning & GenAI for Afghan women).
- **Oct 2023** – Started postdoc in Saarbrücken.
- **Aug 2023** – Defended PhD at CMU 🎓


## Selected Publications
(see more on [Google Scholar](https://scholar.google.com/citations?user=HVuuUzwAAAAJ&hl=en))

<ul class="pubs">
{%- for p in site.data.publications %}
  <li>
    <a class="pub-title" href="{% if p.pdf %}{{ p.pdf }}{% elsif p.slug %}{{ p.slug | prepend: '/papers/' | append: '/' | relative_url }}{% else %}{{ p.url }}{% endif %}"{% if p.pdf %} target="_blank" rel="noopener" title="PDF, opens in a new tab"{% endif %}>{{ p.title }}{% if p.pdf %}<span class="pdf-flag" aria-hidden="true"> PDF</span><span class="visually-hidden"> (PDF, opens in a new tab)</span>{% endif %}</a>
    <span class="pub-meta">{{ p.authors | replace: 'Vikram Kamath Cannanure', '<b class="me">Vikram Kamath Cannanure</b>' }}. <em>{{ p.venue }}</em>, {{ p.year }}.</span>
    <span class="pub-links">
      {%- if p.pdf %} <a href="{{ p.pdf }}" target="_blank" rel="noopener">PDF</a>{% endif -%}
      {%- if p.preprint and p.preprint != p.url %} <a href="{{ p.preprint }}" target="_blank" rel="noopener">Preprint</a>{% endif -%}
      {%- if p.doi %} <a href="https://doi.org/{{ p.doi }}" target="_blank" rel="noopener">DOI</a>{% endif -%}
      {%- if p.slug %} <a href="{{ p.slug | prepend: '/papers/' | append: '/' | relative_url }}">Details</a>{% endif -%}
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


## Service

- **Co-Organizer & Community Lead**, HCI Across Borders (CHI ’20–’25; COMPASS ’23/’24).
- **Papers Chair**, ACM COMPASS 2026.
- **Program Committees:** COMPASS 2025, AfriCHI 2025.
- **Reviewer:** CHI, CSCW, COMPASS, ICTD, CHI EA, CHI Case Studies.
- **Fundraising:** Raised ~$25,000 for social causes in India.
- **Kannada language teacher** (volunteer), SV Temple, Pittsburgh.


## Swimming

I’m a long-distance swimmer and have raised funds for NGOs in India.  
Stories on my [blog](https://kmarkiv.wordpress.com/2017/06/21/swimming-10-miles-from-elephanta-island-to-gateway-of-india-for-acid-attack/).  

Selected swims:  
- Elephanta → Gateway of India  
- Swim Miami 2016 & 2021  
- Lake Muhazi, Rwanda  


## Software & Making Things

I’ve built systems for **web, Android, desktop, iOS**, and **hardware**.  
Selected projects include scalable **Flask APIs** (4M+ users), a **WebGL 3D viewer**, **Learn Kannada** (10K+ downloads), and **Jedi Mouse** (gesture + EEG cursor control).


## Contact

**Email:** [vica001@teams.uni-saarland.de](mailto:vica001@teams.uni-saarland.de)  
**Twitter:** [@kmarkiv](https://twitter.com/kmarkiv)  
**Blog:** [kmarkiv.wordpress.com](https://kmarkiv.wordpress.com/){:target="\_blank" rel="noopener"} 
