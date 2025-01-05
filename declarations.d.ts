declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.svg" {
    import * as React from "react";
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export { ReactComponent };
}
