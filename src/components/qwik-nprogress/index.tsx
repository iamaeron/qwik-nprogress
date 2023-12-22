import { component$, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import type { NProgressOptions } from "nprogress";
import NProgress  from "nprogress"; 
import styles from './index.css?inline'
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
  
  useStyles$(styles);

  NProgress.configure(option)

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const navigating = track(() => loc.isNavigating)

    navigating ? NProgress.start() : NProgress.done()
  })

  return (
    <style
      dangerouslySetInnerHTML={`
      --qwik-np-color: ${option.color ?? "#29d"};
      --qwik-np-height: ${option.height ?? 2}px;
      --qwik-np-spinner-width: ${option.spinner?.size ? option.spinner.size : 18}px;
      --qwik-np-spinner-height: ${option.spinner?.size ? option.spinner.size : 18}px;
      --qwik-np-spinner-thickness: ${option.spinner?.thickness ? option.spinner.thickness : 2}px;
  `}
    ></style>
  );
})