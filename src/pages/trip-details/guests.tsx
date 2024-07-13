import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { InviteGuestsModal } from "../create-trip/invite-guests-modal";

interface Participant {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}

export function Guests() {
    const { tripId } = useParams()
    const [ participants, setParticipants] = useState<Participant[]>([])
    const emailsToInvite = participants.map((participant) => { 
        return participant.email
     })

    const [manageGuests, setManageGuests] = useState(false)

    async function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    
        const data = new FormData(event.currentTarget)
        const email = data.get('email')?.toString()
    
        if(!email) {
          return
        }
    
        if(emailsToInvite.includes(email)) {
          return
        }
    
        await api.post(`/trips/${tripId}/invites`, {
            email
        })

        window.location.reload()
    
        event.currentTarget.reset()
      }

      function handleManageGuestsModal() {
        setManageGuests(!manageGuests)
      }

    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId])
    
    return (
        <div className="space-y-6">
        <h2 className="font-semibold text-xl">Convidados</h2>
        <div className="space-y-5">
           {participants.map((participant, index) => {
            return (
                <div key={participant.id} className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                    <span className="block text-sm text-zinc-400 truncate">
                       {participant.email}
                   </span>
                  </div>
                    {participant.is_confirmed ? (
                        <CheckCircle2 className="size-5 shrink-0 text-green-400" />
                    ) : (
                        <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                    )}
               </div>
             )
           })}
        </div>

        {manageGuests && (<InviteGuestsModal
        emailsToInvite={emailsToInvite}
        addNewEmailToInvite={addNewEmailToInvite}
        closeGuestsModal={handleManageGuestsModal}
         />)
        }

        <Button onClick={handleManageGuestsModal} variant="secondary" size="full">
            <UserCog className="size-5" />
            Gerenciar Convidados
        </Button>
       </div>
    )
}