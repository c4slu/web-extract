// ./pages/extract.tsx

import React, { useEffect, useState } from "react";
import MenuBar from "../components/menubar";
import Navbar from "../components/navbar";
import Combobox from "../components/combobox";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const frameworks = [
  {
    value: "nota",
    label: "Nota",
  },
  {
    value: "alertas_email_midias",
    label: "alertas_email_midias",
  },
];

interface Item {
  DATA: string;
  SHOPPING: string;
  Nota: number;
  Alerta: string;
  QNTD: number;
}

const customScrollbarStyle = `
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(00, 0, 0, 0.5);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const ExtractPage = () => {
  const [startDate, setStartDate] = useState<Date>();

  const [endDate, setEndDate] = useState<Date>();
  const [data, setData] = useState<Item[]>([]);

  const handleGetData = async () => {
    const start_f =
      startDate instanceof Date
        ? format(startDate, "yyyy-MM-dd")
        : "";
    const end_f =
      endDate instanceof Date
        ? format(endDate, "yyyy-MM-dd")
        : "";

    try {
      const response = await axios.get(
        `/api/users?startDate=${start_f}&endDate=${end_f}&table=${value}`
      );
      setData(response.data);
      console.log(response.data);
      console.log(start_f);
      console.log(end_f);
    } catch (error) {
      console.error(error);
    }
  };
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const cabecalho =
    data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex text-white bg-black">
        <div className="h-[calc(100vh-80px)] border-r-[1px] border-white/20">
          <MenuBar />
        </div>
        <div className="h-full justify-center items-center w-full ml-20 mr-20 pt-10">
          <div className="">
            <div className="flex flex-col justify-center items-center ">
              <h1 className="mb-5 text-xl font-semibold">
                Extração de dados - Nota de Satisfação
              </h1>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] mb-5 justify-between bg-black rounded"
                  >
                    {value
                      ? frameworks.find(
                          (framework) =>
                            framework.value === value
                        )?.label
                      : "Select table..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 bg-black rounded">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>
                      No framework found.
                    </CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value
                                ? ""
                                : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* data de inicio */}
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start rounded border-[1px] border-white/30 bg-black text-left font-normal",
                        !startDate &&
                          "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "dd/MM/yyyy")
                      ) : (
                        <span>Data de Inicio</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="bg-black"
                    />
                  </PopoverContent>
                </Popover>

                {/* data de fim */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start bg-black border-[1px] border-white/30 text-left font-normal rounded",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "dd/MM/yyyy")
                      ) : (
                        <span>Data de Fim</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="bg-black"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <Button
                className="border-[1px] border-white/30 hover:bg-violet-500 hover:border-none transition-colors duration-200  my-5 px-10 rounded"
                onClick={handleGetData}
              >
                Consultar
              </Button>
            </div>
          </div>
          <ScrollArea
            className={`
                  h-[calc(100vh-320px)] w-full rounded-xl border bg-zinc-950 p-4 border-white/20 
                `}
          >
            <Table className="">
              <TableCaption>
                Sem dados por enquanto...
              </TableCaption>
              <TableHeader className="text-sm text-zinc-100 text-center uppercase">
                <TableRow className=" border-none">
                  {cabecalho.map((cabecalho, index) => (
                    <TableHead key={index}>
                      {cabecalho}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="text-zinc-100 text-sm">
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs px-6 py-4 border-b-[1px] border-white/20">
                      {item.DATA.substring(0, 10)}
                    </TableCell>
                    <TableCell className="text-xs px-6 py-4 border-b-[1px] border-white/20">
                      {item.SHOPPING}
                    </TableCell>
                    <TableCell className="text-xs px-6 py-4 border-b-[1px] border-white/20">
                      {value == "NOTA"
                        ? item.Nota
                        : item.Alerta}
                    </TableCell>
                    <TableCell className="text-xs px-6 py-4 border-b-[1px] border-white/20">
                      {item.QNTD}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ExtractPage;
