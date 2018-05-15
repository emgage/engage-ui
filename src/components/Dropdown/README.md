---
name: Dropdown
category: Overlays
---

# Dropdown

Dropdowns are small overlays that open on demand, usually when the merchant clicks a button. They let merchants access supplementary content and actions without cluttering the page.

**Problem**

There are lots of different paths a merchant can take and listing them all out in the interface would make the experience feel overwhelming and cluttered.

**Solution**

Popovers allow merchants to expose and hide additional information and actions when they’re ready to explore them. Popovers show next to the button that triggers them, so they demand minimal shift in merchant attention.

> **Not what you’re looking for?**
>* To put a list of actions in a Dropdown, [use the action list component](/components/actions/action-list).
>* To group similar concepts and tasks together to make Shopify easier for merchants to scan, read, and take action on, [use the card component](/components/structure/card).


---

## Best practices

Dropdown should:

- Always show next to the button or other interface element that triggers them
- Be used for secondary or less important information and actions since they’re hidden until the merchant hits the trigger
- Contain navigation or actions that share a relationships to each other
- Be triggered by a clearly labeled button

---

## Content guidelines

### Dropdown content

If the menu items in a dropdown include a series of actions, each item should:

- Be clear and predictable: merchants should be able to anticipate what will happen when they click on an action item. Never deceive a merchant by mislabeling an action.

<!-- usagelist -->
#### Do
- Create order
- Buy shipping label

#### Don't
- New order
- Buy
<!-- end -->

- Be action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->
#### Do
- Rename
- Edit HTML
- Duplicate

#### Don't
- HTML editing options
- File name changes
- Duplicate this order so that you can make edits, updates, or changes
<!-- end -->

- Be scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->
#### Do
Add menu item

#### Don't
Add a menu item
<!-- end -->

If the items in a dropdown include a series of navigational links, each item should:

- Be concise but still give the merchant enough information so they can easily find and accurately navigate to the path they want.

<!-- usagelist -->
#### Do
- Online store
- Messenger
- Facebook
- Buy Button

#### Don't
- Sales channel
<!-- end -->

| Properties | Type | Description |
| ---------- | ---- | ----------- |
| anchorEl | HtmlElement | This is the DOM element that will be used to set the position of the dropdown |
| direction | enum['up', 'down', 'left', 'right'] | The preferred direction to open the dropdown |
| active | boolean | Show or hide the Dropdown |
| disable | boolean | Disable the dropdown |
| activatorWrapper | string | The element type to wrap the dropdown with |
| dropdownItems | DropdownItemProps | items of the dropdown |
| closeOnClickOutside | boolean | Close the dropdown when mouse click outside of the dropdown |
| toggle | function() | Callback when dropdown changes active state |
| onClose | function() | Callback when dropdown is closed |

## Examples

###  Dropdown with action list

Use when presenting a set of actions in a disclosable menu.

```jsx
<div style={{minHeight: '250px'}}>
  <Dropdown
    dropdownItems = [ {
        children: "Item 1",
      }, {
        children: "Item 2",
      }]
    trigger = {<Button>Dropdown1</Button>}
  />
</div>
```
