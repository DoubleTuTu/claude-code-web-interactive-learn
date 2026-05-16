import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold text-white/20 mb-4">404</h1>
      <p className="text-xl text-white/60 mb-2">页面未找到</p>
      <p className="text-white/40 mb-8">
        你要访问的课程页面不存在，可能已被移除或链接有误。
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
      >
        返回首页
      </Link>
    </div>
  );
}
