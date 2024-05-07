import Link from "next/link"

interface PostGetNavigetionCardProps {
    calledUrl: string;
}

export default function PostGetNavigetionCard({ calledUrl }: PostGetNavigetionCardProps) {
    const dynamicMarginTop = calledUrl === "post" ? "" : "mt-5";
    
    return (
        <div>
            <Link href={ calledUrl === "post" ? "/share/get" : "/share/post" } 
            className={`${dynamicMarginTop} bg-gray-600 h-[216px] w-40 rounded flex justify-center items-center`}>
                <p className="text-white font-bold text-sm">
                    { calledUrl === "post" ? "getページへ遷移する" : "postページへ遷移する" }
                </p>
            </Link>
        </div>
    )
}