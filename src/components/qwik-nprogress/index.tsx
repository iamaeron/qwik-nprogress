import { component$, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import type { NProgressOptions } from "nprogress";
import NProgress  from "nprogress"; 
import { useLocation } from '@builder.io/qwik-city'

interface QwikNProgressProps {
  option?: Partial<
    NProgressOptions & {
      color: string;
      height: number;
      spinner: {
        size: number;
        thickness: number;
      };
    }
  >;
}

export const QwikNProgress = component$<QwikNProgressProps>(({ option = {} }) => {
  const loc = useLocation()
  
  useStyles$(`
  /* nprogress.css */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: var(--qwik-np-color);
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--qwik-np-height);
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow:
    0 0 10px var(--qwik-np-color),
    0 0 5px var(--qwik-np-color);
  opacity: 1;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: var(--qwik-np-spinner-width);
  height: var(--qwik-np-spinner-height);
  box-sizing: border-box;

  border: solid var(--qwik-np-spinner-thickness) transparent;
  border-top-color: var(--qwik-np-color);
  border-left-color: var(--qwik-np-color);
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
  animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}  
  `);
  
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const navigating = track(() => loc.isNavigating)
    
    NProgress.configure(option)

    navigating ? NProgress.start() : NProgress.done()
  })

  return (
    <style
      dangerouslySetInnerHTML={`
      :root {
        --qwik-np-color: ${option.color ?? "#29d"};
        --qwik-np-height: ${option.height ?? 2}px;
        --qwik-np-spinner-width: ${option.spinner?.size ? option.spinner.size : 18}px;
        --qwik-np-spinner-height: ${option.spinner?.size ? option.spinner.size : 18}px;
        --qwik-np-spinner-thickness: ${option.spinner?.thickness ? option.spinner.thickness : 2}px;
      }
  `}
    ></style>
  );
})