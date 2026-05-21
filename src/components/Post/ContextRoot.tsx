import { Children, ReactNode } from "react"
import { PostProvider } from "./PostContext/PostProvider"

type ContextRootProps = {
    children?: ReactNode
}

export function ContextRoot({children = <></>}: ContextRootProps) {
    return (
        <PostProvider>
            {children}
        </PostProvider>
    )
}