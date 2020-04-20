import React from "react";
import classes from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
  { to: "/", label: "Список", exact: true },
  { to: "/auth", label: "Авторизация", exact: false },
  { to: "/quiz-creator", label: "Создать тест", exact: false },
];

const Drawer = ({ isOpen, onClose }) => {
  const renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={onClose}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  };

  const cls = [classes.Drawer];

  if (!isOpen) {
    cls.push(classes.close);
  }

  return (
    <>
      <nav className={cls.join(" ")}>
        <ul>{renderLinks()}</ul>
      </nav>
      {isOpen ? <Backdrop onClick={onClose} /> : null}
    </>
  );
};

export default Drawer;
