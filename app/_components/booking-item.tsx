import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const BookingItem = () => {
  return (
    <Card className='hover:bg-accent duration-150 cursor-default'>
        <CardContent className='py-0 flex justify-between'>
            <div className='flex flex-col gap-2 py-5'>
                <Badge className='bg-[#221c3d] text-primary w-fit hover:bg-[#221c3d]'>
                    Agendado
                </Badge>
                <h2 className='font-bold'>Corte de cabelo</h2>

                <div className="flex items-center gap-2">
                    <Avatar className='h-6 w-6'>
                        <AvatarImage src='https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png'/>

                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>

                    <h3 className='text-sm'>Vintage Barber</h3>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center border-l border-solid border-secondary px-3'>
                <p className='text-sm'>Fevereiro</p>
                <p className='text-2xl'>06</p>
                <p className='text-sm'>09:45</p>
            </div>
        </CardContent>
    </Card>
  )
}

export default BookingItem