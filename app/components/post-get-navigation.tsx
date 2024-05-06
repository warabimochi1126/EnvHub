import Link from "next/link"

interface PostGetNavigetionCardProps {
    calledUrl: string;
}

export default function PostGetNavigetionCard({ calledUrl }: PostGetNavigetionCardProps) {
    return (
        <Link href={ calledUrl === "post" ? "/share/get" : "/share/post" } className="bg-gray-600 h-[216px] w-40 rounded flex justify-center items-center">
            <p className="text-white font-bold text-sm">
                { calledUrl === "post" ? "getページへ遷移する" : "postページへ遷移する" }
            </p>
        </Link>
    )
}