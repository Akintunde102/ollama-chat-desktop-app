import React from "react"

interface LoaderProps {
    loading?: Boolean;
}

export const Loader = React.memo(function loader({ loading }: LoaderProps) {

    if (!loading) {
        return <></>
    }

    return (
        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-purple-600 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    )
})