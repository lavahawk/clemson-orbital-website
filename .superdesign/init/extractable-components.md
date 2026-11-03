# Extractable components

## Layout

## NavBar
- Source: `index.html` (<header class="site-header">, repeated on every page)
- Category: layout
- Description: Sticky top bar with logo, wordmark, six nav links, mobile hamburger
- Extractable props: activeItem (string, default: "home")
- Hardcoded: logo SVG, link labels, CSS

## Footer
- Source: `index.html` (<footer class="site-footer">)
- Category: layout
- Description: Org name, location, email, link list, copyright
- Extractable props: none
- Hardcoded: all text

## Basic
- Card (.card), Button (.btn-primary/.btn-ghost), LeaderCard (.leader), form Field (.field)
