import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { Smartphone } from "lucide-react";
import { toast } from "sonner";
import BarbershopContact from "./_components/barbershop-contact";
interface DetailsProps {
  params: {
    id?: string;
  };
}
const Details = async ({ params }: DetailsProps)  =>  {

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    } 
  })

  if(!barbershop) {
    // TODO redirect to homepage
    return null
  }

  return (
    <>
      <div className="px-5 py-6 pb-6 border-solid border-b border-secondary">
        <h2 className="text-gray-400 uppercase font-semibold text-sm mb-3">
          Sobre nós
        </h2>
        <p className="text-white font-[400] text-sm ">
          Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
          equipe de mestres barbeiros transforma cortes de cabelo e barbas em
          obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo
          e uma comunidade unida.
        </p>
      </div>

      <BarbershopContact phone={barbershop.phone}/>
    </>
  );
};

export default Details;
