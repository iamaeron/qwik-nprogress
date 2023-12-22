import { component$, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import type { NProgressOptions } from "nprogress";
import NProgress from "nprogress";
import NProgressStyles from "nprogress/nprogress.css?inline";
import { useLocation } from "@builder.io/qwik-city";

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

export const QwikNProgress = component$<QwikNProgressProps>(
  ({ option = {} }) => {
    const loc = useLocation();

    useStyles$(
      NProgressStyles +
        `
    #nprogress .bar {
      background: var(--qwik-np-color);
      height: var(--qwik-np-height);
    }

    #nprogress .peg {
      box-shadow:
        0 0 10px var(--qwik-np-color),
        0 0 5px var(--qwik-np-color);
    }

    #nprogress .spinner-icon {
      width: var(--qwik-np-spinner-width);
      height: var(--qwik-np-spinner-height);
      border: solid var(--qwik-np-spinner-thickness) transparent;
      border-top-color: var(--qwik-np-color);
      border-left-color: var(--qwik-np-color);
    }
  `
    );

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      const navigating = track(() => loc.isNavigating);

      NProgress.configure(option);

      navigating ? NProgress.start() : NProgress.done();
    });

    return (
      <style
        dangerouslySetInnerHTML={`
      :root {
        --qwik-np-color: ${option.color ?? "#29d"};
        --qwik-np-height: ${option.height ?? 2}px;
        --qwik-np-spinner-width: ${
          option.spinner?.size ? option.spinner.size : 18
        }px;
        --qwik-np-spinner-height: ${
          option.spinner?.size ? option.spinner.size : 18
        }px;
        --qwik-np-spinner-thickness: ${
          option.spinner?.thickness ? option.spinner.thickness : 2
        }px;
      }
  `}
      ></style>
    );
  }
);
