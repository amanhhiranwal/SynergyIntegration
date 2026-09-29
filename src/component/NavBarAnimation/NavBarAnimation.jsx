import { useState } from "react";

function NavBarAnimation() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="dropdown-wrapper"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <h2 className="menu-title">Display</h2>

      <div className={`dropdown ${open ? "open" : ""}`}>
        {[1, 2, 3, 4, 5, 6].map((itemNo) => (
          <div className="card" key={itemNo}>
            Card {itemNo}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavBarAnimation;