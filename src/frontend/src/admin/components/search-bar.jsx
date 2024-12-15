import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'



export function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
      />
    </div>
  )
}

