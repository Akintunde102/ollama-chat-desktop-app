import { Loader } from '../components/Loader';

interface FullPageLoaderProps {
    loading: boolean;
    loadingText: string;
}

const FullPageLoader = ({ loading, loadingText }: FullPageLoaderProps) => {

    if (!loading) {
        return <></>
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <Loader loading={true} />
            <p className="block mt-5">{loadingText}</p>
        </div>
    )

};

export default FullPageLoader;