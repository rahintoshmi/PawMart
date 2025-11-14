import { Hourglass } from "react-loader-spinner";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-base-100)]">
            <Hourglass
                visible={true}
                height={80}
                width={80}
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["#3A756D", "#3A756D"]} 
            />
        </div>
    );
}
