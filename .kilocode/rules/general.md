
# 🧠 general.md 
for kilocode, not humans. See CONTRIBUTING.md if looking to contribute or read.

## 🧩 General Principles

Follow these guidelines wherever applicable:

* ❌ **Do not read `.env` files.**
* 🧱 **Avoid bandage fixes** and inefficient code unless absolutely necessary.
* ♻️ **Keep code consistent** and follow the **DRY (Don’t Repeat Yourself)** principle.
* 📚 **Always reference the latest documentation** for the services or tools you use.
* 🔹 **Break tasks into small, manageable steps.**
* 🌱 **Keep long-term effects in mind** when designing or changing systems.
* 👀 **Write readable code** — aim for clarity suitable for an *intermediate developer.*
* ⚖️ **Prioritize simplicity over complexity.** Be concise, efficient, and avoid overengineering.
* 🧭 **Before changing something,** check related docs and ensure it’s still up to date.

---

## ✨ Style Guide

### 🧠 Philosophy

Use the [**MOIST principle**](https://medium.com/@slavik57/why-should-you-write-moist-code-8d127e2c0075)

> **MOIST (Modularize Only If Something Tangible)** balances between WET and DRY.
>
> * **WET** = duplication, extra testing, and bug spread.
> * **Overly DRY** = premature abstraction and wasted time.
>
> **MOIST** = allow repetition until patterns clearly emerge.
> Only modularize when:
>
> * Multiple real use cases exist
> * A clear API and meaningful name are possible
> * The abstraction reduces, not adds, complexity

---

### 🧱 Structure & Components

* Create **Type files only** when both `.ts` and `.svelte` files are involved.
* Keep code **simple, readable, and consistent.**
* Prefer **tabs** for indentation.
* Use naming conventions:

  * `camelCase` → variables, functions, and classes
  * `PascalCase` → components
  * `kebab-case` → filenames
* **Avoid hardcoding values** in components.
* **Keep components small.** If they grow large, split them into smaller ones.

  * If repetition increases, refactor into reusable components.
* For **variable content**, use **container components**:

  * e.g. `Popover` with `<slot></slot>` for flexible inner content.

---

## 🎨 CSS Guidelines

* Follow the [**BEM methodology**](https://en.bem.info/methodology/quick-start/) for class naming.
* ❌ **Do not use Tailwind CSS.**
* ♿ **Maintain accessibility** in all styling choices.
* 🧩 Keep CSS **DRY**:

  * Instead of making separate dark-mode variants for every button (e.g., success, warning, error), use **filters or variables** like a `Darkness` filter.