import Heading from '@/components/ui/Heading'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className=' flex flex-col items-center'>
      <Heading> Producto no encontrado </Heading>
      <Link 
        href={'/admin/products'}
        className=' bg-amber-400 text-black px-10 py-3 w-full lg:w-auto text-xl text-center font-bold cursor-pointer'
        
      >
        Volver a Productos
      </Link>
    </div>
  )
}
