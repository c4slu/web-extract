// ./pages/extract.tsx

import React, { useEffect, useState } from "react";
import MenuBar from "../components/menubar";
import Navbar from "../components/navbar";
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
import { Calendar as CalendarIcon , Download, Loader2} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { saveAs } from 'file-saver';

import { ScrollArea } from "@/components/ui/scroll-area";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useRouter } from "next/router";

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
  ALERTA: string;
  QNTD: number;
}
const checkAuthentication = () => {
    const authToken = localStorage.getItem("token"); // Ou qualquer outra forma de obter o token
    return !!authToken; // Retorna true se o token existir, ou false se não existir
};

const ExtractPage = () => {

  const router = useRouter()
  useEffect(() => {
    const isAuthenticated = checkAuthentication();

    // Se o usuário não estiver autenticado (ou seja, não tiver o token)
    // redirecionar para a página de login
    if (!isAuthenticated) {
      router.push("/login"); // Redirecionar para a página de login
    }
  }, []);
  
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [download, setdownload] = React.useState(false);
  

  const start_f =
    startDate instanceof Date
      ? format(startDate, "yyyy-MM-dd")
      : "";
  const end_f =
    endDate instanceof Date
      ? format(endDate, "yyyy-MM-dd")
      : "";
  const handleGetData = async () => {

    setLoading(true);
    setdownload(false)

    try {
      const response = await axios.get(
        `/api/users?startDate=${start_f}&endDate=${end_f}&table=${value}`
      );
      setLoading(false); 
      setdownload(true);
      setData(response.data);
    } catch (error) {
      console.error(error);
      setLoading(false); 
    }
  };
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  console.log(value)

  const cabecalho =
    data.length > 0 ? Object.keys(data[0]) : [];

  async function fetchDataDownload(){
    const csvData = `${cabecalho}\n${data
      .map(
        (item) =>
          `${item.DATA},${item.SHOPPING},${
            value == "nota" ? item.Nota : item.ALERTA
          },${item.QNTD}`
      )
      .join("\n")}`;
    const blob = new Blob([csvData], {
      type: "text/csv",
    });

    saveAs(blob, "dados.csv");

  }




  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex text-white bg-black">
        <div className="h-[calc(100vh-80px)] border-r-[1px] border-white/20">
          <MenuBar />
        </div>
        <div className="h-full justify-center items-center w-full ml-20 mr-20 pt-3">
          <div className="">
            <div className="flex flex-col justify-center items-center ">
              <h1 className="mb-5 text-xl font-semibold">
                Extração de dados
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
                    <CommandInput placeholder="Search table..." />
                    <CommandEmpty>
                      Tabela não encontrada.
                    </CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          onSelect={(currentValue) => {
                            setData([]);
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
            <div className="flex items-center gap-2 justify-center w-full">
              <Button
                className="border-[1px] border-white/30 hover:bg-violet-500 hover:border-none transition-colors duration-200  my-5 px-10 rounded"
                onClick={handleGetData}
                disabled={
                  endDate && startDate && value && start_f < end_f
                    ? false
                    : true
                }
              >
                {loading ? (
                  <Loader2 className="animate-spin"/>
                ) : (
                  <span>Consultar</span>
                )}
              </Button>
              <Button
                className="border-[1px] gap-2 border-white/30 hover:bg-violet-500 hover:border-none transition-colors duration-200  my-5 px-8 rounded"
                onClick={fetchDataDownload}
                disabled={download ? false : true}
              >
                <Download width={20} height={20} />
                Download
              </Button>
            </div>
          </div>
          <ScrollArea
            className={`
                  h-[calc(100vh-350px)] w-full rounded-xl border bg-zinc-950 p-4 border-white/20 
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
                      {value == "nota"
                        ? item.Nota
                        : item.ALERTA}
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
