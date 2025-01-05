declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.svg' {
    import { FC, SVGProps } from 'react'
    const content: FC<SVGProps<SVGElement>>
    export default content
}

