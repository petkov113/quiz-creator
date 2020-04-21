import React, { useState } from "react";
import { connect } from "react-redux";
import classlist from "./Layout.module.css";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

const Layout = ({ children, isAuthenticated }) => {
  const [menu, setMenu] = useState(false);

  return (
    <div className={classlist.Layout}>
      <Drawer
        isOpen={menu}
        onClose={() => setMenu((prevMenu) => !prevMenu)}
        isAuthenticated={isAuthenticated}
      />

      <MenuToggle
        onToggle={() => setMenu((prevMenu) => !prevMenu)}
        isOpen={menu}
      />
      <main>{children}</main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token
})

export default connect(mapStateToProps, null)(Layout);