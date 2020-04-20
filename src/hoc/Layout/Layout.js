import React, { useState } from "react";
import classlist from "./Layout.module.css";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

const Layout = ({ children }) => {
  const [menu, setMenu] = useState(false);

  return (
    <div className={classlist.Layout}>
      <Drawer isOpen={menu} onClose={() => setMenu((prevMenu) => !prevMenu)} />

      <MenuToggle
        onToggle={() => setMenu((prevMenu) => !prevMenu)}
        isOpen={menu}
      />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
