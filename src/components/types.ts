import { type NProgressOptions } from "nprogress";

export interface QwikNProgressProps {
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
