import React from "react";
import classes from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Drawer = ({ isOpen, onClose, isAuthenticated }) => {
  let links = [
    { to: "/", label: "Quizzes", exact: true },
    { to: "/auth", label: "Authorization"},
  ];

  if (isAuthenticated) {
    links = [
      { to: "/", label: "Quizzes", exact: true },
      { to: "/quiz-creator", label: "Create Quiz" },
      { to: "/logout", label: "Logout" },
    ];
  }

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
