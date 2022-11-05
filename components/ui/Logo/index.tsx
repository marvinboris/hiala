import { TvIcon } from "@heroicons/react/24/outline";

export default function Logo({ className = '' }) {
    // return <img className={`h-[53.02px] lg:h-[112.95px] w-auto ${className}`} src="/images/logo.svg" alt="Logo" />
    return <span className="text-primary font-bold text-3xl flex items-center space-x-1"><span>HIALA</span><TvIcon className="w-8" /></span>
}