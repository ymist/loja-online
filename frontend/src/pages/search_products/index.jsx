import Footer from "@/components/Footer";
import Header from "@/components/Header/NavBar";
import CardProduct from "@/components/products/card";
import { AccordionList } from "@/components/ui/accordion_list";
import ModalAddQuantity from "@/components/ui/ModalAddQuantity";
import { RadioLayout } from "@/components/ui/radiolayout";
import useStore from "@/data/global_states/useProducts";
import { Divider, Pagination, Select, SelectItem, Spinner, useDisclosure } from "@nextui-org/react";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function SearchProducts() {
	const products = useStore((state) => state.products);
	const categories = useStore((state) => state.categories);
	const brands = useStore((state) => state.brands);
	const [selectedLayout, setSelectedLayout] = useState("2");
	const [selectedFilter, setSelectedFilter] = useState(new Set(["popular"]));
	const [activeCategoryFilters, setActiveCategoryFilters] = useState(new Set());
	const [activeBrandFilters, setActiveBrandFilters] = useState(new Set());
	const [filteredProducts, setFilteredProducts] = useState(products);
	const [value, setValue] = useState({ min: 0, max: 0 });
	const { isOpen: isOpenModalAdd, onOpen: onOpenModalAdd, onClose: onCloseModalAdd } = useDisclosure();
	const [info, setInfo] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 16;

	const filters = [
		{
			label: "Popular",
			value: "popular",
		},
		{
			label: "Novidades",
			value: "news",
		},
		{
			label: "A-Z",
			value: "az",
		},
		{
			label: "Menor Preço",
			value: "lowprice",
		},
		{
			label: "Maior Preço",
			value: "highprice",
		},
	];

	const indexOfLastProduct = currentPage * itemsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

	const handlePageChange = (page) => {
		window.scrollTo({
			top: "selectedFrame.offsetTop",
			left: 0,
			behavior: "smooth",
		});
		setCurrentPage(page);
	};

	useEffect(() => {
		setCurrentPage(1);
		applyFilters();
	}, [activeCategoryFilters, activeBrandFilters, products, value]);

	const toogleBrandFilter = (brand) => {
		const newFilters = new Set(activeBrandFilters);
		if (newFilters.has(brand)) {
			newFilters.delete(brand);
		} else {
			newFilters.add(brand);
		}
		console.log(newFilters);
		setActiveBrandFilters(newFilters);
	};

	const toogleCategoryFilter = (category) => {
		const newFilters = new Set(activeCategoryFilters);
		if (newFilters.has(category)) {
			newFilters.delete(category);
		} else {
			newFilters.add(category);
		}
		console.log(newFilters);
		setActiveCategoryFilters(newFilters);
	};

	const applyFilters = () => {
		let filtered = products;

		if (activeCategoryFilters.size > 0) {
			filtered = filtered.filter((product) => activeCategoryFilters.has(product.category.name));
		}
		if (activeBrandFilters.size > 0) {
			filtered = filtered.filter((product) => activeBrandFilters.has(product.brand.name));
		}

		if (value.min != 0) {
			filtered = filtered.filter((product) => Number(product.price.replace(",", ".")) >= value.min);
		}

		if (value.max != 0) {
			filtered = filtered.filter((product) => Number(product.price.replace(",", ".")) <= value.max);
		}
		setFilteredProducts(filtered);
	};

	const handleOpen = (stock, product_id) => {
		setInfo({
			stock: Number(stock),
			product_id: product_id,
		});
		onOpenModalAdd();
	};

	return (
		<div className="min-h-screen flex flex-col items-center">
			<Head>
				<title>Produtos - uShop</title>
			</Head>
			<Header />
			<main className="flex justify-center flex-col w-full gap-4 lg:w-3/5 p-4">
				<h1 className="text-2xl tracking-widest text-palette-base-gray-900 flex justify-center items-center gap-3 font-semibold">PRODUTOS</h1>
				<div className="flex flex-col">
					<div className="w-full">
						<div className="w-full gap-3 bg-gray-300 p-4 bg-palette-base-gray-400 flex flex-row-reverse items-center">
							<Select size="sm" onSelectionChange={setSelectedFilter} selectedKeys={selectedFilter} className="w-[125px] text-sm">
								{filters.map((item) => (
									<SelectItem key={item.value}>{item.label}</SelectItem>
								))}
							</Select>
							<Divider orientation="vertical" />
							<RadioLayout value={selectedLayout} setValue={setSelectedLayout} />
							<Divider orientation="vertical" />
							<span className="text-palette-base-gray-900 text-sm font-normal">
								<b>{filteredProducts?.length}</b> Produtos
							</span>
						</div>
					</div>
					<div className="flex flex-grow">
						<div className="w-1/6">
							<AccordionList
								toogleCategoryFilter={toogleCategoryFilter}
								toogleBrandFilter={toogleBrandFilter}
								categories={categories}
								brands={brands}
								value={value}
								setValue={setValue}
							/>
						</div>
						<div className="flex flex-col gap-4 w-full">
							{filteredProducts.length !== 0 ? (
								<>
									<div
										className={`flex-grow p-4 grid gap-4 ${
											selectedLayout === "2" ? "grid-cols-2" : selectedLayout === "3" ? "grid-cols-3" : "grid-cols-4"
										}`}>
										{currentProducts.map((product) => (
											<div key={product.id} className="my-4">
												<CardProduct product={product} handleOpen={handleOpen} />
											</div>
										))}
									</div>
									<div className="w-full flex justify-center">
										<Pagination
											isCompact
											color="success"
											showControls
											total={Math.ceil(filteredProducts.length / itemsPerPage)}
											initialPage={1}
											onChange={handlePageChange}
										/>
									</div>
								</>
							) : (
								<div className="flex justify-center my-32 items-center">
									<Spinner color="success" />
								</div>
							)}
						</div>
					</div>
				</div>
				{isOpenModalAdd && <ModalAddQuantity info={info} onClose={onCloseModalAdd} isOpen={isOpenModalAdd} />}
			</main>
			<Footer />
		</div>
	);
}
