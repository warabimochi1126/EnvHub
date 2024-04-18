import Link from "next/link";

export default function MainCard({ text }: { text: string }) {
  return (
    <Link
      href="#"
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
        {text}
      </p>
    </Link>
  );
}
