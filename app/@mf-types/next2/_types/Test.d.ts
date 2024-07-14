import { CSSProperties, ReactNode } from "react";
export interface TestProps extends CSSProperties {
    children: ReactNode;
}
export declare function Test({ children }: TestProps): import("react").JSX.Element;
export default Test;
