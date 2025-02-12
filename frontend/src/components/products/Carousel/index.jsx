import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import CardProduct from "@/components/products/card";
import { useMediaQuery } from "@mui/material";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import ModalAddQuantity from "@/components/ui/ModalAddQuantity";
import { useDisclosure } from "@nextui-org/react";

export function CarouselCardsProducts({ products }) {
	const isDesktop = useMediaQuery("(min-width: 1024px)");
	const { isOpen: isOpenModalAdd, onOpen: onOpenModalAdd, onClose: onCloseModalAdd } = useDisclosure();
	const [info, setInfo] = React.useState({});

	const handleOpen = (stock, product_id) => {
		setInfo({
			stock: Number(stock),
			product_id: product_id,
		});
		onOpenModalAdd();
	};

	const router = useRouter();
	return (
		<>
			<Carousel
				opts={{
					align: "start",
				}}
				className="w-full lg:w-[80%]">
				<CarouselContent className="pb-16 pt-8 flex basis-0">
					{products?.map((item, index) => (
						<CarouselItem className="basis-8/12 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 flex justify-center" key={index}>
							<span className="w-64 h-[450px]">
								<CardProduct product={item} handleOpen={handleOpen} />
							</span>
						</CarouselItem>
					))}
				</CarouselContent>
				{isDesktop && <CarouselPrevious />}
				{isDesktop && <CarouselNext />}
			</Carousel>
			{isOpenModalAdd && <ModalAddQuantity info={info} onClose={onCloseModalAdd} isOpen={isOpenModalAdd} />}
		</>
	);
}
