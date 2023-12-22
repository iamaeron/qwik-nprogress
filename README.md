# Qwik NProgress

Qwik wrapper of [NProgress](https://github.com/rstacruz/nprogress) for Qwik City.

## Installation

Use your preferred package manager, but this snippet uses [pnpm](https://pnpm.io):

```bash
pnpm add @iamaeron/qwik-nprogress
```

## Usage

It is suggested to add the component in your layout file like `src/routes/layout.tsx` so that the progress bar will show on any route/url changes.

```jsx
import { QwikNProgress } from '@iamaeron/qwik-nprogress'
import { Slot } from 'builder.io/qwik'

export default component$(() => {

  return (
    <>
      <QwikNProgress />
      <Slot />
    </>
  );
});
```

## Customization

`<QwikNProgress />` provides an `option` prop to change your [NProgress settings](https://github.com/rstacruz/nprogress#configuration). Additionally, you can tweak the bar's width and height, the spinner's size and thickness, and their color.

### Example:

```jsx
<QwikNProgress 
    options={{
        // ... nprogress settings,
        color: '#ef4444',
        height: 4,
        spinner: {
            size: 20,
            thickness: 4
        }
    }}
/>
```

### Options

#### `color`
- allows you to change the bar's, and spinner color.
- *default* - **#29d**
#### `height` 
- allows you to change the bar's height.
- *default* - **2px**
#### `spinner.size` 
- allows you to change the spinner's size (width/height).
- *default* - **18px**
#### `spinner.thickness` 
- **allows you to change the spinner's thickness.**
- *default* - **2px**