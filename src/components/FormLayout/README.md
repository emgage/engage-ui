---
name: Form layout
tags:
  - responsive
  - no grid
  - forms
  - stack fields
  - vertical
  - vertically
category: Forms
---

# Form Layout

Form layouts are used to create responsive forms without using grids.

**Problem**

Merchants need to fill out information across Shopify.

**Solution**

The form layout makes forms easier to scan and complete because it stacks fields vertically on the interface.

>**Not what you’re looking for?**
>
> * To structure a lot of content, [use the layout component](/components/structure/layout).

---

## Best practices

Forms should:

* Be considerate of a merchant’s time and privacy by only asking for information that’s required
* Group related tasks under section titles to provide more context and make the interface easier to scan
* Follow a logical, predictable order—for example, always ask for first name first, and last name second on forms

---

## Content guidelines

### Form section title

Section titles should be:

* Informative and descriptive: they should label the type of content grouped in the section
* Concise and scannable:
  * Use simple, clear language that can be read at a glance
  * Keep section titles to 1 or 2 words and avoid using punctuation such as periods, commas, or semicolons
  * Avoid articles (the, a, an) to keep content short and actionable
* Be written in sentence case

<!-- usagelist -->
#### Do
Business details

#### Don't
Enter details about your business
<!-- end -->

### Field label

A label is a short description of a field. Labels are not help text, and they shouldn’t be used to provide instruction, but they should be meaningful and clearly indicate what is expected. Labels should be:

* Placed above or beside the form field
* Short and succinct (1–3 words)
* Written in sentence case (the first word capitalized, the rest lowercase)

<!-- usagelist -->
#### Do
Email address

#### Don't
What is your email address?
<!-- end -->

<!-- usagelist -->
#### Do
Phone number

#### Don't
My phone number is:
<!-- end -->

### Help text

Help text provides extra guidance to people filling out a form field. This text is easy for people to ignore, so merchants should not need to depend on it to fill out a form. As with all forms, help text should be succinct and easy to read.

| Properties | Type | Description |
| ---------- | ---- | ----------- |
| children | React.ReactNode | The content to display inside the layout. |

## Examples

### Default form layout

Use to stack form fields vertically, which makes them easier to scan and complete.

```jsx
<FormLayout>
  <TextField
    label="Store name"
  />
  <TextField
    type="email"
    label="Account email"
  />
</FormLayout>
```

### Form layout with field groups

Use to show multiple fields horizontally when it’s appropriate such as when displaying city, region, and postal/zip code fields. Fields displayed horizontally will wrap as necessary.

```jsx
<FormLayout>
  <FormLayout.Group>
    <TextField type="number" label="Minimum order" />
    <TextField type="number" label="Maximum order" />
  </FormLayout.Group>
</FormLayout>
```

### Condensed field group

For short inputs, the width of the inputs may be reduced in order to fit more fields in the row.

```jsx
<FormLayout>
  <FormLayout.Group condensed>
    <TextField label="Length" />
    <TextField label="Width" />
    <TextField label="Height" />
    <TextField label="Unit" />
  </FormLayout.Group>
</FormLayout>
```
