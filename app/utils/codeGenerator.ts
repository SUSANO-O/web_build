import { Component } from '../components/Editor'

export function generateHTML(components: Component[]): string {
  let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Generated Layout</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n'

  function generateComponentHTML(component: Component): string {
    switch (component.type) {
      case '1Column':
      case '2Columns':
      case '3Columns':
      case '4Columns':
      case '6Columns':
        return `<div class="grid-${component.type}">\n${component.children?.map(generateComponentHTML).join('\n') || ''}\n</div>`
      case '2ColumnsSplit':
        return `<div class="grid-2ColumnsSplit">\n<div class="col-5">${component.children?.[0] ? generateComponentHTML(component.children[0]) : ''}</div>\n<div class="col-7">${component.children?.[1] ? generateComponentHTML(component.children[1]) : ''}</div>\n</div>`
      case 'LeftSidebar':
        return `<div class="grid-LeftSidebar">\n<div class="sidebar">${component.children?.[0] ? generateComponentHTML(component.children[0]) : ''}</div>\n<div class="main">${component.children?.[1] ? generateComponentHTML(component.children[1]) : ''}</div>\n</div>`
      case 'RightSidebar':
        return `<div class="grid-RightSidebar">\n<div class="main">${component.children?.[0] ? generateComponentHTML(component.children[0]) : ''}</div>\n<div class="sidebar">${component.children?.[1] ? generateComponentHTML(component.children[1]) : ''}</div>\n</div>`
      case 'HeaderContent':
        return `<div class="grid-HeaderContent">\n<header>${component.children?.[0] ? generateComponentHTML(component.children[0]) : ''}</header>\n<main>${component.children?.[1] ? generateComponentHTML(component.children[1]) : ''}</main>\n</div>`
      case 'Navbar':
        return '<nav class="navbar">Navbar Placeholder</nav>'
      case 'Carousel':
        return '<div class="carousel">Carousel Placeholder</div>'
      case 'Heading':
        return `<h2>${component.content || 'Heading'}</h2>`
      case 'Text':
        return `<p>${component.content || 'Text content'}</p>`
      case 'Link':
        return `<a href="#">${component.content || 'Link'}</a>`
      case 'LinkBox':
        return `<div class="link-box"><a href="#">${component.content || 'Link Box'}</a></div>`
      case 'ImageBox':
        return `<div class="image-box"><img src="${component.imageUrl || 'placeholder.jpg'}" alt="Image" /></div>`
      case 'Video':
        return '<div class="video-placeholder">Video Placeholder</div>'
      case 'Map':
        return '<div class="map-placeholder">Map Placeholder</div>'
      default:
        return ''
    }
  }

  html += components.map(generateComponentHTML).join('\n')
  html += '\n</body>\n</html>'

  return html
}

export function generateCSS(components: Component[]): string {
  let css = `
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  margin: 0;
  padding: 0;
}

.navbar {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.carousel {
  background-color: #f4f4f4;
  padding: 2rem;
  text-align: center;
}

.link-box {
  background-color: #f4f4f4;
  padding: 1rem;
  margin-bottom: 1rem;
}

.image-box img {
  max-width: 100%;
  height: auto;
}

.video-placeholder, .map-placeholder {
  background-color: #ddd;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.grid-1Column, .grid-2Columns, .grid-3Columns, .grid-4Columns, .grid-6Columns,
.grid-2ColumnsSplit, .grid-LeftSidebar, .grid-RightSidebar, .grid-HeaderContent {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

.grid-1Column { grid-template-columns: 1fr; }
.grid-2Columns { grid-template-columns: repeat(2, 1fr); }
.grid-3Columns { grid-template-columns: repeat(3, 1fr); }
.grid-4Columns { grid-template-columns: repeat(4, 1fr); }
.grid-6Columns { grid-template-columns: repeat(6, 1fr); }
.grid-2ColumnsSplit { grid-template-columns: 5fr 7fr; }
.grid-LeftSidebar, .grid-RightSidebar { grid-template-columns: 1fr 3fr; }
.grid-HeaderContent { grid-template-rows: auto 1fr; }

@media (max-width: 768px) {
  .grid-2Columns, .grid-3Columns, .grid-4Columns, .grid-6Columns,
  .grid-2ColumnsSplit, .grid-LeftSidebar, .grid-RightSidebar {
    grid-template-columns: 1fr;
  }
}
`

  return css
}

