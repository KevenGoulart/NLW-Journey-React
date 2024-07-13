import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { AddLinkModal } from "./add-link-modal";

interface Link {
    id: string
    title: string | null
    url: string
}

export function ImportantLinks() {
    const { tripId } = useParams()
    const [links, SetLinks] = useState<Link[]>([])
    const [ isAddLinkModalOpen, setIsAddLinkModalOpen ] = useState(false)

    function openAddLinkModal() {
        setIsAddLinkModalOpen(true)
    }

    function closeAddLinkModal() {
        setIsAddLinkModalOpen(false)
    }

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(response => SetLinks(response.data.links))
    }, [tripId])

    return (
        <div className="space-y-6">
        <h2 className="font-semibold text-xl">Links importantes</h2>
        <div className="space-y-5">
            {links.map((link, index) => {
            return (
                <div key={link.id} className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">{link.title ?? `Link ${index}`}</span>
                    <a className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                       {link.url}
                    </a>
               </div>
               <Link2 className="text-zinc-400 size-5 shrink-0" />
           </div>
           )
        })}
        </div>

        <Button onClick={openAddLinkModal} variant="secondary" size="full">
            <Plus className="size-5" />
            Cadastrar novo link
        </Button>

        {isAddLinkModalOpen && (
                <AddLinkModal closeAddLinkModal={closeAddLinkModal} />
            )}
       </div>
    )
}