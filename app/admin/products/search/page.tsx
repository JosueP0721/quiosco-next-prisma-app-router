import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name:{
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })

    return products
}
   

export default async function SearchPage({searchParams} : {searchParams: {search: string}}) {

    const products = await searchProducts(searchParams.search)

    return (
        <>
            <Heading>Resultados de búsqueda: {searchParams.search}</Heading>

            <div
              className=' flex flex-col lg:flex-row gap-5 justify-end'
            >
                <ProductSearchForm />
            </div>
            {products.length === 0 ? (
                <p className=" text-center text-xl">No hay Resultados</p>
            ) : (
                <ProductTable 
                    products={products}
                />        
            )}
        </>
    )
}
