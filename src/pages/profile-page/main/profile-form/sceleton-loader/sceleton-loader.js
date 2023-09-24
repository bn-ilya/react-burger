import ContentLoader from "react-content-loader"

export default function SceletonLoader(props) {
    return (
        <ContentLoader
            speed={2}
            width={480}
            height={644}
            viewBox="0 0 480 640"
            backgroundColor="#2f2f37"
            foregroundColor="#6b6b90"
            {...props}
        >
            <rect x="183" y="0" rx="15" ry="15" width="95" height="35" />
            <rect x="8" y="52" rx="35" ry="35" width="462" height="64" />
            <rect x="8" y="146" rx="35" ry="35" width="462" height="64" />
            <rect x="8" y="240" rx="35" ry="35" width="462" height="64" />
        </ContentLoader>
    )
}