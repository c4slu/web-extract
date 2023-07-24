// ./pages/extract.tsx

import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar";
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
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

import { ScrollArea } from "@/components/ui/scroll-area"

interface Item {
  DATA: string;
  SHOPPING: string;
  Nota: number;
  QNTD: number;
}



const ExtractPage = () => {
  const [startDate, setStartDate] = useState<Date>();


  const [endDate, setEndDate] = useState<Date>();
  const [data, setData] = useState<Item[]>([]);

  

  
  const handleGetData = async () => {
    const start_f = startDate instanceof Date ? format(startDate, "yyyy-MM-dd") : "";
    const end_f =
      endDate instanceof Date
        ? format(endDate, "yyyy-MM-dd")
        : "";

    try {
      const response = await axios.get(
        `/api/users?startDate=${start_f}&endDate=${end_f}`
      );
      setData(response.data);
      console.log(response.data)
      console.log(start_f);
      console.log(end_f);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="h-screen flex text-white bg-black">
        <div className="absolute z-10">
          <Navbar />
        </div>
        <div className="h-screen justify-center items-center w-screen ml-72 mr-20 pt-10">
          <div className="">
            <div className="flex flex-col justify-center items-center ">
              <h1 className="mb-5 text-xl font-semibold">
                Extração de dados - Nota de Satiscação
              </h1>
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
          <div className="">
            <Table className="w-full bg-zinc-950">
              <ScrollArea className="h-[550px] w-full rounded-xl border border-white/20 p-4">
                <TableCaption>
                  Sem dados por enquanto...
                </TableCaption>
                <TableHeader className="text-sm w-full text-zinc-100 text-center uppercase">
                  <TableRow className="w-full border-none">
                    <TableHead>Data</TableHead>
                    <TableHead>Shopping</TableHead>
                    <TableHead>Nota</TableHead>
                    <TableHead>Quantidade</TableHead>
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
                        {item.Nota}
                      </TableCell>
                      <TableCell className="text-xs px-6 py-4 border-b-[1px] border-white/20">
                        {item.QNTD}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </ScrollArea>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractPage;
