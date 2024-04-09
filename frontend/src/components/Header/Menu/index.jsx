import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import Image from "next/image";
import LoginIcon from "@mui/icons-material/Login";

import TemporaryDrawer from "../Drawer";
import useStore from "@/data/global_states/useProducts";
import CustomAutocomplete from "@/components/ui/custom_autocomplete";

export default function PrimarySearchAppBar({ cartCount, notifyCount }) {
	const products = useStore((state) => state.products);
	const categories = useStore((state) => state.categories);
	const brands = useStore((state) => state.brands);
	const [drawerOpen, setDrawerOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [login, setLogin] = React.useState(false);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMenuHamburguer = () => {
		setDrawerOpen(true);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
			<MenuItem onClick={handleMenuClose}>Minha Conta</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 4 new mails"
					color="inherit">
					<Badge badgeContent={cartCount} color="error">
						<ShoppingCartIcon />
					</Badge>
				</IconButton>
				<p>Carrinho</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="shows new notifications"
					color="inherit">
					<Badge badgeContent={notifyCount} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			{login ? (
				<MenuItem>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="primary-search-account-menu"
						aria-haspopup="true"
						color="inherit">
						<AccountCircle />
					</IconButton>
					<p>Profile</p>
				</MenuItem>
			) : (
				<MenuItem
					onClick={() => {
						setLogin(!login);
					}}>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="primary-search-account-menu"
						aria-haspopup="true"
						color="inherit">
						<LoginIcon />
					</IconButton>
					<p>Entrar</p>
				</MenuItem>
			)}
		</Menu>
	);

	return (
		<Box
			sx={{
				flexGrow: 1,
			}}>
			<AppBar position="static" color="base" sx={{ padding: "0% 5%" }}>
				<Toolbar>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							"@media (min-width: 900px)": {
								justifyContent: "flex-start",
							},
						}}>
						{/* Adicionando o ícone de hambúrguer */}
						<IconButton
							size="large"
							edge="start"
							aria-label="menu"
							color="inherit"
							onClick={handleMenuHamburguer}
							sx={{
								display: { xs: "flex", md: "none" }, // Mostrar apenas em dispositivos menores que 900px
								position: "absolute",
								left: 0,
							}}
							// Adicione a função de toggle do menu aqui
						>
							<MenuIcon />
						</IconButton>

						{/* Link para a logo */}
						<Link href="/" sx={{ mr: "auto" }}>
							<Image
								src="/LogoBrisaDesde1976.png"
								width={120}
								height={60}
								alt="Logo Header"
							/>
						</Link>

						{/* Restante do conteúdo */}
						<Box
							sx={{
								display: { xs: "none", md: "block" },
								width: { md: "650px" },
								padding: "0% 3%",
							}}>
							<CustomAutocomplete products={products} />
						</Box>
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<IconButton
							size="large"
							aria-label="show 4 new mails"
							color="inherit">
							<Badge badgeContent={cartCount} color="error">
								<ShoppingCartIcon />
							</Badge>
						</IconButton>
						<IconButton
							size="large"
							aria-label="show 17 new notifications"
							color="inherit">
							<Badge badgeContent={notifyCount} color="error">
								<NotificationsIcon />
							</Badge>
						</IconButton>
						{login ? (
							<>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="primary-search-account-menu"
									aria-haspopup="true"
									color="inherit">
									<AccountCircle />
								</IconButton>
							</>
						) : (
							<>
								<IconButton
									onClick={() => {
										setLogin(!login);
									}}
									size="large"
									aria-label="Entrar"
									aria-controls="primary-search-account-menu"
									aria-haspopup="true"
									color="inherit">
									<LoginIcon />
								</IconButton>
							</>
						)}
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit">
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>

				<Box
					sx={{
						display: "none",
						"@media (max-width: 900px)": {
							display: "block",
						},
					}}>
					<div className="divider mx-0 my-2 divider-neutral opacity-15"></div>
					<Toolbar
						sx={{
							display: "flex",
							justifyContent: "center",
							height: "fit-content",
							minHeight: "unset", // Substitua o min-height padrão
							paddingBottom: "15px",
							"&.MuiToolbar-regular": {
								// Sobrescreva o min-height apenas para a classe MuiToolbar-regular
								minHeight: "unset",
							},
						}}>
						<CustomAutocomplete products={products} />
					</Toolbar>
				</Box>
			</AppBar>
			{drawerOpen && (
				<TemporaryDrawer
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
					categories={categories}
					brands={brands}
				/>
			)}
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}
