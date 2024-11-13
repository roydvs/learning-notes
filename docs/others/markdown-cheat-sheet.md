# Markdown Cheat Sheet

## Basic Syntax
### Headings

```md
# A first-level heading
## A second-level heading
### A third-level heading
```

### Styling text

|Example|Output|
|-|-|
|`**Bold**`|**Bold**|
|`*Italic*`|*Italic*|
|`~~Strikethrough~~`|~~Strikethrough~~|
|`<ins>Underline</ins>`|<ins>Underline</ins>|
|`__Bold__*Italic*`|__Bold__*Italic*|
|`***Bold and Italic***`|***Bold and Italic***|
|`Subscript<sub>sub</sub> and Superscript<sup>sup</sup>`|subscript<sub>sub</sub> and superscript<sup>sup</sup>|

### Heading ID

`#### My Great Heading {#custom-id}`

#### My Great Heading {#custom-id}

### Links

|Example|Output|
|-|-|
|`[Web Link](https://www.github.com)`|[Web Link](https://www.github.com)|
|`[Section Link](#links)`|[Section Link](#links)|
|`[Relative Link](markdown-cheat-sheet)`|[Relative Link](markdown-cheat-sheet)|

### Image

```md
**Image:**

![Alt text](https://github.githubassets.com/favicons/favicon.png)

**Linked Image:**

[![Alt text](https://github.githubassets.com/favicons/favicon.png)](https://www.github.com)
```

**Image:**

![Alt text](https://github.githubassets.com/favicons/favicon.png)

**Linked Image:**

[![Alt text](https://github.githubassets.com/favicons/favicon.png)](https://www.github.com)

### List

```md
3. Item 1
   - Item 1.1
   - Item 1.2
     * Item 1.2.1
   + Item 1.3
3. Item 2
```

3. Item 1
   - Item 1.1
   - Item 1.2
     * Item 1.2.1
   + Item 1.3
3. Item 2

### Task List

```md
- [x] Item 1
- [ ] Item 2
- [ ] Item 3
```

- [x] Item 1
- [ ] Item 2
- [ ] Item 3

### Table

```md
|Default|Centered|Left-Aligned|Right-Aligned|
|-|:-:|:-|-:|
|A Very Long Title|A Very Long Title Too|Another Very Long Title|Another Very Long Title Too|
|Text|Text|Text|Text|
```

|Default|Centered|Left-Aligned|Right-Aligned|
|-|:-:|:-|-:|
|A Very Long Title|A Very Long Title Too|Another Very Long Title|Another Very Long Title Too|
|Text|Text|Text|Text|

### Quoting Text

```md
> Quoting Text
```

> Quoting Text

### Quoting Code

````md
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 5
}
```
````

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 5
}
```

#### Double Quoting Code

`````md
````md
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 5
}
```
````
`````

````md
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 5
}
```
````

### Footnotes

```md
Here is a simple footnote[^1].

[^1]: Reference.
```

Here is a simple footnote[^1].

[^1]: Reference.

### Horizontal Rule

```md 
---
```

---

## Github Extended Syntax

### Alert

```md
> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
```

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

### Using emojis

> - [Github Emojis API](https://api.github.com/emojis)
> - [Unicode Emoji Charts](https://unicode.org/emoji/charts/full-emoji-list.html)

`:kissing_cat:`: :kissing_cat:



### Color Models

|Syntax|Example|Output|
|-|-|-|
|HEX \`#RRGGBB`|\`#0969DA`|`#0969DA`|
|RGB \`rgb(R,G,B)`|\`rgb(9,105,218)`|`rgb(9,105,218)`|
|HSL \`hsl(H,S,L)`|\`hsl(212,92%,45%)`|`hsl(212,92%,45%)`|