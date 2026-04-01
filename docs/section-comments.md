## Section Comments

This project uses section comments to separate logical blocks of code.

---

### WebStorm (Live Templates)

**Open:** Settings → Editor → Live Templates

Create a new template and fill in the fields as shown below.

---

### Section Comment: Default

- **Abbreviation:**

```
section-comment
```

- **Template text:**

```
// ───────────────────────────────────────────────────────
// $SECTION_TITLE$
// ───────────────────────────────────────────────────────
```

- **Set expand with: `Tab`**
- **Set applicable context: `JavaScript` and `Vue`**

---

### Section Comment: Confirmation modal

- **Abbreviation:**

```
section-comment-confirmation-modal
```

- **Template text:**

```
// ───────────────────────────────────────────────────────
// Confirmation modal
// ───────────────────────────────────────────────────────
```

- **Set expand with: `Tab`**
- **Set applicable context: `JavaScript` and `Vue`**

---

### Section Comment: General

- **Abbreviation:**

```
section-comment-general
```

- **Template text:**

```
// ───────────────────────────────────────────────────────
// General
// ───────────────────────────────────────────────────────
```

- **Set expand with: `Tab`**
- **Set applicable context: `JavaScript` and `Vue`**

---

## Notes

- Abbreviation naming can be chosen freely
- Expand key can be chosen freely
- Make sure to define the applicable context (JavaScript & Vue)
- The IDE will suggest the abbreviation as you type, allowing quick insertion
- Additional custom section comments can be added as needed (these are just the most commonly used ones)

---

## Example Usage

**Type**: `section-comment-confirmation-modal`

**Press:** `tab`

**Result:**

```
// ───────────────────────────────────────────────────────
// Confirmation modal
// ───────────────────────────────────────────────────────
```
