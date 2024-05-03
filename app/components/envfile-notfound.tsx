interface EnvFileNotFoundProps {
  calledUrl: string;
}

export function EnvFileNotFound({ calledUrl }: EnvFileNotFoundProps) {
  const dynamicHeight = calledUrl === "post" ? "h-[calc(100vh-160px-320px)]" : "h-[calc(100vh-160px)]";

  return (
    <div className={`${dynamicHeight} flex justify-center items-center`}>
      <p className="text-gray-400">アップロードされたenvファイルがまだ存在しません。</p>
    </div>
  )
}