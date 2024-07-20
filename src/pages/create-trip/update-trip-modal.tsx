import { Calendar, MapPin, X } from "lucide-react";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { format } from 'date-fns';  
import "react-day-picker/dist/style.css";
import { Button } from "../../components/button";

interface UpdateTripModal {
    eventStartAndEndDates: DateRange | undefined
    setDestination: (destination: string) => void
    setEventStartAndEndDates: (dates: DateRange | undefined) => void
    closeUpdateTripModal: () => void
    updateTrip: () => void
}

export function UpdateTripModal({
    setDestination,
    setEventStartAndEndDates,
    eventStartAndEndDates,
    closeUpdateTripModal,
    updateTrip,
} : UpdateTripModal ) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    function openDatePicker() {
        return setIsDatePickerOpen(true)
      }
  
      function closeDatePicker() {
        return setIsDatePickerOpen(false)
      }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL") )
    : null

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
        <div className='w-[480px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className="flex items-center gap-2 flex-1">
      <MapPin className="size-5 text-zinc-400" />
      <input
      type="text" 
      placeholder="Para onde você vai?" 
      className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      onChange={event => setDestination(event.target.value)}
      />
      <button type='button' onClick={closeUpdateTripModal}>
          <X className='size-5 text-zinc-400' />
      </button>
    </div>

    <button onClick={openDatePicker} className='flex items-center gap-2 text-left w-[240px]'>
      <Calendar className="size-5 text-zinc-400" />

      <span className="text-lg text-zinc-400 w-40 flex-1">
        {displayedDate || 'Quando'}
      </span>
    </button>

    {isDatePickerOpen && (
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Confirmar criação de viagem</h2>
          <button type='button' onClick={closeDatePicker}>
            <X className='size-5 text-zinc-400' />
          </button>
          </div>
        </div>

        <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
      </div>
    </div>
    )}
        <Button onClick={updateTrip} variant="primary" size="full">
            Atualizar viagem
        </Button>
    </div>
    </div>
    )
}