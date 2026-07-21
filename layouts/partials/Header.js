import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import { useRegister } from "@hooks/useRegister";
import useToggleDialog from "@hooks/useToggleDialog";
import { Commons } from "@layouts/components/commons";
import RegisterForm from "@layouts/components/RegisterForm";
import { useAuth } from "context/AuthContext";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Header = () => {
  //router
  const router = useRouter();
  const { user, isAdmin, isAuthenticated, logout } = useAuth();

  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [navOpen, setNavOpen] = useState(false);

  // logo source
  const { logo } = config.site;
  const { enable, label, link } = config.nav_button;
  const { shouldRender, open, toggle } = useToggleDialog();

  return (
    <header className="header fixed z-10 w-full bg-[#188bf6]">
      <nav className="navbar container lg:flex-nowrap">
        {/* logo */}
        <div className="order-0 shrink-0">
          <Logo src={logo} />
        </div>

        <div className="order-2 flex cursor-pointer items-center gap-2 lg:order-1 lg:hidden">
          <button
            className="btn btn-primary z-0 !px-4 !py-2 text-sm whitespace-nowrap"
            onClick={toggle}
            // href={link}
            // rel=""
          >
            {label}
          </button>
        </div>

        {/* navbar toggler */}
        <button
          id="show-button"
          className="order-2 flex cursor-pointer items-center lg:order-1 lg:hidden"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? (
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Open</title>
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)"
              />
            </svg>
          ) : (
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Close</title>
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <div
          id="nav-menu"
          className={`order-3 lg:order-1 ${
            navOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          <ul className="navbar-nav block w-full lg:flex lg:w-auto lg:space-x-2">
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span className="nav-link inline-flex items-center">
                      {menu.name}
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                      {menu.children.map((child, i) => (
                        <li className="nav-dropdown-item" key={`children-${i}`}>
                          <Link
                            // href={child.url}
                            href={menu.href}
                            className="nav-dropdown-link block"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      // href={menu.url}
                      href={menu?.href}
                      onClick={() => setNavOpen(false)}
                      className={`nav-link block whitespace-nowrap text-2xl lg:text-base   ${
                        router.asPath.includes(menu.href)
                          ? "nav-link-active"
                          : "text-white"
                      }`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
            {/* Tài nguyên công khai — ai cũng xem được, không cần đăng nhập */}
            <li className="nav-item">
              <Link
                href="/tai-nguyen"
                onClick={() => setNavOpen(false)}
                className={`nav-link block whitespace-nowrap text-2xl lg:text-base ${
                  router.asPath.includes("/tai-nguyen") &&
                  !router.asPath.includes("/admin")
                    ? "nav-link-active"
                    : "text-white"
                }`}
              >
                TÀI NGUYÊN
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link
                  href="/admin/tai-nguyen"
                  onClick={() => setNavOpen(false)}
                  className={`nav-link block whitespace-nowrap text-2xl lg:text-base ${
                    router.asPath.includes("/admin/tai-nguyen")
                      ? "nav-link-active"
                      : "text-white"
                  }`}
                >
                  QUẢN TRỊ
                </Link>
              </li>
            )}

            {/* Đăng nhập/xuất — chỉ hiện trong menu sổ xuống ở mobile, bản desktop nằm ở khối riêng bên phải */}
            <li className="nav-item border-t border-white/20 pt-2 lg:hidden">
              {isAuthenticated ? (
                <div className="flex items-center justify-between px-2 py-2">
                  <span className="truncate text-lg text-white">
                    Xin chào, {user?.name}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setNavOpen(false);
                    }}
                    className="ml-3 shrink-0 rounded-full border border-white px-4 py-1.5 text-sm font-medium text-white"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setNavOpen(false)}
                  className="nav-link block text-2xl text-white"
                >
                  Đăng nhập
                </Link>
              )}
            </li>
            {/* {enable && (
              <li className="md:hidden">
                <button
                  className="btn btn-primary z-0 py-[14px]"
                  onClick={toggle}
                >
                  {label}
                </button>
              </li>
            )} */}
          </ul>
        </div>
        <div className="d-flex order-1 ml-auto hidden shrink-0 items-center justify-end gap-2 lg:order-2 lg:ml-0 lg:flex lg:gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 lg:gap-3">
              <span className="hidden max-w-[120px] truncate text-sm text-white xl:inline">
                Xin chào, {user?.name}
              </span>
              <button
                onClick={logout}
                className="whitespace-nowrap rounded-full border border-white px-3 py-1.5 text-xs font-medium text-white hover:bg-white hover:text-[#188bf6] lg:px-4 lg:py-2 lg:text-sm"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="whitespace-nowrap rounded-full border border-white px-3 py-1.5 text-xs font-medium text-white hover:bg-white hover:text-[#188bf6] lg:px-4 lg:py-2 lg:text-sm"
            >
              Đăng nhập
            </Link>
          )}

          {/* CTA tư vấn chỉ dành cho khách chưa đăng nhập — ẩn đi khi đã có tài khoản
              để nhường chỗ cho các link Tài nguyên/Quản trị trên thanh nav */}
          {enable && !isAuthenticated && (
            <button
              className="btn btn-primary z-0 !px-4 !py-2 text-sm whitespace-nowrap lg:!px-6 lg:!py-2.5 lg:text-base"
              onClick={toggle}
              // href={link}
              // rel=""
            >
              {label}
            </button>
          )}
        </div>
        {shouldRender && (
          <Commons.Modal open={open} onClose={toggle} title="Đăng ký tư vấn">
            <RegisterForm toggle={toggle} />
          </Commons.Modal>
        )}
      </nav>
    </header>
  );
};

export default Header;
