import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-4 text-sm text-gray-500 flex items-center justify-between">
        <div>© {new Date().getFullYear()} NexGenDevs</div>
        <div className="space-x-4">
          <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
          <Link href="/terms" className="hover:text-blue-600">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
