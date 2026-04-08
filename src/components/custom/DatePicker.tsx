import { useState } from "react";
import { addDays, format } from "date-fns"; // Añadimos isValid
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParams } from "react-router";
import { getSafeDate } from "@/utils/functions";

export function DatePickerWithRange() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dateFrom = getSafeDate("from", new Date(new Date()), searchParams);
  const dateTo = getSafeDate("to", addDays(dateFrom, 20), searchParams);

  const [date, setDate] = useState<DateRange | undefined>({
    from: dateFrom,
    to: dateTo,
  });

  return (
    <Field className="mx-auto w-60">
      <FieldLabel className="font-bold" htmlFor="date-picker-range">
        Pick a range of dates
      </FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="date-picker-range"
              className="justify-start px-2.5 font-normal w-full"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newRange) => {
              setDate(newRange);

              // Solo actualizamos la URL si el rango está completo
              // o manejamos el caso de que sea una selección parcial.
              if (newRange?.from && newRange?.to) {
                setSearchParams({
                  from: format(newRange.from, "dd-MM-yyyy"),
                  to: format(newRange.to, "dd-MM-yyyy"),
                });
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
